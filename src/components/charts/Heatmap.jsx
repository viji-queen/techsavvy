import React, { useEffect, useState, useRef }  from 'react'
import HeatMapTableComponent from './HeatMapTableComponent'
function Heatmap() {
    const [hourlyData, setHourlyData] = useState([]);
   
    const fetchData = async () => {
        try {
          const response = await fetch(
            "https://coreapi.hectorai.live/api/day-parting/heatmap-list",
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
  
     
      console.log(hourlyData, 'Hourly data');
      let total=[]
     hourlyData.forEach(day=>{
      total.push(day.Total_CPC, day.Total_CR_perc,day.Total_ROAS)

     })
      console.log(total);
      
    const heatmapData = [];

    // Loop through each day of the week.
    hourlyData?.forEach(day => {
      day.Hourly_Data?.forEach(hourlyData => {
        const hour = hourlyData?.time_part.slice(0, 5); // Extract hour in HH:mm format
        
        // If the hour doesn't exist in the heatmapData object, create it.
        if (!heatmapData[hour]) {
          heatmapData[hour] = {};
        }
        
        // Assign the CPC and other values for the current day.
        heatmapData[hour][day.weekday] = {
          CPC: hourlyData?.CPC ||[],
          CR_perc: hourlyData?.CR_perc ||[],
          ROAS: hourlyData?.ROAS ||[]
        };
      });
    });
    
    // Convert the heatmapData object into an array of objects for rendering.
    const heatmapArray = Object.keys(heatmapData).map(hour => {
      return { hour, ...heatmapData[hour] };
    }) || [];
    
    console.log(heatmapArray, 'heatmap data');
    const minCPC = 3; // Define based on your data
    const maxCPC = 10;

  return (
   <>
   <HeatMapTableComponent
    data={heatmapData}
    minValue={minCPC} maxValue={maxCPC} total={total} />
   </>
  )
}

export default Heatmap