import React from 'react'
import { formatTime } from "../utils";


function Buttons({state: {
watchIsOn, addLap, handleReset, totalTime, startTime

}}) {
  
    
  
  
  
  
  
  
    return (
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
   
  )
}

export default Buttons
