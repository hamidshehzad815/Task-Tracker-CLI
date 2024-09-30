// db/writeFile.js
import fs from "fs/promises";
const filePath = "./db/tasks.json";

export default async function writeFile(data) {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, jsonData, "utf8");
  } catch (err) {
    console.error("Error writing file!", err);
  }
}
