import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

export var chartData = [["Building Type", "EUI", { role: "style" }]];

const Chartdraw = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  //Fetch the graph needed data from the backend (maybe need to re-ogranize the format so it can be plotted?)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKENDLOCALHOST}/api/geteui`,
        );
        if (response.ok) {
          const data = await response.json();
          //reset the chartData to empty array with default x and y axis name
          chartData = [["Building Type", "EUI", { role: "style" }]];
          data.data.map((item: any, index: any) => {
            const euiFloat = parseFloat(item.eui);
            chartData.push([item.type, euiFloat, "gold"]);
          });
          setLoading(false);
          setError(false);
        } else {
          setError(true);
          console.error("Request failed with status:", response.status);
        }
      } catch (error) {
        setError(true);
        console.error("Request failed:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>
        {loading && (
          <div className="rotate my-2 flex w-full justify-center opacity-50">
            Loading
          </div>
        )}
        {!loading && error && <div>Error fetching data</div>}
      </div>
      {!loading && !error && (
        <Chart
          chartType="ColumnChart"
          width="100%"
          height="400px"
          data={chartData}
        />
      )}
    </div>
  );
};

export default Chartdraw;
