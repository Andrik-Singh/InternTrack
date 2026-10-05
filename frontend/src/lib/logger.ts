
const isDev = process.env.NODE_ENV === "development";

export const logger = {
  log(...args: unknown[]) {
    if (isDev) console.log("[LOG]", ...args);
  },

  info(...args: unknown[]) {
    if (isDev) console.info("[INFO]", ...args);
  },

  warn(...args: unknown[]) {
    if (isDev) console.warn("[WARN]", ...args);
  },

  error(...args: unknown[]) {
    if (isDev) {
      args.forEach((arg) => {
        if (arg instanceof Error) console.error("[ERROR]", arg.message);
        else console.error("[ERROR]", arg);
      });
    }
  },

  debug(...args: unknown[]) {
    if (isDev) console.debug("[DEBUG]", ...args);
  },
};
