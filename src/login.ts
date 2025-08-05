import prompts from "prompts";
import fs from "fs";
import os from "os";
import path from "path";
import { CONFIG_DIR, CONFIG_FILE } from "./helpers";

export default async function login() {
  //   const { endpoint, token } = await prompts([
  //     {
  //       type: "text",
  //       name: "endpoint",
  //       message: "Enter your n8n host (e.g. https://n8n.example.com):",
  //       validate: (value) =>
  //         value.startsWith("http") ? true : "Must start with http",
  //     },
  //     {
  //       type: "password",
  //       name: "token",
  //       message: "Enter your n8nm API access token (go to Settings -> n8n API -> Create API Key):",
  //     },
  //   ]);

  const endpoint = process.env.MY_N8N_HOST;
  const token = process.env.MY_N8N_TOKEN;

  if (!endpoint || !token) {
    console.log("Aborted.");
    process.exit(1);
  }

  console.log("Authenticating...");

  try {
    const res = await fetch(`${endpoint.replace(/\/$/, "")}/api/v1/users`, {
      headers: {
        "x-n8n-api-key": `${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Authentication failed: ${res.status} ${res.statusText}`);
    }

    const user = await res.json();
    console.log(`Authenticated as: ${user.email || user.id || "unknown user"}`);
  } catch (e: any) {
    console.error("❌ Authentication failed:", e.message);
    process.exit(1);
  }

  try {
    if (!fs.existsSync(CONFIG_DIR)) {
      console.log(`Creating directory: ${CONFIG_DIR}`);
      fs.mkdirSync(CONFIG_DIR, { recursive: true });
    }

    // Write the config file
    const configData = JSON.stringify({ endpoint, token }, null, 2);
    fs.writeFileSync(CONFIG_FILE, configData);

    console.log(`✅ Credentials saved to ${CONFIG_FILE}`);
  } catch (error) {
    console.error("❌ Failed to save credentials:", error);
    console.error(`Config directory: ${CONFIG_DIR}`);
    console.error(`Config file: ${CONFIG_FILE}`);
    process.exit(1);
  }
}
