# REST API documentation

This is the API that are able to let the front-end to query about the Buildings' data within the SQL Lite database.

### 1. Get the average EUI within the data base (With the provided query in the requirement doc)

### Descriptions

Retrieves the eui for each buildings type


#### Request

Get the eui for each buildings type

`GET /api/geteui`


#### Usage

Parameters:

- None

##### Response:

Status Code:

- 200 (OK)

- 400(Bad Request)

Body:

```
    {
        "data": [
            {
                "type": "Distribution Center",
                "eui": "23.627"
            },
            {
                "type": "High-Rise Multifamily",
                "eui": "28.118"
            },
        ]
    }
```
-------------------------------------------
### 2. Get the detail fields from all buildings from the database

### Descriptions

The API allows the user to retrieve all the data needed on for the overview page on all buildings with pagination provided

#### Request

Get the detail 

`GET /api/allbuildings?`


#### Usage

Parameters:

| Name | Data/Type | Required/Optional |
|---|---|---|
| page | number | Optional (Default at 1) |
| size | number | Optional (Default at 10, Max at 100) |

##### Response:

Status Code:

- 200 (OK)

- 400(Bad Request)

Body:

```
{
    "data": [
        {
            "ID": "1",
            "PrimaryPropertyType": "Hotel",
            "PropertyName": "Mayflower park hotel",
            "Address": "405 Olive way",
            "NumberofFloors": "12",
            "YearBuilt": "1927",
            "Latitude": "47.6122",
            "Longitude": "-122.33799",
            "CouncilDistrictCode": "7"
        },
        {
            "ID": "2",
            "PrimaryPropertyType": "Hotel",
            "PropertyName": "Paramount Hotel",
            "Address": "724 Pine street",
            "NumberofFloors": "11",
            "YearBuilt": "1996",
            "Latitude": "47.61317",
            "Longitude": "-122.33393",
            "CouncilDistrictCode": "7"
        },
        {
            "ID": "3",
            "PrimaryPropertyType": "Hotel",
            "PropertyName": "5673-The Westin Seattle",
            "Address": "1900 5th Avenue",
            "NumberofFloors": "41",
            "YearBuilt": "1969",
            "Latitude": "47.61393",
            "Longitude": "-122.3381",
            "CouncilDistrictCode": "7"
        },
        {
            "ID": "4",
            "PrimaryPropertyType": "Hotel",
            "PropertyName": "HOTEL MAX",
            "Address": "620 STEWART ST",
            "NumberofFloors": "10",
            "YearBuilt": "1926",
            "Latitude": "47.61412",
            "Longitude": "-122.33664",
            "CouncilDistrictCode": "7"
        },
        {
            "ID": "5",
            "PrimaryPropertyType": "Hotel",
            "PropertyName": "WARWICK SEATTLE HOTEL (ID8)",
            "Address": "401 LENORA ST",
            "NumberofFloors": "18",
            "YearBuilt": "1980",
            "Latitude": "47.61375",
            "Longitude": "-122.34047",
            "CouncilDistrictCode": "7"
        },
        {
            "ID": "6",
            "PrimaryPropertyType": "Other",
            "PropertyName": "West Precinct",
            "Address": "810 Virginia St",
            "NumberofFloors": "2",
            "YearBuilt": "1999",
            "Latitude": "47.61623",
            "Longitude": "-122.33657",
            "CouncilDistrictCode": "7"
        },
        {
            "ID": "7",
            "PrimaryPropertyType": "Hotel",
            "PropertyName": "Camlin",
            "Address": "1619 9th Avenue",
            "NumberofFloors": "11",
            "YearBuilt": "1926",
            "Latitude": "47.6139",
            "Longitude": "-122.33283",
            "CouncilDistrictCode": "7"
        },
        {
            "ID": "8",
            "PrimaryPropertyType": "Other",
            "PropertyName": "Paramount Theatre",
            "Address": "911 Pine St",
            "NumberofFloors": "8",
            "YearBuilt": "1926",
            "Latitude": "47.61327",
            "Longitude": "-122.33136",
            "CouncilDistrictCode": "7"
        },
        {
            "ID": "9",
            "PrimaryPropertyType": "Hotel",
            "PropertyName": "311wh-Pioneer Square",
            "Address": "612 2nd Ave",
            "NumberofFloors": "15",
            "YearBuilt": "1904",
            "Latitude": "47.60294",
            "Longitude": "-122.33263",
            "CouncilDistrictCode": "7"
        },
        {
            "ID": "10",
            "PrimaryPropertyType": "Mid-Rise Multifamily",
            "PropertyName": "Lyon Building",
            "Address": "607 - 3rd Ave.",
            "NumberofFloors": "6",
            "YearBuilt": "1910",
            "Latitude": "47.60284",
            "Longitude": "-122.33184",
            "CouncilDistrictCode": "7"
        }
    ]
}
```
-------------------------------------------
### 3. Get all the building names 

### Descriptions

The API allows the user to retrieve all the names of the buildings with pagination supported

#### Request

Get the detail 

`GET /api/buildingnames?`


#### Usage

Parameters:

| Name | Data/Type | Required/Optional |
|---|---|---|
| page | number | Optional (Default at 1) |
| size | number | Optional (Default at 10, Max at 100) |

##### Response:

Status Code:

- 200 (OK)

- 400(Bad Request)

Body:

```
{
    "data": [
        {
            "ID": "1",
            "PropertyName": "Mayflower park hotel",
            "OSEBuildingID": "1"
        },
        {
            "ID": "2",
            "PropertyName": "Paramount Hotel",
            "OSEBuildingID": "2"
        },
        {
            "ID": "3",
            "PropertyName": "5673-The Westin Seattle",
            "OSEBuildingID": "3"
        },
        {
            "ID": "4",
            "PropertyName": "HOTEL MAX",
            "OSEBuildingID": "5"
        },
        {
            "ID": "5",
            "PropertyName": "WARWICK SEATTLE HOTEL (ID8)",
            "OSEBuildingID": "8"
        },
        {
            "ID": "6",
            "PropertyName": "West Precinct",
            "OSEBuildingID": "9"
        },
        {
            "ID": "7",
            "PropertyName": "Camlin",
            "OSEBuildingID": "10"
        },
        {
            "ID": "8",
            "PropertyName": "Paramount Theatre",
            "OSEBuildingID": "11"
        },
        {
            "ID": "9",
            "PropertyName": "311wh-Pioneer Square",
            "OSEBuildingID": "12"
        },
        {
            "ID": "10",
            "PropertyName": "Lyon Building",
            "OSEBuildingID": "13"
        }
    ]
```
-------------------------------------------
### 4. Get building details based on the OSEBuildingID

### Descriptions

The API allows the user to retrieve building details based on the OSEBuildingID

#### Request

Get the detail 

`GET /api/buildingdetails?`


#### Usage

Parameters:

| Name | Data/Type | Required/Optional |
|---|---|---|
| buildingid | number | Required |

##### Response:

Status Code:

- 200 (OK)

- 400(Bad Request)

```
{
    "data": [
        {
            "ID": "1",
            "PrimaryPropertyType": "Hotel",
            "PropertyName": "Camlin",
            "Address": "1619 9th Avenue",
            "NumberofFloors": "11",
            "YearBuilt": "1926",
            "Latitude": "47.6139",
            "Longitude": "-122.33283",
            "CouncilDistrictCode": "7"
        }
    ]
}
```
-------------------------------------------
### 5. Login API

### Descriptions

The API allows the user to call the API with username and password provided 

*Ideal for improvement:

The API should process a JWT process and return a JWT token. Everytime different APIs are called by the user, it will verify the JWT if it is valid or not. 

#### Request


`POST /api/login`



#### Usage

Parameters:

-None

#### Request:

```
{
    "username": "username",
    "password" : "password"
}

```

##### Response:

Status Code:

- 200 (OK)

- 400(Bad Request)

```
{
    "message": "Login successful"
}
```
