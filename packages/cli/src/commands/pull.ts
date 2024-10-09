import path from "node:path";
import prompts from "prompts";
import chalk from "chalk";
import { Command } from "commander";
import { ConfigError, getRepoFiles, pullFile } from "@conftoad/core";

export const pull = new Command("pull")
	.description("pull configuration files from your repository")
	.argument("[files...]", "Files to pull from the repository")
	.option("-o, --out <outDir>", "Output directory")
	.action(async (files: string[], options: { out?: string }) => {
		const outDir = options.out ? path.resolve(process.cwd(), options.out) : process.cwd();

		let repoFiles;

		try {
			repoFiles = await getRepoFiles();
		} catch (err) {
			if (err instanceof ConfigError && err.code === "NOT_FOUND") {
				console.log(
					chalk.redBright(
						"conftoad hasn't been initialized on your machine yet. Run `conftoad init` to get started."
					)
				);
			} else {
				console.log(
					chalk.redBright("An error occurred while fetching the repository files.")
				);
			}

			process.exit(1);
		}

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

		await Promise.all(
			files.map(async (file) => {
				const repoFile = repoFiles.find((item) => item.name === file);

				if (!repoFile) {
					return;
				}

				await pullFile(repoFile, { cwd: outDir });

				console.log(`Pulled ${file}`);
			})
		);
	});
