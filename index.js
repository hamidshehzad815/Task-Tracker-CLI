#!/usr/bin/env node
import addTask from "./commands/addTask.js";
import updateTask from "./commands/updateTask.js";
import updateStatus from "./commands/updateStatus.js";
import deleteTask from "./commands/deleteTask.js";
import readTask from "./commands/readTask.js";
import { program } from "commander";

function main() {
  program
    .command("todo")
    .description("Your terminal task manager!")
    .version("1.0.0");

  program
    .command("add <description>")
    .description("Create a new todo")
    .action((description) => addTask(description));

  program
    .command("update <id> <description>")
    .description("Update a task")
    .action((id, description) => updateTask(id, description));

  program
    .command("mark-in-progress <id>")
    .description("Update status")
    .action((id) => updateStatus(id, "in-progress"));

  program
    .command("mark-done <id>")
    .description("Update status")
    .action((id) => updateStatus(id, "done"));

  program
    .command("delete <id>")
    .description("Delete a task")
    .action((id) => deleteTask(id));

  program
    .command("list [status]")
    .description("Listing tasks")
    .action((status) => readTask(status));
}

main();
program.parse(process.argv);
