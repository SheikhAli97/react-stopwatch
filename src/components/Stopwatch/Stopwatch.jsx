import React, { useEffect, useState } from "react";
import Buttons from "../Buttons/Buttons";
import Laps from "../Laps/Laps";
import { formatTime } from "../utils";
import "./Stopwwatch.css";

function Stopwatch() {
  const [totalTime, setTotalTime] = useState(0);
  const [watchIsOn, setWatchIsOn] = useState(false);

  const [lapState, setLapState] = useState({
    laps: [],
    currentLapTime: 0,
    totalLapTime: 0,
    slowestLap: -1,
    fastestLap: Infinity,
  });

  const toggleWatchStatus = () => {
    setWatchIsOn(!watchIsOn);
  };

  const handleReset = () => {
    setTotalTime(0);
    setLapState({
      laps: [],
      currentLapTime: 0,
      totalLapTime: 0,
      slowestLap: -1,
      fastestLap: Infinity,
    });
  };

  const startTime = () => {
    toggleWatchStatus();
  };

  const checkFastestSlowestLap = () => {
    if (lapState.currentLapTime > lapState.slowestLap) {
      // lapState.slowestLap = lapState.currentLapTime;
      setLapState((previousLapState) => {
        return {
          ...previousLapState,
          slowestLap: previousLapState.currentLapTime,
        };
      });
    }
    if (lapState.currentLapTime < lapState.fastestLap) {
      setLapState((previousLapState) => {
        return {
          ...previousLapState,
          fastestLap: previousLapState.currentLapTime,
        };
      });
    }
  };

  const addClasses = (index) => {
    if (lapState.laps.length >= 2) {
      const slowestIndex = lapState.laps.indexOf(lapState.slowestLap);
      const fastestIndex = lapState.laps.indexOf(lapState.fastestLap);
      if (slowestIndex === index) {
        return "slowest-lap";
      }
      if (fastestIndex === index) {
        return "fastest-lap";
      }
      return "";
    }
  };

  //check if lap button has been clicked.

  useEffect(() => {
    let intervalID;

    if (watchIsOn) {
      const initialTime = Date.now() - totalTime;
      intervalID = setInterval(() => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - initialTime;
        setTotalTime(elapsedTime);
        setLapState((previousLapState) => ({
          ...previousLapState,
          currentLapTime: elapsedTime - previousLapState.totalLapTime,
        }));
      }, 10);
    }

    return () => clearInterval(intervalID);
  }, [watchIsOn]); //run use effect if watch status or time changes

  const addLap = () => {
    //add lap to the
    if (totalTime > 0) {
      setLapState((previousLapData) => ({
        ...previousLapData,
        laps: [lapState.currentLapTime, ...previousLapData.laps],
        totalLapTime:
          previousLapData.totalLapTime + previousLapData.currentLapTime,
      }));
    }
    checkFastestSlowestLap();
  };

  return (
    <div>
      <div className="wrapper">
        <div className="main">
          <div id="timer" className="main-timer">
            {formatTime(totalTime)}
          </div>
          <Buttons
            state={{ watchIsOn, addLap, handleReset, totalTime, startTime }}
          />

          <Laps state={{ watchIsOn, totalTime, lapState, addClasses }} />
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;
