
import { Application, Router } from "./deps.ts";
import React from "https://esm.sh/react@18.2.0";
import ReactDOMServer from "https://esm.sh/react-dom@18.2.0/server";
import App from "./App.tsx";

const app = new Application();
const router = new Router();

// Define SSR route
router.get("/", (context) => {
  const html = ReactDOMServer.renderToString(<App />);
  context.response.body = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Deno SSR with React</title>
    </head>
    <body>
      <div id="root">${html}</div>
    </body>
    </html>
  `;
});

// Add router middleware
app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server is running on http://localhost:8000");
await app.listen({ port: 8000 });