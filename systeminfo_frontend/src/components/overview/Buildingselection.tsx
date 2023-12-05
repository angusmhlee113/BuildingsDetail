import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { LoginContext } from "../login/hooks/loginContext";

const Buildingselection = ({
  setSelectedBuildings,
}: {
  setSelectedBuildings: Dispatch<SetStateAction<string>>;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const { loggedIn } = useContext(LoginContext);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKENDLOCALHOST}/api/buildingnames?page=${page}`,
      );
      const jsonData = await response.json();
      setData(jsonData.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div>
      {isLoading && <div>Loading...</div>}

      {!isLoading && data && (
        <ul>
          {data.map((item: any) => (
            <li key={item.ID}>
              <button
                className={`${
                  selected === item.PropertyName
                    ? "overviewbuttonselected"
                    : "overviewbutton"
                }`}
                onClick={() => {
                  setSelected(item.PropertyName);
                  setSelectedBuildings(item.OSEBuildingID);
                }}
              >
                {item.PropertyName}
              </button>
            </li>
          ))}
        </ul>
      )}
      <button
        className="pagesbutton"
        onClick={handlePrevPage}
        disabled={page === 1}
      >
        Previous Page
      </button>
      <button className="pagesbutton" onClick={handleNextPage}>
        Next Page
      </button>
    </div>
  );
};

export default Buildingselection;
