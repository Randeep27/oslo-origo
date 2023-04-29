import React from "react";

const Stations = (props) => {
  return (
    <tr className="body">
      <td className="column1">{props.stationName}</td>
      <td className="column2">{props.bikesAvailable}</td>
      <td className="column3">{props.docksAvailable}</td>
    </tr>
  );
};

export default Stations;
