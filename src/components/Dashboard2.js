import React from "react";
import { Fragment,useState } from 'react';
import axios from 'axios'
const Dashboard2 = (e) => {
    let [alldatasale, setalldatasale] = useState(Number);
    let [alldatasold, setalldatasold] = useState(Number);
    let [alldatanotsold, setalldatanotsold] = useState(Number);
    const monthChange =async(e)=>{
        let entry = e.target.value
        const getdatasale = await axios.get( `http://localhost:5000/totalsale?${entry}`)
        const datasale = getdatasale.data
        const getdatasold = await axios.get( `http://localhost:5000/soldtrue?${entry}`)
        const datasold = getdatasold.data
        const getdatanotsold = await axios.get( `http://localhost:5000/soldfalse?${entry}`)
        const datanotsold = getdatanotsold.data
        setalldatasale(datasale)
        setalldatasold(datasold)
        setalldatanotsold(datanotsold)
    }
  return (
    <Fragment>
      <div className="flex1">
        <h1>Statistics</h1>
        <h1>Month</h1>
        <div>
          <select onChange={(e)=>monthChange(e)} className="dropdown" name="" id="">
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March" selected>
              March
            </option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>
      </div>
      <div className="dash2">
        <div className="style1">
          <h2>Total Sales: {alldatasale}</h2>
          <h2>Total Not Sold Item: {alldatanotsold}</h2>
          <h2>Total Sold Item: {alldatasold}</h2>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard2;
