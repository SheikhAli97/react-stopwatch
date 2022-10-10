import React, { useEffect, useState } from "react";
import "./Stopwwatch.css";

function Stopwatch() {
  const [totalTime, setTotalTime] = useState(0);
  const [watchIsOn, setWatchIsOn] = useState(false);

  const padNumber = (value) => Math.floor(value).toString().padStart(2, "0");

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
    setWatchIsOn(false);
  };

  const startTime = () => {
    toggleWatchStatus();
  };

  const calculateLap = () => {
    console.log("calculate lap");
  };

  useEffect(() => {
    let intervalID;

    if (watchIsOn) {
      const initialTime = Date.now() - totalTime;
      intervalID = setInterval(() => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - initialTime;
        setTotalTime(elapsedTime);
        console.log(elapsedTime);
      }, 10);
    }

    return () => clearInterval(intervalID);
  }, [watchIsOn]); //run use effect if watch status or time changes

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
                className="initial-lap"
                onClick={watchIsOn ? calculateLap : handleReset}
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
                className={watchIsOn ? "stop-button" : "start-button"}
                onClick={startTime}
              >
                {watchIsOn ? "Stop" : "Start"}
              </button>
            </div>
          </div>

          <div className="laps-container">
            <table id="laps-table" className="laps-table"></table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;
