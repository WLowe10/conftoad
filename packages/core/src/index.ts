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

export async function getConfig(): Promise<Config | null> {
	try {
		const content = await fs.readFile(configFile, "utf8");

		return JSON.parse(content);
	} catch {
		return null;
	}
}

// not the entire response, just the relevant parts
export interface RepoContent {
	name: string;
	path: string;
	sha: string;
	size: number;
	url: string;
	type: string;
	download_url: string;
}

export async function getRepoFiles(): Promise<RepoContent[]> {
	const config = await getConfig();

	if (!config) {
		throw new Error("No config found");
	}

	const response = await fetch(
		`https://api.github.com/repos/${config.username}/${config.repo}/contents`,
		{
			method: "GET",
		}
	);

	const contents = (await response.json()) as RepoContent[];
	const files = contents.filter((item) => item.type === "file");

	return files;
}

export declare namespace pullFiles {
	interface Options {
		cwd?: string;
	}
}

export async function pullFiles(files: string[], opts?: pullFiles.Options) {
	const repoFiles = await getRepoFiles();

	const outDir = opts?.cwd ? path.resolve(opts.cwd) : process.cwd();

	try {
		// check if the directory exists. If this fails, create the directory
		await fs.access(outDir);
	} catch (err) {
		await fs.mkdir(outDir, { recursive: true });
	}

	await Promise.all(
		files.map(async (file: string) => {
			const repoFile = repoFiles.find((item) => item.name === file);

			if (!repoFile) {
				return;
			}

			const fileResponse = await fetch(repoFile.download_url);
			const fileContent = await fileResponse.text();

			await fs.writeFile(path.join(outDir, repoFile.path), fileContent);
		})
	);
}
