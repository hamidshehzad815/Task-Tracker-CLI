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

  // Log when opening the file to read existing tasks
  console.log("📂 Opening the file to read existing tasks...");
  await delay(1000); // Simulate a delay for demonstration
  const fileData = await readFile();
  console.log("✅ Successfully read data from the file!");

  // Log when adding the new task
  console.log("📝 Adding the new task...");
  await delay(1000); // Simulate a delay for demonstration

  const id = Math.floor(Math.random() * 100000000) + 1; // Generate a new ID
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
  console.log("✅ Task added to the list!");

  // Log when saving updated tasks to the file
  console.log("💾 Saving updated tasks to the file...");
  await delay(1000); // Simulate a delay for demonstration
  await writeFile(fileData); // Write the updated data back to the file
  console.log("✅ Tasks saved successfully!");

  // Final confirmation message
  console.log(`Task added successfully (ID: ${id})`);
}
