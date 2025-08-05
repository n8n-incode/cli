#!/usr/bin/env node

import dotenv from "dotenv";
dotenv.config();

import { Command } from "commander";
import login from "./login";
import test from "./test";
import init from "./init";
import pull from "./pull";

const program = new Command();

program
  .name("incode")
  .description("inCode CLI for managing n8n workflows as code")
  .version("0.1.0");

program
  .command("init")
  .description("Initialize a new inCode project in the current directory")
  .option("-f, --force", "Force initialization even if directory is not empty")
  .action(async (options) => {
    await init(options);
  });

program
  .command("login")
  .description("Authenticate with your n8n instance")
  .action(login);

program
  .command("test")
  .description("Get all workflows and display them")
  .action(test);

program
  .command("pull")
  .description("Pull all workflows from n8n API to sync with the local project")
  .action(pull);

program.parse(process.argv);
