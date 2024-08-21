import { React, Fragment, useState, useEffect } from "react";
import Plot from "react-plotly.js";
import axios from "axios";
const Dashboard3 = () => {
  let [ydata, setydata] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  let [datachange, setdatachange] = useState();
  const getdate = async (e) => {
    let entry = e.target.value;
    const getdata = await axios.get(
      `http://localhost:5000/pricerangebar?${entry}`
    );
    const extracteddata = getdata.data;

    setydata([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    setdatachange(extracteddata);
    console.log(ydata);
  };
  useEffect(() => {
    const changeydata = () => {
      let xdata = [
        "0-100",
        "101-200",
        "201-300",
        "301-400",
        "401-500",
        "501-600",
        "601-700",
        "701-800",
        "801-900",
        "901-above",
      ];
      if (datachange) {
        xdata.forEach((x, ind) => {
          if (datachange.range === x) {
            console.log("yes");
            ydata[ind] = datachange.items;
            setydata(ydata);
          }
        });
      }
    };
    changeydata();
  }, [ydata,datachange]);
  return (
    <Fragment>
      <div className="flex3">
        <h1>Statistics</h1>
        <h1>Month</h1>
        <div>
          <select
            onChange={(e) => getdate(e)}
            className="dropdown"
            name=""
            id=""
          >
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
      <div className="dash3">
        <Plot
          data={[
            {
              y: ydata,
              x: [
                "0-100",
                "101-200",
                "201-300",
                "301-400",
                "401-500",
                "501-600",
                "601-700",
                "701-800",
                "801-900",
                "901-above",
              ],
              type: "bar",
            },
          ]}
          layout={{
            xaxis: {
              title: "Price Range",
            },
            yaxis: {
              title: "Items",
            },
          }}
          onInitialized={() => ydata()}
          onUpdate={() => ydata()}
        />
      </div>
    </Fragment>
  );
};

export default Dashboard3;
