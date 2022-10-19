const padNumber = (time) => Math.floor(time).toString().padStart(2, "0");

 export const formatTime = (elapsedTime) => {
  const centiseconds = (elapsedTime % 1000) / 10;
  const seconds = (elapsedTime / 1000) % 60;
  const minutes = (elapsedTime / (1000 * 60)) % 60;
  return `${padNumber(minutes)}:${padNumber(seconds)}.${padNumber(
    centiseconds
  )}`;
};