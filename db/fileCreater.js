import fs from "fs/promises"; // Use fs/promises for async operations
const filePath = "./db/tasks.json"; // Fixed the typo in the variable name

export default async function createFile() {
  try {
    // Check if the file exists
    await fs.access(filePath);
  } catch (err) {
    // If the file does not exist, create it
    const defaultData = JSON.stringify([], null, 2);
    await fs.writeFile(filePath, defaultData, "utf8");
  }
}
