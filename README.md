# 🐸 conftoad

> A cli tool to quickly pull your configuration files into a project

conftoad uses your github repo as the source of truth for your config files. Add the files in your repo and conftoad will be able to pull them.

## Install

```sh
npm install -g conftoad
# or
yarn global add conftoad
# or
pnpm add -g conftoad
```

## Usage

### Create a GitHub Repo

For example, you may have a github repository named "config" with a file named `prettier.config.js`

[this](https://github.com/WLowe10/config) is an example.

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

## Caveats

-   conftoad only works with root level files in your github repo
-   conftoad only pulls from the default branch of your github repo
