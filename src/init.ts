import * as fs from "fs";
import * as path from "path";
import prompts from "prompts";
import chalk from "chalk";

// Helper function to copy directory recursively
function copyDirectory(
  src: string,
  dest: string,
  variables: Record<string, string> = {}
) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath, variables);
    } else {
      // Read file content and process template variables
      let content = fs.readFileSync(srcPath, "utf8");

      // Process template variables
      for (const [key, value] of Object.entries(variables)) {
        content = content.replace(new RegExp(`{{${key}}}`, "g"), value);
      }

      fs.writeFileSync(destPath, content);
    }
  }
}

interface InitOptions {
  force?: boolean;
}

export default async function init(options: InitOptions = {}) {
  const cwd = process.cwd();
  const scaffoldPath = path.join(__dirname, "../scaffold");

  console.log(chalk.blue("🚀 Initializing inCode project...\n"));

  // Check if we're in an empty directory or if files already exist
  const existingFiles = fs.readdirSync(cwd);
  const hasExistingFiles = existingFiles.some(
    (file) => ![".git", ".gitignore", "README.md"].includes(file)
  );

  if (hasExistingFiles && !options.force) {
    const { proceed } = await prompts({
      type: "confirm",
      name: "proceed",
      message:
        "This directory is not empty. Do you want to proceed with initialization?",
      initial: false,
    });

    if (!proceed) {
      console.log(chalk.yellow("❌ Initialization cancelled."));
      process.exit(0);
    }
  }

  // Copy the entire scaffold directory to the current directory
  console.log(chalk.blue("📁 Copying project template..."));
  copyDirectory(scaffoldPath, cwd, {
    projectName: path.basename(cwd),
  });

  console.log(chalk.blue("\n🎉 Project initialization complete!\n"));

  // Print next steps
  console.log(chalk.green("📋 Next steps:"));
  console.log(chalk.white("1. Install dependencies:"));
  console.log(chalk.gray("   npm install"));
  console.log();
  console.log(chalk.white("2. Authenticate with your n8n instance:"));
  console.log(chalk.gray("   incode login"));
  console.log();
  console.log(chalk.white("3. Edit the sample workflow:"));
  console.log(chalk.gray("   workflows/example/workflow.ts"));
  console.log();
  console.log(chalk.white("4. Test your workflows:"));
  console.log(chalk.gray("   incode test"));
  console.log();
  console.log(chalk.blue("Happy coding! 🚀"));
}
