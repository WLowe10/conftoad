#!/usr/bin/env node

import { Command } from "commander";
import { init } from "./commands/init";
import { pull } from "./commands/pull";

const cli = new Command();

cli.addCommand(init).addCommand(pull);

cli.parse();
