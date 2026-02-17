console.clear()
import app from "./app";
import config from "./Config/Config";
import chalk from "chalk";
import { prisma } from "./lib/prisma";

async function main() {
    try {
        await prisma.$connect()
        console.log('Connected to the Database Successfully.')
        app.listen(config.port, () => {
            console.log(chalk.blue(`Server running on http://localhost:${config.port}`));
            console.log(chalk.bold.magenta(`Monitoring dashboard: http://localhost:${config.port}/status`));
        });
    } catch (error) {
        console.error(error)
        await prisma.$disconnect();
        process.exit(1)
    }
}

main()