import React from 'react'
import Heatmap from '../charts/Heatmap'

function DayParting() {
  return (
    <>
     <div className="card-header bg-white performance-head">
        <div className="left">
          <h6>Heat Map</h6>
          <span style={{ fontSize: "small", color: "grey" }}>
           Select hours to schedule Dayparting
          </span>
        </div>
        </div>
        <div className="card-body">
       <Heatmap/>
      </div>
    </>
  )
}

export default DayParting