import fs from "node:fs";
import { conftoadDir, configPath } from "@conftoad/core";

export interface Config {
	username: string;
	repo: string;
}

export async function writeConfig(config: Config) {
	// ensure that the configr directory exists
	if (!fs.existsSync(conftoadDir)) {
		fs.mkdirSync(conftoadDir, {
			recursive: true,
		});
	}

	await fs.writeFileSync(configPath, JSON.stringify(config));
}
