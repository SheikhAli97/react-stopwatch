import React, { useEffect, useState } from "react";
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
        console.log("slowest: ", previousLapState.currentLapTime);
        console.log(
          previousLapState.laps.indexOf(previousLapState.currentLapTime)
        );
        return {
          ...previousLapState,
          slowestLap: previousLapState.currentLapTime,
        };
      });
    }
    if (lapState.currentLapTime < lapState.fastestLap) {
      setLapState((previousLapState) => {
        console.log("fatest: ", previousLapState.currentLapTime);
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
      console.log("slowest index", slowestIndex);
      console.log("fastest index", fastestIndex);
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
                    <td> {formatTime(lapState.currentLapTime)}</td>
                  </tr>
                )}

                {lapState.laps.map((lap, index) => {
                  return (
                    <tr key={index} className={addClasses(index)}>
                      <td>Lap {lapState.laps.length - index}</td>
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
