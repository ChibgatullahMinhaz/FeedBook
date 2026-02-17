import express from "express";
import type { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import statusMonitor from "express-status-monitor";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import router from "./Routes";
import authRoutes from "./Routes/auth.routes";
import notFound from "./middlewares/notFound";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import chalk from "chalk";

//* init dotenv config
dotenv.config();

//* make express app
const app: Application = express();
//* ====================
// Built-in Middleware
//* ====================

//* Parse incoming JSON payloads
app.use(express.json());

//* Parse URL-encoded data (from HTML forms)
app.use(express.urlencoded({ extended: true }));

//* Serve static files from 'public' folder
app.use(express.static("public"));


//* ====================
// Security & Performance
//* ====================

app.use(helmet());
app.use(compression());

app.use(
    cors({
        // origin: ["http://localhost:5173", "https://ms-live-app.web.app", "https://ms-agency-portal.web.app"],
        origin: '*',
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);


//* ====================
// Monitoring & Logging
//* ====================

// 1. Real-time server metrics dashboard
// Visit /status to see CPU, memory, response time, etc.
app.use(
    statusMonitor({
        path: "/status",
        spans: [
            { interval: 1, retention: 60 },
            { interval: 5, retention: 60 },
            { interval: 15, retention: 60 },
        ],
        chartVisibility: {
            cpu: true,
            mem: true,
            load: true,
            heap: true,
            responseTime: true,
            rps: true,
            statusCodes: true,
        },
    })
);

//* 2. HTTP request logging
//* Combined format logs method, url, status, response time
app.use(morgan("combined"));



// Global API limiter (all routes starting with /api)
const globalApiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 100, // 100 requests per IP
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: "Too many requests from this IP. Please try again later.",
    },
});

app.use("/api", globalApiLimiter, router);

// Stricter limiter for login/signup routes
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {
        message: "Too many login attempts. Try again after 15 minutes.",
    },
});

app.use("/api/auth", authLimiter, authRoutes);


//* ====================
// Custom Request Logger
//* ====================

app.use((req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    const path = req.path;
    let capturedJsonResponse: Record<string, any> | undefined;
    const originalResJson = res.json;

    res.json = function (bodyJson, ...args) {
        capturedJsonResponse = bodyJson;
        return originalResJson.apply(res, [bodyJson, ...args]);
    };

    res.on("finish", () => {
        const duration = Date.now() - start;

        if (path.startsWith("/api")) {
            // Color status code
            let statusColor =
                res.statusCode >= 500
                    ? chalk.red // server error
                    : res.statusCode >= 400
                        ? chalk.yellow // client error
                        : chalk.green; // success

            let logLine = `${chalk.cyan(req.method)} ${chalk.magenta(path)} ${statusColor(res.statusCode)} in ${chalk.blue(duration + "ms")}`;

            if (capturedJsonResponse) {
                // limit long response JSON
                let responseText = JSON.stringify(capturedJsonResponse);
                if (responseText.length > 60) {
                    responseText = responseText.slice(0, 59) + "…";
                }
                logLine += ` :: ${chalk.gray(responseText)}`;
            }

            console.log(logLine);
        }
    });

    next();
});


//*routes
app.use(globalErrorHandler);

app.use(notFound);

export default app;
