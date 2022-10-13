import React, { useEffect, useState } from "react";
import "./Stopwwatch.css";

function Stopwatch() {
  const [totalTime, setTotalTime] = useState(0);
  const [watchIsOn, setWatchIsOn] = useState(false);

  const [lapState, setLapState] = useState({
    laps: [],
    runningTime: 0,
    totalLapTime: 0,
    slowestLap: [],
    fastestLap: [],
  });
  

  const padNumber = (time) => Math.floor(time).toString().padStart(2, "0");

  const formatTime = (elapsedTime) => {
    const centiseconds = (elapsedTime % 1000) / 10;
    const seconds = (elapsedTime / 1000) % 60;
    const minutes = (elapsedTime / (1000 * 60)) % 60;
    return `${padNumber(minutes)}:${padNumber(seconds)}.${padNumber(
      centiseconds
    )}`;
  };

  const toggleWatchStatus = () => {
    setWatchIsOn(!watchIsOn);
  };

  const handleReset = () => {
    setTotalTime(0);
    setLapState({
      laps: [],
      runningTime: 0,
      totalLapTime: 0,
      slowestLap: [],
      fastestLap: [],
    });
  };

  const startTime = () => {
    toggleWatchStatus();
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
          runningTime: elapsedTime - previousLapState.totalLapTime,
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
        laps: [...previousLapData.laps, lapState.runningTime],
        totalLapTime:
          previousLapData.totalLapTime + previousLapData.runningTime,
      }));
    }

    console.log(lapState);
  };

  return (
    <div>
      <div className="wrapper">
        <div className="main">
          <div id="timer" className="main-timer">
            {formatTime(totalTime)}
          </div>
          <div className="button-container">
            <div className="button-wrapper">
              <button
                id="reset"
                className="initial-lap button"
                onClick={watchIsOn ? addLap : handleReset}
              >
                {watchIsOn
                  ? "Lap"
                  : "Reset" && totalTime === 0
                  ? "Lap"
                  : "Reset"}
              </button>
            </div>
            <div className="button-wrapper">
              <button
                id="start"
                className={
                  watchIsOn ? "stop-button button" : "start-button button"
                }
                onClick={startTime}
              >
                {watchIsOn ? "Stop" : "Start"}
              </button>
            </div>
          </div>

          <div className="laps-container">
            <table id="laps-table" className="laps-table">
              <tbody>
                {(watchIsOn || totalTime > 0) && (
                  <tr className="table-row">
                    <td> Lap {lapState.laps.length + 1}</td>
                    <td> {formatTime(lapState.runningTime)}</td>
                  </tr>
                )}

                {lapState.laps.map((lap, index) => {
                  return (
                    <tr key={index} className="table-row">
                      <td>Lap {index + 1}</td>
                      <td>{formatTime(lap)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;
