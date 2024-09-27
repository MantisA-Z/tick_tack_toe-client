import React, { useState, useRef, useEffect } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [hoverTab, setHoverTab] = useState(false);
  const createRoomInputRef = useRef();
  const joinRoomInputRef = useRef();
  const navigate = useNavigate();

  function joinRoom() {
    const roomName = joinRoomInputRef.current.value;
    if (roomName.trim() === "") {
      joinRoomInputRef.current.placeholder = "Please enter a valid Name";
      return;
    }
    navigate(`/room/${roomName}`);
  }

  function createRoom() {
    const roomName = createRoomInputRef.current.value;
    if (roomName.trim() === "") {
      createRoomInputRef.current.placeholder = "Please enter a valid Name";
      return;
    }
    navigate(`/room/${roomName}`);
  }

  return (
    <div className="container">
      <div className="controllers">
        <button
          onMouseOver={() => setShowCreate(true)}
          onMouseOut={() => {
            setTimeout(() => {
              if (!hoverTab) {
                setShowCreate(false);
              }
            }, 50);
          }}
        >
          Create Room
        </button>
        <button
          onMouseOver={() => setShowJoin(true)}
          onMouseOut={() => {
            setTimeout(() => {
              if (!hoverTab) {
                setShowJoin(false);
              }
            }, 50);
          }}
        >
          Join Room
        </button>
      </div>

      <div
        className="display"
        onMouseOver={() => {
          setHoverTab(true);
        }}
        onMouseOut={() => {
          setHoverTab(false);
        }}
      >
        {showCreate && (
          <div
            className="tab"
            onMouseOver={() => setShowCreate(true)}
            onMouseOut={() => setShowCreate(false)}
          >
            <input ref={createRoomInputRef} type="text" placeholder="Room Id" />
            <button onClick={createRoom}>Create</button>
          </div>
        )}
        {showJoin && (
          <div
            className="tab"
            onMouseOver={() => setShowJoin(true)}
            onMouseOut={() => setShowJoin(false)}
          >
            <input ref={joinRoomInputRef} type="text" placeholder="Room Id" />
            <button onClick={joinRoom}>Join</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
