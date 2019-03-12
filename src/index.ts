#!/usr/bin/env node
import program from 'commander';

import { CreateCommand } from './commands/create';

program
    .name('typescipt-starter')
    .version('1.0.6');

program
    .command('new <name>')
    .description('Creates a new typescript starter package')
    .action((name: string) => {
        const command = new CreateCommand();
        command.execute(name);
    });

if (!process.argv.slice(2).length) {
    program.outputHelp();
}

program.parse(process.argv);
