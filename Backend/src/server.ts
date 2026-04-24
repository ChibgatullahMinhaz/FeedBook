console.clear()
import app from "./app";
import config from "./Config/Config";
import chalk from "chalk";
import { prisma } from "./lib/prisma";
import { seedAdmin } from "./script/seedAdmin";

async function main() {
    try {
        await prisma.$connect()
        console.log('Connected to the Database Successfully.')
        app.listen(config.port, async () => {
            console.log(chalk.blue(`Server running on http://127.0.0.1:${config.port}`));
            // console.log(chalk.bold.magenta(`Monitoring dashboard: http://127.0.0.1:${config.port}/status`));
            try {
                await seedAdmin();
            } catch (seedError) {
                console.error(chalk.red("Seed failed:"), seedError);
            }

        });
    } catch (error) {
        console.error(error)
        await prisma.$disconnect();
        process.exit(1)
    }
}

main()