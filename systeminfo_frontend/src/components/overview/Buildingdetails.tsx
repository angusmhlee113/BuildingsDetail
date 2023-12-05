import { useEffect, useState } from "react";
import Mapplot from "./Mapplot";

const Buildingdetails = ({
  selectedBuildings,
}: {
  selectedBuildings: string;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKENDLOCALHOST}/api/buildingdetails?buildingid=${selectedBuildings}`,
      );
      const jsonData = await response.json();
      setData(jsonData.data);
      setIsLoading(false);
      setError(false);
    } catch (error) {
      setError(true);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (selectedBuildings !== "") {
      fetchData();
    }
  }, [selectedBuildings]);

  return (
    <div className="flex h-1/2 justify-center">
      <div className="buildingoverview-container">
        {isLoading && !error && !data && <div>Loading...</div>}
        {!isLoading && error && <div>Error fetching data</div>}
        {!isLoading && !error && data && (
          <div>
            <ul>
              {data.map((item: any) => (
                <li key={item.ID}>
                  <div>
                    <div className="flex justify-center text-xl">
                      {item.PropertyName}
                    </div>
                    <div>
                      <div>{item.PrimaryPropertyType}</div>
                      <p>{item.Address}</p>
                      <p># of floors: {item.NumberofFloors}</p>
                      <p>District: {item.CouncilDistrictCode}</p>
                      <p>Built in {item.YearBuilt}</p>
                      <Mapplot lat={item.Latitude} lng={item.Longitude} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Buildingdetails;
