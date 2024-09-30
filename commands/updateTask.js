import readFile from "../db/readFile.js";
import writeFile from "../db/writeFile.js";

function date() {
  const currentDate = new Date();
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return currentDate.toLocaleDateString("en-US", options);
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function updateTask(id, description) {
  // Log when opening the file and reading tasks
  console.log("🔍 Opening file and reading tasks...");
  await delay(500);
  const fileData = await readFile();
  console.log("✅ File read successfully!");

  // Log when updating the task
  console.log("🛠️ Updating the task...");
  await delay(500);

  let taskFound = false; // Flag to check if the task was found
  fileData.forEach((task) => {
    if (task["id"] === parseInt(id)) {
      task.description = description;
      task.updatedAt = date();
      taskFound = true; // Set the flag if the task is found
    }
  });

  if (taskFound) {
    console.log("✅ Task updated successfully!");
  } else {
    console.log("⚠️ Task not found!");
  }

  // Log when saving updated tasks to the file
  console.log("💾 Saving updated tasks to the file...");
  await delay(500);
  await writeFile(fileData); // Write the updated data back to the file
  console.log("✅ Data saved to file!");

  // Final confirmation message
  if (taskFound) {
    console.log(`Task successfully updated! (ID: ${id})`);
  } else {
    console.log(`No task found with ID: ${id}. Update failed.`);
  }
}
