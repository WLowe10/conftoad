// not the entire response, just the relevant parts
export interface RepoContent {
	name: string;
	path: string;
	sha: string;
	size: number;
	url: string;
	download_url: string;
	type: string;
}

export async function getRepoContents(username: string, repo: string): Promise<RepoContent[]> {
	const response = await fetch(`https://api.github.com/repos/${username}/${repo}/contents`, {
		method: "GET",
	});

	return (await response.json()) as RepoContent[];
}
