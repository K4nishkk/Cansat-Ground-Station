import "./App.css";
import React, { useState, useEffect } from "react";
import GraphComponent from "./components/GraphComponent/GraphComponent";
import Rocketmodel from "./components/Rocketmodel/Rocketmodel";
import Navbar from "./components/Navbar/Navbar";

// client websocket connection
import { io } from "socket.io-client";
const socket = io("ws://localhost:8888");

const App = () => {
  const [orientation, setOrientation] = useState({ x: 0, y: 0, z: 0 });
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    // executed when newData event occurs
    socket.on("newData", (newData) => { // new Data looks like {data: '[12.22, 18.09, 5.66]'}
      var jsonData = JSON.parse(newData.data); // jsonData looks like [12.22, 18.09, 5.66]

      setOrientation({
        x: jsonData[2],
        y: jsonData[0],
        z: jsonData[1]
      });
    })
  }, []);

  useEffect(() => {
    const generateRandomData = () => {
      const data = [];
      for (let i = 0; i < 10; i++) {
        data.push({ x: i, y: Math.random() * 100 });
      }
      return data;
    };

    setGraphData(generateRandomData());

    const interval = setInterval(() => {
      setGraphData(generateRandomData());
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <Rocketmodel orientation={orientation} />
        </div>
        <div>
          <GraphComponent data={graphData} />
        </div>
      </div>
    </div >
  );
};

export default App;
