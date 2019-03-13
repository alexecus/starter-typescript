import fs from 'fs-extra';
import path from 'path';
import bash from 'child_process';
import chalk from 'chalk';

export class CreateCommand {
    private readonly source = path.resolve(__dirname, '../../source');

    execute(name: string) {
        const target = path.resolve(process.cwd(), name);

        if (fs.existsSync(target)) {
            console.log(`The directory '${name}' already exists, please try again`);
            process.exit();
        }

        try {
            fs.mkdirSync(target);
            fs.copySync(this.source, target);
        } catch (error) {
            console.log('Failed to create project');
            console.log(error);

            process.exit();
        }

        const exec = bash.spawn('npm install', { shell: true, cwd: target, stdio: 'inherit' });

        exec.on('exit', function (code) {
            if (code === 0) {
                console.clear();
                console.log(`Congratulations, your project has been created at folder ${chalk.cyanBright.bold(name)}`);
                console.log("\n");
                console.log(`You can run ${chalk.cyanBright.bold('yarn watch')} on the newly created project to actively watch and serve it on ${chalk.cyanBright.bold('localhost:8083')}`);
            } else {
                console.log(`Error initializing project`);
                console.log(code);
            }
        });
    }
}
