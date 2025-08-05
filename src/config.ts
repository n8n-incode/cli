import path from "path";
import fs from "fs";

export const CONFIG_DIR = path.join(process.cwd(), ".incode");

export const CONFIG_FILE = path.join(CONFIG_DIR, "config.json");

export function getConfig() {
  if (!fs.existsSync(CONFIG_FILE)) {
    return null;
  }

  const config = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf8"));

  return config;
}

export function checkAuth() {
  const config = getConfig();

  if (!config) {
    console.error(
      "❌ Configuration not found. Please run 'incode login' first."
    );
    process.exit(1);
  }

  if (!config.endpoint || !config.token) {
    console.error("❌ Invalid configuration. Please run 'incode login' again.");
    process.exit(1);
  }
}
