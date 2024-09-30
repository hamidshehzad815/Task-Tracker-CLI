import ora from "ora";
import readFile from "../db/readFile.js";
import writeFile from "../db/writeFile.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function deleteTask(id) {
  // Spinner for reading data from the file
  let spinner1 = ora({
    text: "📂 Reading data from the file...",
    spinner: {
      interval: 150,
      frames: ["📂", "📄", "📃", "📑", "🔍"],
    },
    color: "yellow",
  }).start();

  await delay(1000); // Simulate delay
  const fileData = await readFile();
  spinner1.succeed("✅ Successfully read data from the file!");

  // Spinner for deleting the task
  let spinner3 = ora({
    text: "🗑️ Deleting the task...",
    spinner: {
      interval: 100,
      frames: ["🗑️", "🗑️", "🗑️"],
    },
    color: "red",
  }).start();

  await delay(1000); // Simulate delay

  // Find and delete the task
  const initialLength = fileData.length; // Store initial length to check if deletion occurred
  const newFileData = fileData.filter((task) => task.id !== parseInt(id)); // Filter out the task to delete

  spinner3.succeed(
    initialLength === newFileData.length
      ? "⚠️ Task not found!"
      : "✅ Task deleted successfully!"
  );

  // Spinner for writing data back to the file
  const spinner2 = ora({
    text: "💾 Writing updated tasks to the file...",
    spinner: {
      interval: 150,
      frames: ["💾", "📀", "💿", "🔒"],
    },
    color: "magenta",
  }).start();

  await delay(1000); // Simulate delay
  await writeFile(newFileData); // Write the updated data back to the file
  spinner2.succeed("✅ Tasks saved successfully!");

  // Final confirmation message
  if (initialLength !== newFileData.length) {
    console.log(`Task deleted successfully (ID: ${id})`);
  } else {
    console.log(`No task found with ID: ${id}.`);
  }
}
