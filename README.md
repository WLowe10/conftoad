# 🐸 conftoad

> A cli tool to quickly pull your configuration files into a project

conftoad uses your github repo as the source of truth for your config files. Add the files in your repo and conftoad will be able to pull them.

## @conftoad/cli usage

### Install

```sh
npm install -g @conftoad/cli
# or
yarn global add @conftoad/cli
# or
pnpm add -g @conftoad/cli
```

### Create a GitHub Repo

For example, you may have a github repository named "config" with a file named `prettier.config.js`

[this](https://github.com/WLowe10/config) is an example.

**Note: The repository needs to be public.**

### Initialize conftoad

Initialize conftoad by using the following command and following the instructions

```sh
conftoad init
```

### Start Pulling Your Files!

Use the `pull` command to pull files from your repo!

```sh
conftoad pull
```

### Caveats

-   conftoad only works with root level files in your github repo
-   conftoad only pulls from the default branch of your github repo

## @conftoad/core usage

`@conftoad/core` should be used as part of a project generator (Think if "create vite", "create remix", or "create t3-app" that uses the user's own prettier config if available to conftoad)

### Install

```sh
npm install @conftoad/core
# or
yarn add @conftoad/core
# or
pnpm add @conftoad/core
```

### Get config

Getting the user's conftoad config is a good way of telling whether or not they have conftoad even setup on their machine. For this, you can use `getConfig`

```typescript
import { getConfig } from "@conftoad/core";

// throws an error if config is not defined
const config = getConfig();
```

You can also use `getConfigSafe` if thrown errors aren't your thing.

```typescript
import { getConfigSafe } from "@conftoad/core";

// throws an error if config is not defined
const result = getConfigSafe();
```

### Get user's repo files

To get the files that are part of a user's conftoad repo,
use `getRepoFiles`.

Maybe you want to add the user's prettier configuration to their generated project. The procedure should be as follows

1. Check if the user has conftoad configured by checking if they have configured conftoad
2. Check if the user's github repo files have a valid prettier config in them. If they do, then you should ask the user "Would you like to use your own prettier config with conftoad?"

```typescript
import { getRepoFiles } from "@conftoad/core";

// throws an error if config is not defined
const files = await getRepoFiles();
```

### Pull a file from the user's github repo

To pull a file from the github repo (download it to the user's machine), use `pullFile`

Example

```typescript
import { getRepoFiles } from "@conftoad/core";

const files = await getRepoFiles();

for (const file of files) {
	await pullFile(file);

	// you can also manually set the output location
	// await pullFile(file, { cwd: "an absolute path to a directory" });
}
```
