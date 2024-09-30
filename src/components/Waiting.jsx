import React, { useEffect, useRef } from "react";
import "./waiting.css";

const Waiting = ({ roomName }) => {
  const url = `${process.env.REACT_APP_CLIENT_URL}/room/${roomName}`;
  const waitingAudio = useRef(new Audio("/waiting.mp3"));

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      waitingAudio.current.play();
    } catch (err) {
      console.log("copy error: ", err);
    }
  }

  function handleAudioEnd() {
    waitingAudio.current.play();
  }

  useEffect(() => {
    waitingAudio.current.addEventListener("ended", handleAudioEnd);

    return () => {
      waitingAudio.current.removeEventListener("ended", handleAudioEnd);
    };
  }, []);

  return (
    <div className="waiting-container">
      <h2>waiting for the other user</h2>
      <div>
        <a href={url}></a>
        <button onClick={handleCopy}>Copy Room link</button>
      </div>
    </div>
  );
};

export default Waiting;
