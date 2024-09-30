import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSocketContext } from "../contexts/socketContext";
import "./error.css";

const Error = () => {
  const { msg } = useParams();
  const socket = useSocketContext();
  const waitingAudio = useRef(new Audio("/roomFull.mp3"));
  const catImageRef = useRef();

  useEffect(() => {
    socket.disconnect();
  });

  function handleClick() {
    const styleCat = catImageRef.current.style;
    waitingAudio.current.play();
    styleCat.transform = "scale(2.5) rotate(360deg)";
  }

  return (
    <div className="errorContainer">
      <h2 className="errorMsg">{msg}</h2>
      <h2 className="sorryMsg">I'm sorry</h2>
      <p>click on the cat</p>
      <img ref={catImageRef} onClick={handleClick} src="/sadCat.jpg" alt="" />
    </div>
  );
};

export default Error;
