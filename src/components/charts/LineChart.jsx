import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
function LineChart() {
  const [hourlyData, setHourlyData] = useState({});

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://coreapi.hectorai.live/api/day-parting/DayPartingPerformanceGraphList",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OGI0ZTNhN2Y1YmU4ZDY2MjVlN2I0MiIsImZ1bGxOYW1lIjoiU3lzdGVtIFRlc3QiLCJlbWFpbCI6InRlc3RAZGV2LmNvbSIsInNlc3Npb25JZCI6InJhbmRvbVN0cmluZyIsImlhdCI6MTcyMDQwNjQzNH0.oo2gUHroTcJ7X-I0-hNvtuG4tq6sGL2yr4Veaf37JPc",
            "X-USER-IDENTITY":
              "U2FsdGVkX1+GZ5mnAUMis4VC8jL5g2BdcRai8iXYI29OIStJwwzI4Wf6H8+/nJjEDGl4ly0lR3JXZddDjqwuWaZMDyCIOc4WW586U//KMIUVsM2kMN3KMJf8eGAcW7X0aRgkNwkQKVlyZNf1sQqvusuFbb3XFl5GP+otaIQh7NrOgEMvBxMYmiA9OIla8iLAbKkHVCdAIFW+/qjDlZWq6u5fs9k266mMdr4UuFxvEDS6U0+xjei5BdwUaZvWmlETmKDT4JtLHVcTECPxcxHJllRClmUPcnjC5xRJV0mfsG1sRpHLHDW5o5GanBbdQU5yDYrJEj/OYXrYySZ2tzQu/b6EqzTguqNISSNhjxNtSlK3MXBisf5aSZQanXxIpKoYkXaNmo2k45y1tl0xe66TWw==",
          },

          body: JSON.stringify({
            startDate: "2024-06-08", 
            endDate: "2024-07-07", 
            metrics: ["CPC", "CR_perc", "ROAS"], 
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      setHourlyData(data.result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  let filteredCategories =
    hourlyData?.categories
      ?.slice(0, 14)
      .filter((time, index) => index % 2 === 0) || [];
  const x_axis_label = filteredCategories.map((time) => {
    const hour = time.split(":")[0];
    return parseInt(hour) + "Hr";
  });
  const cpc_data =
    hourlyData?.series
      ?.find((series) => series.name === "CPC")
      ?.data?.slice(0, 12) || [];
  const cr_perc_data =
    hourlyData?.series
      ?.find((series) => series.name === "CR_perc")
      ?.data?.slice(0, 12) || [];
  const roas_data =
    hourlyData?.series
      ?.find((series) => series.name === "ROAS")
      ?.data?.slice(0, 12) || [];

  const data = {
    labels: x_axis_label,
    datasets: [
      {
        label: "Dataset 1",
        data: cpc_data,
        borderColor: "blue",
        backgroundColor: "rgba(75,192,192,0.2)",
      },
      {
        label: "Dataset 1",
        data: cr_perc_data,
        borderColor: "green",
        backgroundColor: "rgba(75,192,192,0.2)",
      },

      {
        label: "Dataset 1",
        data: roas_data,
        borderColor: "darkorchid",
        backgroundColor: "rgba(75,192,192,0.2)",
      },
    ],
  };
  const options = {
       responsive: true,
    animation: false,
    plugins: {
      legend: {
        position: "top",
        display:false
      },
      
    },
    elements: {
      line: {
        tension: 0.5,
      },
    },

  };
  return <Line data={data} options={options} />;
}

export default LineChart;
