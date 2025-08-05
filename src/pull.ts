import { promises as fs } from "fs";
import path from "path";
import { checkAuth, getConfig, getWorkflowStateFile } from "./helpers";

async function clearStateDirectory(stateDir: string): Promise<void> {
  try {
    const dirExists = await fs
      .access(stateDir)
      .then(() => true)
      .catch(() => false);
    if (dirExists) {
      const files = await fs.readdir(stateDir);
      for (const file of files) {
        const filePath = path.join(stateDir, file);
        const stat = await fs.stat(filePath);
        if (stat.isFile()) {
          await fs.unlink(filePath);
        }
      }
      console.log("🗑️ Cleared existing state files");
    }
  } catch (error: any) {
    console.warn(
      "⚠️  Warning: Could not clear existing state files:",
      error.message
    );
  }
}

export default async function pull() {
  checkAuth();
  const { endpoint, token } = getConfig();

  const stateDir = path.join(process.cwd(), ".incode", "state");
  await clearStateDirectory(stateDir);

  try {
    console.log("🔍 Pulling all workflows from n8n...");
    const res = await fetch(`${endpoint.replace(/\/$/, "")}/api/v1/workflows`, {
      headers: {
        "x-n8n-api-key": `${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch workflows: ${res.status} ${res.statusText}`
      );
    }

    const { data: workflows } = await res.json();

    const stateDir = path.join(process.cwd(), ".incode", "state");
    await fs.mkdir(stateDir, { recursive: true });

    console.log(`✅ Successfully pulled ${workflows.length} workflows`);

    workflows.forEach(async (workflow: any) => {
      const workflowName = workflow.name || "Unnamed Workflow";
      const safeFileName = getWorkflowStateFile(workflowName);
      const filePath = path.join(stateDir, `${safeFileName}.json`);

      await fs.writeFile(filePath, JSON.stringify(workflow, null, 2));
      console.log(`   ✅ Saved: ${workflowName}`);
    });
  } catch (error: any) {
    console.error("❌ Failed to pull workflows:", error.message);
    process.exit(1);
  }
}
