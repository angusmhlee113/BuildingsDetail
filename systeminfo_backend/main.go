package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	_ "github.com/mattn/go-sqlite3"
	pagination "github.com/webstradev/gin-pagination"
)

type Credentials struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type Buildings struct {
	Type string `json:"type"`
	Eui  string `json:"eui"`
}

type BuildingNames struct {
	ID            string `json:"ID"`
	PropertyName  string `json:"PropertyName"`
	OSEBuildingID string `json:"OSEBuildingID"`
}

type AllBuildings struct {
	ID                  string `json:"ID"`
	PrimaryPropertyType string `json:"PrimaryPropertyType"`
	PropertyName        string `json:"PropertyName"`
	Address             string `json:"Address"`
	NumberofFloors      string `json:"NumberofFloors"`
	YearBuilt           string `json:"YearBuilt"`
	Latitude            string `json:"Latitude"`
	Longitude           string `json:"Longitude"`
	CouncilDistrictCode string `json:"CouncilDistrictCode"`
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	fmt.Println("Starting server...")

	router := gin.Default()
	router.Use(pagination.Default())
	router.Use(cors.Default())
	router.POST("/api/login", loginHandler)
	router.GET("/api/geteui", geteuiHandler)
	router.GET("/api/allbuildings", getallbuildingHandler)
	router.GET("/api/buildingnames", getbuildingnamesHandler)
	router.GET("/api/buildingdetails", getbuildingdetailsHandler)

	//need to configure the host and port?
	router.Run("0.0.0.0:3010")
}

func loginHandler(c *gin.Context) {
	var credentials Credentials

	if err := c.ShouldBindJSON(&credentials); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	username := os.Getenv("LOGINUSERNAME")
	password := os.Getenv("LOGINPASSWORD")
	fmt.Println(username, password)

	if credentials.Username == username && credentials.Password == password {
		c.JSON(http.StatusOK, gin.H{"message": "Login successful"})
	} else {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "Invalid credentials"})
	}
}

func geteuiHandler(c *gin.Context) {
	database, err := sql.Open("sqlite3", "./data.db")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Cannot get data"})
	}
	defer database.Close()
	rows, _ := database.Query("SELECT type, avg(eui) AS average_eui FROM ( SELECT t.OSEBuildingID AS id, t.PrimaryPropertyType AS type, t2.electricity / t1.gfa AS eui FROM buildings t LEFT JOIN ( SELECT OSEBuildingID AS id, SUM(PropertyUseTypeGFA) AS gfa FROM buildings_gfa GROUP BY OSEBuildingID ) t1 ON t.OSEBuildingID = t1.id LEFT JOIN ( SELECT OSEBuildingID AS id, value AS electricity FROM metrics WHERE metric = 'Electricity' ) t2 ON t.OSEBuildingID = t2.id ) GROUP BY type;")
	var finalresult []Buildings
	for rows != nil && rows.Next() {
		var type_ string
		var average_eui float64
		rows.Scan(&type_, &average_eui)
		average_eui_string := fmt.Sprintf("%.3f", average_eui)
		buildingQuery := Buildings{Type: type_, Eui: average_eui_string}
		finalresult = append(finalresult, buildingQuery)
	}
	c.JSON(http.StatusOK, gin.H{"data": finalresult})
}

func getallbuildingHandler(c *gin.Context) {
	database, err := sql.Open("sqlite3", "./data.db")
	if err != nil {
		log.Fatal(err)
	}
	defer database.Close()
	pageStr := c.Query("page")
	sizeStr := c.DefaultQuery("size", "10")
	page, err := strconv.Atoi(pageStr)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid page number"})
		return
	}
	size, err := strconv.Atoi(sizeStr)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid page size"})
		return
	}
	offset := (page - 1) * size
	limit := size
	query := fmt.Sprintf("SELECT PrimaryPropertyType, PropertyName, Address, NumberofFloors, YearBuilt, Latitude, Longitude, CouncilDistrictCode FROM buildings LIMIT %d OFFSET %d", limit, offset)
	rows, _ := database.Query(query)
	var finalresult []AllBuildings
	var ID int = 0
	for rows != nil && rows.Next() {
		var PrimaryPropertyType string
		var PropertyName string
		var Address string
		var NumberofFloors string
		var YearBuilt string
		var Latitude string
		var Longitude string
		var CouncilDistrictCode string
		ID = ID + 1
		IDstring := strconv.Itoa(ID)
		rows.Scan(&PrimaryPropertyType, &PropertyName, &Address, &NumberofFloors, &YearBuilt, &Latitude, &Longitude, &CouncilDistrictCode)
		//fmt.Println(PrimaryPropertyType, PropertyName, Address, NumberofFloors, YearBuilt, Latitude, Longitude, CouncilDistrictCode)
		buildingQuery := AllBuildings{ID: IDstring, PropertyName: PropertyName, PrimaryPropertyType: PrimaryPropertyType, Address: Address, NumberofFloors: NumberofFloors, YearBuilt: YearBuilt, Latitude: Latitude, Longitude: Longitude, CouncilDistrictCode: CouncilDistrictCode}
		finalresult = append(finalresult, buildingQuery)
	}
	c.JSON(http.StatusOK, gin.H{"data": finalresult})
}

func getbuildingnamesHandler(c *gin.Context) {
	database, err := sql.Open("sqlite3", "./data.db")
	if err != nil {
		log.Fatal(err)
	}
	defer database.Close()
	pageStr := c.Query("page")
	sizeStr := c.DefaultQuery("size", "10")
	page, err := strconv.Atoi(pageStr)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid page number"})
		return
	}
	size, err := strconv.Atoi(sizeStr)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid page size"})
		return
	}
	offset := (page - 1) * size
	limit := size
	var ID int = 0
	query := fmt.Sprintf("SELECT PropertyName, OSEBuildingID FROM buildings LIMIT %d OFFSET %d", limit, offset)
	rows, _ := database.Query(query)
	var finalresult []BuildingNames
	for rows != nil && rows.Next() {
		var PropertyName string
		var OSEBuildingID string
		rows.Scan(&PropertyName, &OSEBuildingID)
		ID = ID + 1
		IDstring := strconv.Itoa(ID)
		buildingQuery := BuildingNames{ID: IDstring, PropertyName: PropertyName, OSEBuildingID: OSEBuildingID}
		finalresult = append(finalresult, buildingQuery)
	}
	c.JSON(http.StatusOK, gin.H{"data": finalresult})
}

func getbuildingdetailsHandler(c *gin.Context) {
	path, _ := os.Getwd()
	fmt.Println(path)
	if _, err := os.Stat("data.db"); err != nil {
		if os.IsNotExist(err) {
			fmt.Println("File does not exist.")
		}

	} else {
		fmt.Println("File exists.")
	}
	database, err := sql.Open("sqlite3", "data.db")
	if err != nil {
		log.Fatal(err)
	}
	defer database.Close()
	buildingid := c.Query("buildingid")
	buildingstr, err := strconv.Atoi(buildingid)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid buildingname number"})
		return
	}
	query := fmt.Sprintf("SELECT PrimaryPropertyType, PropertyName, Address, NumberofFloors, YearBuilt, Latitude, Longitude, CouncilDistrictCode FROM buildings WHERE OSEBuildingID = %d", buildingstr)
	fmt.Println(query)
	rows, _ := database.Query(query)
	var finalresult []AllBuildings
	var ID int = 0
	for rows != nil && rows.Next() {
		var PrimaryPropertyType string
		var PropertyName string
		var Address string
		var NumberofFloors string
		var YearBuilt string
		var Latitude string
		var Longitude string
		var CouncilDistrictCode string
		ID = ID + 1
		IDstring := strconv.Itoa(ID)
		rows.Scan(&PrimaryPropertyType, &PropertyName, &Address, &NumberofFloors, &YearBuilt, &Latitude, &Longitude, &CouncilDistrictCode)
		// fmt.Println(PrimaryPropertyType, PropertyName, Address, NumberofFloors, YearBuilt, Latitude, Longitude, CouncilDistrictCode)
		buildingQuery := AllBuildings{ID: IDstring, PropertyName: PropertyName, PrimaryPropertyType: PrimaryPropertyType, Address: Address, NumberofFloors: NumberofFloors, YearBuilt: YearBuilt, Latitude: Latitude, Longitude: Longitude, CouncilDistrictCode: CouncilDistrictCode}
		finalresult = append(finalresult, buildingQuery)
	}
	c.JSON(http.StatusOK, gin.H{"data": finalresult})
}
