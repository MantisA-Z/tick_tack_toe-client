import React, { useState, useEffect, useRef } from "react";
import Waiting from "./Waiting";
import { useParams } from "react-router-dom";
import { useSocketContext } from "../contexts/socketContext";
import { useNavigate } from "react-router-dom";
import "./room.css";

const Room = () => {
  const [moves, setMoves] = useState(new Array(9).fill(""));
  const [info, setInfo] = useState("...");
  const [roomMembers, setRoomMembers] = useState([]);
  const membersLength = roomMembers.length;
  const [myTurn, setMyTurn] = useState(false);
  const [myRole, setMyRole] = useState("");
  const winSound = useRef(new Audio("/win.mp3"));
  const { roomName } = useParams();
  const navigate = useNavigate();
  let socket = useSocketContext();

  function handleMove(e) {
    const slot = parseInt(e.target.getAttribute("data-slot"), 10);
    if (!myTurn) {
      return setInfo("Wait for your turn");
    } else if (moves[slot] !== "") {
      return setInfo("Illegal move!");
    }
    setInfo("");

    const updatedMoves = [
      ...moves.slice(0, slot),
      myRole,
      ...moves.slice(slot + 1),
    ];
    setMoves(updatedMoves); // Update state

    // Emit the updated moves directly
    socket.emit("user:move", { moves: updatedMoves, roomName });
    setMyTurn(false); // Update turn state
  }

  useEffect(() => {
    socket.emit("user:join-room", { roomName });
  }, []);

  useEffect(() => {
    socket.on("server:room-joined", ({ roomName, updatedRoomMembers }) => {
      console.log(`roomName: ${roomName} roomMembers: ${updatedRoomMembers}`);
      setRoomMembers(updatedRoomMembers);
    });

    socket.on("server:user-room-left", ({ remainingUsers }) => {
      setRoomMembers(remainingUsers);
    });

    socket.on("server:moves", ({ moves }) => {
      setMoves(moves);
    });

    socket.on("server:user-win", async ({ socketId }) => {
      if (socket.id === socketId) {
        setMoves(new Array(9).fill(""));
        setInfo("You win! :>");
        winSound.current.play();
        setMyTurn(true);
      } else {
        setMoves(new Array(9).fill(""));
        setInfo("You lost :<");
      }
    });

    socket.on("server:game-draw", ({ socketId }) => {
      setMoves(new Array(9).fill(""));
      setInfo("Game draw :-|");
      if (socketId === socket.id) {
        setMyTurn(true);
      }
    });

    socket.on("server:X-turn", () => {
      setMyRole("X");
      setMyTurn(true);
    });

    socket.on("server:O-turn", () => {
      setMyRole("O");
    });

    socket.on("server:turn", () => {
      setMyTurn(true);
    });

    socket.on("server:room-full", ({ msg }) => {
      navigate(`/error/${msg}`);
    });

    return () => {
      socket.off("server:room-joined");
      socket.off("server:room-full");
      socket.off("server:user-room-left");
      socket.off("server:moves");
      socket.off("server:user-win");
    };
  });

  return membersLength !== 2 ? (
    <Waiting roomName={roomName} />
  ) : (
    <div className="gameBox">
      <p className="role">You are {myRole}:</p>
      <h2 className="turn">
        {myTurn ? "It is your turn" : "It is opponent's turn"}
      </h2>
      <h2
        className="info"
        style={{
          display: info !== "" ? "block !important" : "none !important",
        }}
      >
        {info}
      </h2>
      <div className="gameContainer">
        {moves.map((value, index) => (
          <div
            onClick={handleMove}
            className={index + 1}
            data-slot={index}
            key={index}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Room;
