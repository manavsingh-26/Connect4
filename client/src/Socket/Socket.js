import { io } from "socket.io-client";

const socket = io.connect("https://connect-4-manav.herokuapp.com/");

export default socket;