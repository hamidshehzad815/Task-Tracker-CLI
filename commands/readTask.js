import ora from "ora";
import readFile from "../db/readFile.js";
import writeFile from "../db/writeFile.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function readTask(status) {
  let all = false;
  if (!status) all = true;

  // Creative Spinner for Reading Data from File
  let spinner1 = ora({
    text: "Opening and reading file...",
    spinner: {
      interval: 150,
      frames: ["📂", "📄", "📑", "🔍", "📖"],
    },
    color: "blue",
  }).start();

  await delay(1500);
  const fileData = await readFile();
  spinner1.succeed("File read successfully!");

  // Creative Spinner for Listing Tasks
  let spinner3 = ora({
    text: `Listing ${status ? status : "all"} tasks...`,
    spinner: {
      interval: 120,
      frames: ["📝", "📋", "✅", "📃", "📄"],
    },
    color: "green",
  }).start();

  await delay(1500);
  fileData.forEach((task) => {
    if (all) console.log(task);
    else if (task["status"] === status) {
      console.log(task);
    }
  });
  spinner3.succeed(`${status ? status : "All"} tasks listed!`);

  // Creative Spinner for Writing Data to File
  const spinner2 = ora({
    text: "Saving data to file...",
    spinner: {
      interval: 100,
      frames: ["💾", "📀", "💿", "🖋️", "✍️", "💻"],
    },
    color: "magenta",
  }).start();

  await delay(1500);
  writeFile(fileData);
  spinner2.succeed("Data saved to file!");
}
