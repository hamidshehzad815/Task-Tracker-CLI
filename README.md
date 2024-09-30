# Todo Application

This is a simple command-line Todo application built with Node.js. It allows users to manage their tasks by adding, updating, deleting, and changing the status of tasks.

## Features

- Add new tasks
- Update existing tasks
- Mark tasks as in-progress or done
- Delete tasks
- List tasks by status

## Prerequisites

Make sure you have the following installed:

- Node.js (v14 or later)
- npm (Node package manager)

## Installation

1. Clone the repository to your local machine:

   git clone https://github.com/hamidshehzad815/Task-Tracker-CLI
   
   cd todo-app

## Usage

You can run the application using Node.js. Below are the available commands:

### Create a new todo

task-cli add "description"

### Update a task

task-cli update id description

### Mark a task as in-progress

task-cli mark-in-progress id

### Mark a task as done

task-cli mark-done id

### Delete a task

task-cli delete id

### List tasks

task-cli list [status]

**Note:** Replace id with the task ID and description with the task details.

## Example

To add a new task:

task-cli add "Finish writing README"

To list all tasks:

task-cli list
