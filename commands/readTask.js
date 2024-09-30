import readFile from "../db/readFile.js";
import writeFile from "../db/writeFile.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function readTask(status) {
  let all = false;
  if (!status) all = true;

  // Log when starting to read the file
  console.log("📂 Opening and reading the file...");
  await delay(1500); // Simulate delay
  const fileData = await readFile();
  console.log("✅ File read successfully!");

  // Log the task listing status
  console.log(`📋 Listing ${status ? status : "all"} tasks...`);
  await delay(1500); // Simulate delay

  // Display the tasks based on the provided status
  fileData.forEach((task) => {
    if (all) {
      console.log(task);
    } else if (task["status"] === status) {
      console.log(task);
    }
  });

  console.log(`✅ ${status ? status : "All"} tasks listed!`);

  // Log when saving data to the file
  console.log("💾 Saving data to file...");
  await delay(1500); // Simulate delay
  await writeFile(fileData); // Ensure you await the writeFile operation
  console.log("✅ Data saved to file!");
}
