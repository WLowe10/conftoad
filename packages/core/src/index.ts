import os from "node:os";
import fs from "node:fs";
import path from "node:path";
import { z } from "zod";

const homeDir = os.homedir();

export const conftoadDir = path.join(homeDir, ".configr");
export const configPath = path.join(conftoadDir, "config.json");

const configSchema = z
	.object({
		username: z.string(),
		repo: z.string(),
	})
	.strict();

export type Config = z.infer<typeof configSchema>;

export type ConfigErrorCode = "NOT_FOUND";

export class ConfigError extends Error {
	public code: ConfigErrorCode;

	constructor(code: ConfigErrorCode) {
		super();

		this.name = "ConfigError";
		this.code = code;
	}
}

export function getConfig(): Config {
	try {
		const content = fs.readFileSync(configPath, "utf8");

		return configSchema.parse(JSON.parse(content));
	} catch {
		throw new ConfigError("NOT_FOUND");
	}
}

export function getConfigSafe():
	| { success: true; data: Config }
	| { success: false; error: ConfigError } {
	try {
		const content = fs.readFileSync(configPath, "utf8");

		return { success: true, data: configSchema.parse(JSON.parse(content)) };
	} catch {
		return { success: false, error: new ConfigError("NOT_FOUND") };
	}
}

// not the entire response, just the relevant parts
export interface RepoFile {
	name: string;
	path: string;
	sha: string;
	size: number;
	url: string;
	type: string;
	download_url: string;
}

export async function getRepoFiles(): Promise<RepoFile[]> {
	const config = getConfig();

	const response = await fetch(
		`https://api.github.com/repos/${config.username}/${config.repo}/contents`,
		{
			method: "GET",
		}
	);

	const contents = (await response.json()) as RepoFile[];
	const files = contents.filter((item) => item.type === "file");

	return files;
}

export declare namespace pullFile {
	interface Options {
		cwd?: string;
	}
}

export async function pullFile(file: RepoFile, opts?: pullFile.Options) {
	const outDir = opts?.cwd ?? process.cwd();

	if (!fs.existsSync(outDir)) {
		fs.mkdirSync(outDir, {
			recursive: true,
		});
	}

	const fileResponse = await fetch(file.download_url);
	const fileContent = await fileResponse.text();

	await fs.writeFileSync(path.join(outDir, file.path), fileContent);
}
