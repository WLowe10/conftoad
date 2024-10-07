import path from "node:path";
import fs from "node:fs/promises";
import prompts from "prompts";
import { Command } from "commander";
import { getRepoContents } from "../lib/github";
import { getConfig } from "../lib/config";

export const pull = new Command("pull")
	.description("pull configuration files from your repository")
	.argument("[files...]", "Files to pull from the repository")
	.option("-o, --out <outDir>", "Output directory")
	.action(async (files: string[], options: { out?: string }) => {
		const config = await getConfig();

		const repoContents = await getRepoContents(config.username, config.repo);
		const repoFiles = repoContents.filter((item) => item.type === "file");

		if (!files.length) {
			const promptResult = await prompts({
				name: "files",
				type: "autocompleteMultiselect",
				message: "Select files",
				choices: repoFiles.map((item) => ({
					title: item.name,
					value: item.name,
				})),
			});

			files.push(...promptResult.files);
		}

		const outDir = options.out ? path.resolve(options.out) : process.cwd();

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

				console.log(`Pulled ${file}`);
			})
		);
	});
