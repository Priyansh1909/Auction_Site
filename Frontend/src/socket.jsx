import { useState } from "react";
import { io } from "socket.io-client"; 

export const socket = io('http://localhost:8000');
