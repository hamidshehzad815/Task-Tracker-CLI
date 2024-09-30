#!/usr/bin/env node

import addTask from "./commands/addTask.js";
import updateTask from "./commands/updateTask.js";
import updateStatus from "./commands/updateStatus.js";
import deleteTask from "./commands/deleteTask.js";
import readTask from "./commands/readTask.js";

function showUsage() {
  console.log("Usage:");
  console.log("  todo add <description>        Create a new todo");
  console.log("  todo update <id> <description> Update a task");
  console.log("  todo mark-in-progress <id>    Update status to in-progress");
  console.log("  todo mark-done <id>           Update status to done");
  console.log("  todo delete <id>              Delete a task");
  console.log("  todo list [status]            List tasks");
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    showUsage();
    return;
  }

  const command = args[0];

  switch (command) {
    case "add":
      if (args[1]) {
        addTask(args[1]);
      } else {
        console.log("Description is required for adding a task.");
      }
      break;

    case "update":
      if (args[1] && args[2]) {
        updateTask(args[1], args[2]);
      } else {
        console.log(
          "Both task ID and description are required for updating a task."
        );
      }
      break;

    case "mark-in-progress":
      if (args[1]) {
        updateStatus(args[1], "in-progress");
      } else {
        console.log("Task ID is required for marking a task in progress.");
      }
      break;

    case "mark-done":
      if (args[1]) {
        updateStatus(args[1], "done");
      } else {
        console.log("Task ID is required for marking a task as done.");
      }
      break;

    case "delete":
      if (args[1]) {
        deleteTask(args[1]);
      } else {
        console.log("Task ID is required for deleting a task.");
      }
      break;

    case "list":
      readTask(args[1]);
      break;

    default:
      console.log(`Unknown command: ${command}`);
      showUsage();
      break;
  }
}

main();
