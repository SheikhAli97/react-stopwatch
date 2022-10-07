import React, { useEffect, useState } from "react";
import "./Stopwwatch.css";

function Stopwatch() {
  const [totalTime, setTotalTime] = useState(0);
  let [watchIsOn, setWatchIsOn] = useState(false);

  const formatTime = (time) => {
    let formattedMilliseconds = 0;
    let formattedSeconds = 0;
    let formattedMinutes = 0;
    let formattedTime = [];
    let finalTime = ``;
    formattedMilliseconds = time % 100;
    formattedSeconds = Math.floor(time / 100);
    formattedMinutes = Math.floor(formattedSeconds / 60);

    formattedSeconds = formattedSeconds % 60;
    formattedMinutes = formattedMinutes % 60;

    formattedTime = [
      formattedMinutes,
      formattedSeconds,
      formattedMilliseconds,
    ].map(padNumber);
    finalTime = `${formattedTime[0]}:${formattedTime[1]}.${formattedTime[2]}`;
    return finalTime;
  };

  const padNumber = (time) => {
    return time.toString().padStart(2, "0");
  };

  function toggleWatchStatus() 
  {
    setWatchIsOn(!watchIsOn);
  }

const reset = () =>{
  setTotalTime(0); 
  setWatchIsOn(false);
}

function startTime(){
  toggleWatchStatus();
}





  useEffect(() => {
    let intervalID;
    let initialTime = Date.now

    if (watchIsOn) {
      intervalID = setInterval(() => {
        setTotalTime((totalTime) => totalTime + 1);
        console.log(totalTime)
      }, 10);
    } 

    if (!watchIsOn) {
      clearInterval(intervalID)
    }


    return () => clearInterval(intervalID);
  }, [watchIsOn, totalTime]); //run use effect if watch status or time changes







  return (
    <div>
      <div className="wrapper">
        <div className="main">
          <div id="timer" className="main-timer">
            {formatTime(totalTime)}
          </div>
          <div className="button-container">
            <div className="button-wrapper">
              <button id="reset" className="initial-lap">
                Lap
              </button>
            </div>
            <div className="button-wrapper">
              <button id="start" className="start-button" onClick={startTime}>
                Start
              </button>
            </div>
          </div>

          <div className="laps-container">
            <table id="laps-table" className="laps-table">
             
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;
