import ora from "ora";
import createFile from "../db/fileCreater.js";
import readFile from "../db/readFile.js";
import writeFile from "../db/writeFile.js";

function date() {
  const currentDate = new Date();
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return currentDate.toLocaleDateString("en-US", options);
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function addTask(description) {
  // Create the tasks file if it doesn't exist
  await createFile();

  // Spinner for reading data from the file
  let spinner1 = ora({
    text: "📂 Opening the file to read existing tasks...",
    spinner: {
      interval: 150,
      frames: ["📂", "📄", "📃", "📑", "📝", "📖", "🔍"],
    },
    color: "yellow",
  }).start();

  await delay(1000); // Simulate a delay for demonstration
  const fileData = await readFile();
  spinner1.succeed("✅ Successfully read data from the file!");

  // Spinner for adding the new task
  let spinner3 = ora({
    text: "📝 Adding the new task...",
    spinner: {
      interval: 100,
      frames: ["📝", "✏️", "🖊️", "📌"],
    },
    color: "green",
  }).start();

  await delay(1000); // Simulate a delay for demonstration
  const id = fileData.length + 1; // Generate a new ID
  const status = "todo"; // Set the initial status
  const createdAt = date(); // Get the current date
  const updatedAt = null; // Initially, no update time
  const task = {
    id,
    description,
    status,
    createdAt,
    updatedAt,
  };

  fileData.push(task); // Add the new task to the array
  spinner3.succeed("✅ Task added to the list!");

  // Spinner for writing data back to the file
  const spinner2 = ora({
    text: "💾 Saving updated tasks to the file...",
    spinner: {
      interval: 150,
      frames: ["💾", "📀", "💿", "🔒"],
    },
    color: "magenta",
  }).start();

  await delay(1000); // Simulate a delay for demonstration
  await writeFile(fileData); // Write the updated data back to the file
  spinner2.succeed("✅ Tasks saved successfully!");

  // Final confirmation message
  spinner2.succeed(`Task added successfully (ID: ${id})`);
}
