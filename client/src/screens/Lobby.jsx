import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import { useNavigate } from "react-router-dom";

const Lobby = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const socket=useSocket();
  // console.log(socket);
  const navigate=useNavigate();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    // console.log({email,room})
    socket.emit("room:join", {email,room});
  }, [room,email,socket]);

  const handleJoinRoom = useCallback((data) => {
    const {email, room} = data;
    // console.log(email, room);
    navigate(`/room/${room}`)

  },[])

useEffect(()=>{
  socket.on("room:join",handleJoinRoom);

  return ()=>{socket.off('room:join',handleJoinRoom);}
}, [socket,handleJoinRoom])
  

  return (
    <div className="p-4 bg-red mt-4 flex-col justify-center">
    <h1>Lobby</h1>
      <div >
        {" "}
        <form onSubmit={handleSubmit}>
          <div className="p-4  border">
            <label htmlFor="Email" />Email <label/>
            <input
              type="text"
              id="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
          <label htmlFor="Room" />Room<label/>
            <input
              type="text"
              id="Room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
          </div>
          <button className="border align-center">Join</button>
        </form>
      </div>
    </div>
  );
};

export default Lobby;
