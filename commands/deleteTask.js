import readFile from "../db/readFile.js";
import writeFile from "../db/writeFile.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function deleteTask(id) {
  // Log when reading data from the file
  console.log("📂 Reading data from the file...");
  await delay(1000); // Simulate delay
  const fileData = await readFile();
  console.log("✅ Successfully read data from the file!");

  // Log when deleting the task
  console.log("🗑️ Deleting the task...");
  await delay(1000); // Simulate delay

  // Find and delete the task
  const initialLength = fileData.length; // Store initial length to check if deletion occurred
  const newFileData = fileData.filter((task) => task.id !== parseInt(id)); // Filter out the task to delete

  if (initialLength === newFileData.length) {
    console.log("⚠️ Task not found!");
  } else {
    console.log("✅ Task deleted successfully!");
  }

  // Log when writing updated tasks to the file
  console.log("💾 Writing updated tasks to the file...");
  await delay(1000); // Simulate delay
  await writeFile(newFileData); // Write the updated data back to the file
  console.log("✅ Tasks saved successfully!");

  // Final confirmation message
  if (initialLength !== newFileData.length) {
    console.log(`Task deleted successfully (ID: ${id})`);
  } else {
    console.log(`No task found with ID: ${id}.`);
  }
}
