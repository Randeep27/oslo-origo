import React from "react";
import Stations from "./Stations";
import "./StationList.css";

const StationList = (props) => {
  return (
    <div>
      <div className="wrapper">
        <div className="table">
          <div className="table-head">
            <table>
              <thead>
                <tr className="head">
                  <th className="column1">Stasjon Navn</th>
                  <th className="column2">Sykler</th>
                  <th className="column3">Låser</th>
                </tr>
              </thead>
            </table>
          </div>

          <div className="table-body">
            <table>
              <tbody>
                {props.stationData.map((item) => (
                  <Stations
                    stationName={item.name}
                    bikesAvailable={item.bikesAvailable}
                    docksAvailable={item.docksAvailable}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationList;
