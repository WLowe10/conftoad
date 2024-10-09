import prompts from "prompts";
import { Command } from "commander";
import { writeConfig } from "../lib/config";

export const init = new Command("init").description("initialize configr").action(async () => {
	const result = await prompts([
		{
			type: "text",
			name: "username",
			message: "What is your GitHub username?",
		},
		{
			type: "text",
			name: "repo",
			message: "What is the name of your GitHub repository?",
		},
	]);

	await writeConfig(result);
});
