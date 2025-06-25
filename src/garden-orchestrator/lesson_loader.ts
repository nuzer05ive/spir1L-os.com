import fs from "fs/promises";
export async function loadLesson(curricPath: string, index: number) {
  const lessons = JSON.parse(
    await fs.readFile(curricPath, "utf-8")
  );
  return lessons[index % lessons.length];
}
