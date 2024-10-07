import os from "node:os";
import fs from "node:fs/promises";
import path from "node:path";

const homeDir = os.homedir();

const configrDir = path.join(homeDir, ".configr");
const configFile = path.join(configrDir, "config.json");

export interface Config {
	username: string;
	repo: string;
}

export async function ensureConfigDirExists() {
	await fs.mkdir(configrDir, { recursive: true });
}

export async function getConfig(): Promise<Config> {
	const content = await fs.readFile(configFile, "utf8");

	return JSON.parse(content);
}

export async function writeConfig(config: Config) {
	await fs.writeFile(configFile, JSON.stringify(config));
}
