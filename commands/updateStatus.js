import ora from "ora";
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
  // Spinner for reading data from the file
  const spinner1 = ora({
    text: "📂 Reading data from the file...",
    spinner: {
      interval: 150,
      frames: ["📂", "📄", "📃", "📑", "🔍"],
    },
    color: "yellow",
  }).start();

  await delay(500); // Simulate delay
  const fileData = await readFile();
  spinner1.succeed("✅ Successfully read data from the file!");

  // Spinner for updating status
  const spinner3 = ora({
    text: "🔄 Updating status...",
    spinner: {
      interval: 100,
      frames: ["🔄", "🔁", "🔃", "🔄"],
    },
    color: "cyan",
  }).start();

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
    spinner3.succeed("✅ Status updated successfully!");
  } else {
    spinner3.fail("⚠️ Task not found!");
  }

  // Spinner for writing data back to the file
  const spinner2 = ora({
    text: "💾 Writing updated tasks to the file...",
    spinner: {
      interval: 150,
      frames: ["💾", "📀", "💿", "🔒"],
    },
    color: "magenta",
  }).start();

  await delay(500); // Simulate delay
  await writeFile(fileData); // Write the updated data back to the file
  spinner2.succeed("✅ Tasks saved successfully!");

  // Final confirmation message
  if (taskExists) {
    console.log(`Status updated successfully (ID: ${id})`);
  } else {
    console.log(`No task found with ID: ${id}. Status update failed.`);
  }
}
