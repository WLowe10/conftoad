# configr

> A cli tool to quickly pull your configuration files into a project

configr uses your github repo as the source of truth for your config files. Add the files in your repo and configr will be able to pull them.

## Install

```sh
npm install -g configr
# or
yarn global add configr
# or
pnpm add -g configr
```

## Usage

### Create a GitHub Repo

For example, you may have a github repository named "config" with a file named `prettier.config.js`

[this](https://github.com/WLowe10/config) is an example.

### Initialize configr

Initialize configr by using the following command and following the instructions

```sh
configr init
```

### Start Pulling Your Files!

Use the `pull` command to pull files from your repo!

```sh
configr pull
```

## Caveats

-   configr only works with root level files in your github repo
-   configr only pulls from the default branch of your github repo
