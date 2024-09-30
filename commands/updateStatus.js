import readFile from "../db/readFile.js";
import writeFile from "../db/writeFile.js";

// Function to get the current date in a formatted way
function date() {
  const currentDate = new Date();
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return currentDate.toLocaleDateString("en-US", options);
}

// Delay function to simulate async behavior
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function updateStatus(id, status) {
  // Log when reading data from the file
  console.log("📂 Reading data from the file...");
  await delay(500); // Simulate delay
  const fileData = await readFile();
  console.log("✅ Successfully read data from the file!");

  // Log when updating status
  console.log("🔄 Updating status...");
  await delay(500); // Simulate delay

  // Check if task exists and update status
  const taskExists = fileData.some((task) => task.id === parseInt(id));
  if (taskExists) {
    fileData.forEach((task) => {
      if (task.id === parseInt(id)) {
        task.status = status;
        task.updatedAt = date();
      }
    });
    console.log("✅ Status updated successfully!");
  } else {
    console.log("⚠️ Task not found!");
  }

  // Log when writing data back to the file
  console.log("💾 Writing updated tasks to the file...");
  await delay(500); // Simulate delay
  await writeFile(fileData); // Write the updated data back to the file
  console.log("✅ Tasks saved successfully!");

  // Final confirmation message
  if (taskExists) {
    console.log(`Status updated successfully (ID: ${id})`);
  } else {
    console.log(`No task found with ID: ${id}. Status update failed.`);
  }
}
