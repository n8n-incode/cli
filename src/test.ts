import { checkAuth, getConfig } from "./helpers";

export default async function test() {
  checkAuth();
  const { endpoint, token } = getConfig();

  console.log("🔍 Fetching all workflows...");

  try {
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

    console.log({ workflows });

    console.log(`✅ Found ${workflows.length} workflows:`);
    console.log("=".repeat(50));

    workflows.forEach((workflow: any, index: number) => {
      console.log(`${index + 1}. ${workflow.name || "Unnamed Workflow"}`);
      console.log(`   ID: ${workflow.id}`);
      console.log(`   Active: ${workflow.active ? "Yes" : "No"}`);
      console.log(
        `   Created: ${new Date(workflow.createdAt).toLocaleString()}`
      );
      console.log(
        `   Updated: ${new Date(workflow.updatedAt).toLocaleString()}`
      );
      console.log("");
    });

    console.log("=".repeat(50));
    console.log(`Total workflows: ${workflows.length}`);
  } catch (error: any) {
    console.error("❌ Failed to fetch workflows:", error.message);
    process.exit(1);
  }
}
