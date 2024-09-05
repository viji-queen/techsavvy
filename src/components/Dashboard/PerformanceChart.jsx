import React, { useState, useRef, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import LineChart from "../charts/LineChart";
import { MdKeyboardArrowDown } from "react-icons/md";
import {
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
function PerformanceChart() {
  const [showCard, setShowCard] = useState(false);
  const [metrics, setMetrics] = useState([]);
  const fetchMetrics = async () => {
    try {
      const response = await fetch(
        "https://coreapi.hectorai.live/api/day-parting/DayPartingFilterList",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OGI0ZTNhN2Y1YmU4ZDY2MjVlN2I0MiIsImZ1bGxOYW1lIjoiU3lzdGVtIFRlc3QiLCJlbWFpbCI6InRlc3RAZGV2LmNvbSIsInNlc3Npb25JZCI6InJhbmRvbVN0cmluZyIsImlhdCI6MTcyMDQwNjQzNH0.oo2gUHroTcJ7X-I0-hNvtuG4tq6sGL2yr4Veaf37JPc",
            "X-USER-IDENTITY":
              "U2FsdGVkX18lreBwDMZIZaWXmCA+9GGYXAFttifVV7ovRjRGNNlnl3F8QSfmgxbGrm4zk42ud8ygR0rZccDFlOVDj01aIUTjKrX6TNza+qoIkSe0xGH0MxBlUXrV+c+ULtgFHS9XcTXbrIGbSN1Cwt18SZK5UOGF3aavkG5ZGXwOAopznMUp4CJOxE9a7DzNsb0rJpsguSXehn+Fw0b6GT30m/c0+7Nhbtwi8GFflEgr8F41hE4jMoLwCEajSkxQhTxorAqtJRF0tlM5sUeAvBODqx4sZMB8MNv9v9NzQ7cA+P+FKB6VSS9QIwRx5PC4LQnmthfupakaZmnRL1YbZ56rPbt8lu3QSRS1yuV/GwRuCN3MBwaHitsgzMYEnAMiYGup+W/nbNsukqCXhSZGtg==",
          },

          body: JSON.stringify({
            type: "customizeMetrics",
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      setMetrics(data.result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMetrics();
  }, []);
  console.log(metrics);

  const cardRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setShowCard(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cardRef]);
  const handleSelect = () => {
    setShowCard(!showCard);
  };

  return (
    <>
   <div className="perf">
   <div className="card-header bg-white performance-head ">
        <div className="left">
          <h6>PerformanceChart</h6>
          <span style={{ fontSize: "small", color: "grey" }}>
            Key Metrics for Dayparting Schedule Performance Evaluation
          </span>
        </div>
        <div className="right">
          <FormGroup>
            <FormControl
              sx={{ m: 1, minWidth: "250px", minHeight: "10px" }}
              style={{ margin: 0, padding: 0 }}
            >
              <button className=" metrics-btn" onClick={handleSelect}>
                Select Metrics  <MdKeyboardArrowDown />
              </button>
            </FormControl>
          </FormGroup>
        </div>
      </div>
      {showCard && (
        <div
          ref={cardRef}
          className="card h-25"
          style={{
            position: "absolute",
            top: "10%",
            right: "0",
            zIndex: "1000",
            padding: "20px",
            overflowY: "auto",
            width: "260px",
          }}
        >
          <div className="row">
            <FormGroup>
              {metrics.length > 0 &&
                metrics.map((metric) => (
                  <FormControlLabel
                    control={<Checkbox />}
                    label={metric.label}
                    key={metric.label}
                  />
                ))}
            </FormGroup>
            <div className="row ">
              <div className="col">
                {" "}
                <button className="btn btn-light w-100 ">Cancel</button>
              </div>
              <div className="col">
                {" "}
                <button className="btn btn-primary   w-100">Apply</button>
              </div>
            </div>
          </div>
        </div>
      )}

     
     
       <LineChart />
   </div>
   
    
    
    </>
  );
}

export default PerformanceChart;
