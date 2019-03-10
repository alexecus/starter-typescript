#!/usr/bin/env node

import program from 'commander';
import { CreateCommand } from './commands/create';

program
    .name('typescipt-starter')
    .version('1.0');

program
    .command('new [name]')
    .description('Creates a new typescript starter package')
    .action((name: string) => {
        const command = new CreateCommand();
        command.execute(name);
    });

program.parse(process.argv);
console.log(process.cwd());
