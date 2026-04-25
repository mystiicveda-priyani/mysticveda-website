import http from "node:http";
import dotenv from "dotenv";
import { google } from "googleapis";

dotenv.config();

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET
} = process.env;

const redirectUri = "http://localhost:3000/oauth2callback";

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  console.error(
    "Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET in server/.env"
  );
  process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  redirectUri
);

const scopes = ["https://www.googleapis.com/auth/calendar"];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  prompt: "consent",
  scope: scopes
});

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, redirectUri);

    if (url.pathname !== "/oauth2callback") {
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.end("Not found.");
      return;
    }

    const code = url.searchParams.get("code");
    const error = url.searchParams.get("error");

    if (error) {
      response.writeHead(400, { "Content-Type": "text/plain" });
      response.end("Google authorization was denied. Check the terminal.");
      console.error(`Authorization failed: ${error}`);
      shutdown(1);
      return;
    }

    if (!code) {
      response.writeHead(400, { "Content-Type": "text/plain" });
      response.end("Authorization code missing.");
      console.error("Authorization code missing from callback.");
      shutdown(1);
      return;
    }

    const { tokens } = await oauth2Client.getToken(code);

    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end(
      "Google authorization completed. Return to the terminal to copy your refresh token."
    );

    if (!tokens.refresh_token) {
      console.error(
        "No refresh token was returned. Revoke the app access in your Google account and run this script again."
      );
      shutdown(1);
      return;
    }

    console.log("\nGOOGLE_REFRESH_TOKEN=");
    console.log(tokens.refresh_token);
    console.log("\nAdd this to server/.env:");
    console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
    shutdown(0);
  } catch (error) {
    console.error("Failed to exchange authorization code for tokens.");
    console.error(error);
    shutdown(1);
  }
});

server.listen(3000, () => {
  console.log("Open this URL in your browser and sign in with mystiicveda@gmail.com:\n");
  console.log(authUrl);
  console.log(
    "\nAfter you approve access, Google will redirect back to http://localhost:3000/oauth2callback and the refresh token will print here."
  );
});

function shutdown(code) {
  server.close(() => {
    process.exit(code);
  });
}
