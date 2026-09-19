import compression from "compression";
import express from "express";
import { createServer } from "http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function startServer() {
  const app = express();
  const server = createServer(app);

  // ── Security & performance middleware ─────────────────────
  app.disable("x-powered-by");
  app.use(compression());

  // Basic security headers (lightweight inline — no extra dependency)
  app.use((_req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader(
      "Permissions-Policy",
      "camera=(), microphone=(), geolocation=(self)",
    );
    next();
  });

  // ── Static files ───────────────────────────────────────────
  const staticPath = path.resolve(__dirname, "public");
  app.use(
    express.static(staticPath, {
      maxAge: "1y",
      extensions: ["html"],
      setHeaders: (res, filePath) => {
        // Don't cache index.html — SPA entry point
        if (filePath.endsWith("index.html")) {
          res.setHeader("Cache-Control", "no-cache");
        }
      },
    }),
  );

  // ── Health check ───────────────────────────────────────────
  app.get("/health", (_req, res) => {
    res.json({ status: "ok", timestamp: Date.now() });
  });

  // ── SPA fallback ────────────────────────────────────────────
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  // ── Error handler ──────────────────────────────────────────
  app.use(
    (
      _err: unknown,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction,
    ) => {
      console.error("[server] Error:", _err);
      res.status(500).json({ error: "Internal Server Error" });
    },
  );

  // ── Start ──────────────────────────────────────────────────
  const port = Number(process.env.PORT) || 3000;

  server.on("error", (err: NodeJS.ErrnoException) => {
    if (err.code === "EADDRINUSE") {
      console.error(`Port ${port} is already in use`);
      process.exit(1);
    }
    console.error("Server error:", err);
    process.exit(1);
  });

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });

  // ── Graceful shutdown ──────────────────────────────────────
  const shutdown = () => {
    console.log("\nShutting down gracefully...");
    server.close(() => {
      console.log("Server closed");
      process.exit(0);
    });
    // Force close after 5s
    setTimeout(() => process.exit(1), 5000).unref();
  };

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}

startServer();
