import React from "react";
const HeatmapTable = ({ data, total }) => {
  console.log(data, "Table data");

  const getColor = (value, type) => {
    let intensity = 0;

    // Calculate intensity based on value ranges for each type
    if (type === "CPC") {
      intensity = Math.min(Math.max((value - 2) / (6 - 2), 0), 1); // CPC range [2, 6]
    } else if (type === "CR_perc") {
      intensity = Math.min(Math.max((value - 3) / (22 - 3), 0), 1); // CR_perc range [3, 22]
    } else if (type === "ROAS") {
      intensity = Math.min(Math.max((value - 4) / (40 - 4), 0), 1); // ROAS range [4, 40]
    }

    // Define different base color scales for each type
    let red = 255,
      green = 255,
      blue = 255; // Default to white for light colors

    if (type === "CPC") {
      // Use a light orange-yellow scale for CPC
      red = Math.floor(255); // Keep red high for warm color
      green = Math.floor((1 - intensity) * 200 + 55); // Mix green with white
      blue = Math.floor((1 - intensity) * 120 + 135); // Light blue shade mixed
    } else if (type === "CR_perc") {
      // Use a light teal-blue scale for CR_perc
      red = Math.floor((1 - intensity) * 180 + 75); // Light pink to teal
      green = Math.floor((1 - intensity) * 220 + 35); // Light blue shade
      blue = Math.floor(255); // Keep blue higher for softer color
    } else if (type === "ROAS") {
      // Use a light purple-violet scale for ROAS
      red = Math.floor((1 - intensity) * 230 + 50); // Mix red with white
      green = Math.floor((1 - intensity) * 130 + 125); // Light purple
      blue = Math.floor(255); // Keep blue for pastel violet look
    }

    return `rgb(${red}, ${green}, ${blue})`; // Return the color based on intensity
  };

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const heading = "CPC CR_perc ROAS";
  return (
    <table className="heatmap-table">
      <thead>
        <tr>
          <th className="table-hd"></th>
          {days.map((day, index) => (
            <th key={index} className="table-hd">
              {day}
            </th>
          ))}
        </tr>
        <tr>
          <th></th>
          
        </tr>
      </thead>
      <tbody>
        {Object.keys(data).map((time, index) => (
          <tr key={index}>
            <td className="table-hd">
              {time === "00:00"
                ? "12 am"
                : (parseInt(time.split(":")[0]) % 12 === 0
                    ? 12
                    : parseInt(time.split(":")[0]) % 12) +
                  " " +
                  (parseInt(time.split(":")[0]) >= 12 ? "pm" : "am")}
            </td>
            {days.map((day, index) => (
              <td key={index} className="td-container">
                <span
                  className="td-cell"
                  style={{
                    backgroundColor: getColor(
                      data[time][day].CPC.toFixed(2),
                      "CPC"
                    ),
                  }}
                >
                  {data[time][day].CPC.toFixed(2)}
                </span>{" "}
                <span
                  className="td-cell"
                  style={{
                    backgroundColor: getColor(
                      data[time][day].CR_perc.toFixed(2),
                      "CR_perc"
                    ),
                  }}
                >
                  {data[time][day].CR_perc.toFixed(2)}
                </span>{" "}
                <span
                  className="td-cell"
                  style={{
                    backgroundColor: getColor(
                      data[time][day].ROAS.toFixed(2),
                      "ROAS"
                    ),
                  }}
                >
                  {" "}
                  {data[time][day].ROAS.toFixed(2)}
                </span>
              </td>
            ))}
          </tr>
        ))}
        <tr>
          <td>
            <b>Total</b>
          </td>
          {Array(Math.ceil(total.length / 3))
            .fill()
            .map((_, i) => (
              <td key={i}>
                {total.slice(i * 3, (i + 1) * 3).map((item, j) => (
                  <span key={j} className="td-cell" style={{ fontWeight: 500 }}>
                    {item.toFixed(2)}
                  </span>
                ))}
              </td>
            ))}
        </tr>
      </tbody>
    </table>
   
  );
};

export default HeatmapTable;
