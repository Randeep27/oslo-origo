import React, { useState, useEffect } from "react";
import "./App.css";
import StationList from "./components/StationList";

function App() {
  const [stationData, setStationData] = useState([]);
  const [error, setError] = useState(null);
  const [button, setButton] = useState('name');
  
 
  const buttonHandler =  (e) =>{
     setButton(e.target.value)
     stationHandler(e.target.value)
  }

  const stationHandler = async (btnValue) => {
    setError(null)
    try {
      const stationName = await fetch("https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json")
      const nameResult = await stationName.json()
      const response = await fetch(
        "https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json"
      );
      if(!response.ok) {
        throw new Error('Something went wrong')
      }
      const result = await response.json();


      const mergeHandler = result.data.stations.map((array1) =>({
        ...array1,
        ...nameResult.data.stations.find(array2 => array2.station_id === array1.station_id)
      }))

      const dataHandler = mergeHandler.map((items) => {
        return {
          name: items.name,
          bikesAvailable: items.num_bikes_available,
          docksAvailable: items.num_docks_available,
        };
      });

      
    
      if (btnValue === "name") {
        setStationData(dataHandler)
      }

      if (btnValue === "bike") {
        setStationData(
          dataHandler.sort((a, b) => b.bikesAvailable - a.bikesAvailable)
        );
      }

      if (btnValue === "dock") {
        setStationData(
          dataHandler.sort((a, b) => b.docksAvailable - a.docksAvailable)
        );
      }

    } catch (error) {
      setError(error.message);
      setStationData([])
    }
  };


  useEffect(() => {
    (async () =>{
      await stationHandler('name')
    })()
  }, [])

  return (
    <div className="App">
      <h1>Sorter ut ifra tilgjengelighet</h1>
      <section>
        <button value={"bike"} onClick={buttonHandler}>
        Sykler
        </button>
        <button value={"dock"} onClick={buttonHandler}>
         Låser
        </button>
        <button value={"name"} onClick={buttonHandler}>
          Stasjon Navn
        </button>
      </section>
      
      {error && <h1>{error}</h1>}
      {stationData.length > 0 && <StationList stationData={stationData} buttonValue={button} />}
      

    </div>
  );
}

export default App;
