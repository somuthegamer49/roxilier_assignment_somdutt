import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import axios from "axios";
const DashboardTable = () => {
  let [mapdata, setmapdata] = useState([]);
  let [alldata, setalldata] = useState([]);
  let [nextpage, setnextpage] = useState(1);
  useEffect(() => {
    const getdate = async () => {
      try {
        const getdata = await axios.get(
          `http://localhost:5000/statistics?March`
        );
        const data = getdata.data;
        setalldata(data);
        let map = [];
        if (data.length > 10) {
          for (let i = 0; i < 10; i++) {
            map.push(data[i]);
          }
          setmapdata(map);
        } else {
          setmapdata(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getdate();
  }, []);
  let next = () => {
    if (nextpage < alldata.length / 10) {
      let map = [];
      for (let i = mapdata.length * nextpage; i < 10 * (1 + nextpage); i++) {
        map.push(alldata[i]);
      }
      setmapdata(map);
      setnextpage(++nextpage);
    }
  };

  let prev = () => {
    if (nextpage > 1) {
      let map = [];
      setnextpage(--nextpage);
      for (let i = 10 * (nextpage - 1); i < 10 * nextpage; i++) {
        map.push(alldata[i]);
      }
      setmapdata(map);
    }
  };
  const getdate = async (e) => {
    let entry = e.target.value;
    try {
      const getdata = await axios.get(
        `http://localhost:5000/statistics?${entry}`
      );
      const data = getdata.data;
      setalldata(data);
      let map = [];
      if (data.length > 10) {
        for (let i = 0; i < 10; i++) {
          map.push(data[i]);
        }
        setmapdata(map);
      } else {
        setmapdata(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const searchtext = async (e) => {
    let entry = e.target.value;
    try {
      const getdata = await axios.get(
        `http://localhost:5000/statistics?${entry}`
      );
      const data = getdata.data;
      setalldata(data);

      let map = [];
      if (data.length > 10) {
        for (let i = 0; i < 10; i++) {
          map.push(data[i]);
        }
        setmapdata(map);
      } else {
        setmapdata(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <div className="dash-btn">
        <div>
          <input
            className="btn1"
            type="text"
            placeholder="Search Transaction"
            onChange={(e) => searchtext(e)}
          />
        </div>
        <div>
          <select onChange={(e) => getdate(e)} className="btn1">
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

      <table className="dashtable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
        </thead>
        {mapdata !== null &&
          mapdata.length > 0 &&
          mapdata.map((data) => {
            return (
              <tbody>
                <tr>
                  <td>{data.id}</td>
                  <td>{data.title}</td>
                  <td>{data.description}</td>
                  <td>{data.price}</td>
                  <td>{data.category}</td>
                  <td>{String(data.sold)}</td>
                  <td>
                    <img className="img" src={data.image} alt="" />
                  </td>
                </tr>
              </tbody>
            );
          })}
      </table>

      <div className="navgation">
        <div>
          <p>Page {nextpage}</p>
        </div>
        <div>
          <p>
            <span onClick={() => next()}>Next</span>
            <span>-</span>
            <span onClick={() => prev()}>Previous</span>
          </p>
        </div>
        <div>
          <p>Per Page: 10</p>
        </div>
      </div>
    </Fragment>
  );
};

export default DashboardTable;
