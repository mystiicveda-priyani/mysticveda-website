import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const DEFAULT_SLOTS = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM"
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, "../../data/availability.json");

async function ensureFile() {
  try {
    await fs.access(filePath);
  } catch {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(
      filePath,
      JSON.stringify({ slots: DEFAULT_SLOTS }, null, 2),
      "utf-8"
    );
  }
}

export function createAvailabilityStore() {
  return {
    async getSlots() {
      await ensureFile();
      const content = await fs.readFile(filePath, "utf-8");
      const data = JSON.parse(content);
      return data.slots || DEFAULT_SLOTS;
    },

    async saveSlots(slots) {
      await ensureFile();
      const normalizedSlots = [...new Set(slots.filter(Boolean))];
      await fs.writeFile(
        filePath,
        JSON.stringify({ slots: normalizedSlots }, null, 2),
        "utf-8"
      );
      return normalizedSlots;
    }
  };
}
