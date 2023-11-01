import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import csvFile from './CSV/AAPL.csv';
import { ChartComponent } from './Charts/Chart1';

const Check = () => {
  const [aapldata, setData] = useState([]);

  useEffect(() => {
    Papa.parse(csvFile, {
      download: true,
      header: true,
      complete: function(results) {
        const selectedData = results.data.map(row => ({
            time: row.Date,
            value: parseFloat(row.Open)
            // Add more columns as needed
          }));
          setData(selectedData);
      }
    });
  }, []);

  return (
    <div>
      {/* Display the parsed data */}
      {aapldata.map((row, i) => {
        return(
        <div key={i}>
          <span>{row.time}</span>
          <span>{row.value}</span>
        </div>
      )})}


<div style={{ marginLeft:"199px",marginTop:"3%", width:"80%" , border:"1px solid black"}}>
        <ChartComponent data={aapldata}></ChartComponent>
      </div>

    </div>
  );
};

export default Check;
