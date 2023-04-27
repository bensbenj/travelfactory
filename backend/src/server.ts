import express from "express";
import app from "./app";

const server = express();
const PORT = 8080;
server.use(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});