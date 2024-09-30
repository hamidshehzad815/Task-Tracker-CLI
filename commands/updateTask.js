import ora from "ora";
import readFile from "../db/readFile.js";
import writeFile from "../db/writeFile.js";

function date() {
  const currentDate = new Date();
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);
  return formattedDate;
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function updateTask(id, description) {
  // Spinner for Reading Data from File
  let spinner1 = ora({
    text: "🔍 Opening file and reading tasks...",
    spinner: {
      interval: 150,
      frames: ["📂", "📄", "📖", "🔍", "📑"],
    },
    color: "blue",
  }).start();

  await delay(500);
  const fileData = await readFile();
  spinner1.succeed("✅ File read successfully!");

  // Spinner for Updating Task
  let spinner3 = ora({
    text: "🛠️ Updating the task...",
    spinner: {
      interval: 100,
      frames: ["✏️", "📝", "🔄"],
    },
    color: "yellow",
  }).start();

  await delay(500);
  fileData.forEach((task) => {
    if (task["id"] === parseInt(id)) {
      task.description = description;
      task.updatedAt = date();
    }
  });
  spinner3.succeed("✅ Task updated successfully!");

  // Spinner for Writing Data to File
  const spinner2 = ora({
    text: "💾 Saving updated tasks to the file...",
    spinner: {
      interval: 150,
      frames: ["💾", "📀", "💿", "🔒"],
    },
    color: "magenta",
  }).start();

  await delay(500);
  writeFile(fileData);
  spinner2.succeed("✅ Data saved to file!");

  // Final confirmation message
  spinner2.succeed(`Task successfully updated! (ID: ${id})`);
}
