import React from "react";
import { formatTime } from "../utils";

function Laps({ state: { watchIsOn, totalTime, lapState, addClasses } }) {
  return (
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
  );
}

export default Laps;
