import React, { useEffect, useState } from "react";
import "./Stopwwatch.css";

function Stopwatch() {
  const [totalTime, setTotalTime] = useState(0);
  const [watchIsOn, setWatchIsOn] = useState(false);

  const formatTime = (time) => {
    let formattedMilliseconds = 0;
    let formattedSeconds = 0;
    let formattedMinutes = 0;
    let formattedTime = [];
    let finalTime = ``;
    formattedMilliseconds = time % 1000;
    formattedSeconds = Math.floor(time / 1000);
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
    return time.toString().padStart(2, "0").substring(0,2);
  };

  const toggleWatchStatus =() => 
  {
    setWatchIsOn(!watchIsOn);
  }

const handleReset = () =>{
   setTotalTime(0);
  setWatchIsOn(false);
}

const startTime =()=>{
  toggleWatchStatus();
}

const calculateLap =  () => {
console.log('calculate lap')
}




useEffect(() => {
  let intervalID;

  
  if (watchIsOn) {
    const initialTime = Date.now() - totalTime;
    intervalID = setInterval(() => {

        const currentTime = Date.now()
        const elapsedTime = currentTime - initialTime; 
        setTotalTime(elapsedTime);
       console.log(elapsedTime)
      
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
              <button id="reset" className='initial-lap' onClick={watchIsOn ? calculateLap : handleReset}>
                { watchIsOn ? 'Lap' : 'Reset' && totalTime === 0 ? 'Lap' : 'Reset'}
                
              </button>
            </div>
            <div className="button-wrapper">
              <button id="start" className={watchIsOn ? "stop-button" : "start-button"} onClick={startTime}>
                {watchIsOn ? 'Stop' : 'Start'}
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
