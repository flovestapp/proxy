const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const PORT = 3333;

const app = express();

const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "https://myflovest.com",
  "https://app.myflovest.com",
  "https://flovest-dashboard.web.app/",
  "https://flovest-web.web.app",
];

app.use(
  cors({
    origin: ALLOWED_ORIGINS,
  })
);

app.use(
  "/",
  createProxyMiddleware({
    target: "https://app.flovest.biz/api/v1",
    changeOrigin: true,
    headers: {
      "Access-Control-Allow-Origin": ALLOWED_ORIGINS,
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
      "Access-Control-Allow-Credentials": true,
    },
  })
);

app.listen(PORT, () => console.log(`Server running on PORT:${PORT}`));
