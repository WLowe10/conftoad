# 🍦 conefig

> A cli tool to quickly pull your configuration files into a project

conefig uses your github repo as the source of truth for your config files. Add the files in your repo and conefig will be able to pull them.

## Install

```sh
npm install -g conefig
# or
yarn global add conefig
# or
pnpm add -g conefig
```

## Usage

### Create a GitHub Repo

For example, you may have a github repository named "config" with a file named `prettier.config.js`

[this](https://github.com/WLowe10/config) is an example.

### Initialize conefig

Initialize conefig by using the following command and following the instructions

```sh
conefig init
```

### Start Pulling Your Files!

Use the `pull` command to pull files from your repo!

```sh
conefig pull
```

## Caveats

-   conefig only works with root level files in your github repo
-   conefig only pulls from the default branch of your github repo
