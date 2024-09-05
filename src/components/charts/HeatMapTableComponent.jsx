import React from "react";
const HeatmapTable = ({ data, total }) => {

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
      red = Math.floor(255); // Keep red high for warm color
      green = Math.floor((1 - intensity) * 200 + 55); // Mix green with white
      blue = Math.floor((1 - intensity) * 120 + 135); // Light blue shade mixed
    } else if (type === "CR_perc") {
      red = Math.floor((1 - intensity) * 180 + 75); // Light pink to teal
      green = Math.floor((1 - intensity) * 220 + 35); // Light blue shade
      blue = Math.floor(255); // Keep blue higher for softer color
    } else if (type === "ROAS") {
      red = Math.floor((1 - intensity) * 230 + 50); // Mix red with white
      green = Math.floor((1 - intensity) * 130 + 125); // Light purple
      blue = Math.floor(255); // Keep blue for pastel violet look
    }

    return `rgb(${red}, ${green}, ${blue})`; // Return the color based on intensity
  };
  console.log(total);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <table className="heatmap-table">
      <thead>
        <tr>
          <th></th>
          {days.map((day, i) => (
            <th key={i} colSpan={3} className="table-hd">
              {day}
            </th>
          ))}
        </tr>
        <tr>
          <th></th>
        </tr>
      </thead>
      <thead>
        <tr>
          <th></th>
          <th className="table-hd ">CPC</th>
          <th className="table-hd ">CR_perc</th>
          <th className="table-hd ">ROAS</th>
          <th className="table-hd ">CPC</th>
          <th className="table-hd ">CR_perc</th>
          <th className="table-hd ">ROAS</th>
          <th className="table-hd ">CPC</th>
          <th className="table-hd ">CR_perc</th>
          <th className="table-hd ">ROAS</th>
          <th className="table-hd ">CPC</th>
          <th className="table-hd ">CR_perc</th>
          <th className="table-hd ">ROAS</th>
          <th className="table-hd ">CPC</th>
          <th className="table-hd ">CR_perc</th>
          <th className="table-hd ">ROAS</th>
          <th className="table-hd ">CPC</th>
          <th className="table-hd ">CR_perc</th>
          <th className="table-hd ">ROAS</th>
          <th className="table-hd ">CPC</th>
          <th className="table-hd ">CR_perc</th>
          <th className="table-hd ">ROAS</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(data).map((time, index) => (
          <tr key={index} className="val-tr">
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
              <>
                <td
                  key={index}
                  style={{
                    backgroundColor: getColor(
                      data[time][day].CPC.toFixed(2),
                      "CPC"
                    ),
                  }}
                >
                  {data[time][day].CPC.toFixed(4)}
                </td>
                <td
                  key={index}
                  style={{
                    backgroundColor: getColor(
                      data[time][day].CR_perc.toFixed(2),
                      "CR_perc"
                    ),
                  }}
                >
                  {data[time][day].CR_perc.toFixed(4)}
                </td>
                <td
                  key={index}
                  style={{
                    backgroundColor: getColor(
                      data[time][day].ROAS.toFixed(2),
                      "ROAS"
                    ),
                  }}
                >
                  {data[time][day].ROAS.toFixed(4)}
                </td>
              </>
            ))}
          </tr>
        ))}
        <tr>
          <td >
            <b  style={{color:'black'}}>Total</b>
          </td>
          {total.map((t, i) => (
            <td key={i}  style={{color:'black'}}>{t.toFixed(4)}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default HeatmapTable;
