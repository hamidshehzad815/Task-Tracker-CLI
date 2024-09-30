import fs from "fs/promises"; // Use fs/promises for async operations
const filePath = "./db/tasks.json"; // Fixed the typo in the variable name

export default async function readFile() {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data); // Parse and return the JSON data
  } catch (err) {
    console.log("Error reading file!");

    // Clear the data by writing an empty array to the file
    try {
      await fs.writeFile(filePath, JSON.stringify([])); // Write an empty array
      console.log("Data cleared due to read error.");
    } catch (writeErr) {
      console.error("Error writing to file!", writeErr); // Log error if writing fails
    }

    return []; // Return an empty array on error
  }
}
