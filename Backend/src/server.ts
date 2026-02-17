console.clear()
import app from "./app";
import config from "./Config/Config";
import chalk from "chalk";

app.listen(config.port, () => {
    console.log(chalk.blue(`Server running on http://localhost:${config.port}`));
    console.log(chalk.bold.magenta(`Monitoring dashboard: http://localhost:${config.port}/status`));
});
