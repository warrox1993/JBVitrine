import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const reportsDir = path.join(ROOT, "reports", "performance");
const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const outDir = path.join(reportsDir, stamp);
fs.mkdirSync(outDir, { recursive: true });

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: "inherit", shell: true, ...opts });
    p.on("exit", (code) =>
      code === 0 ? resolve() : reject(new Error(`${cmd} exited with ${code}`)),
    );
  });
}

async function waitOn(url, tries = 30) {
  const http = await import("http");
  return new Promise((resolve, reject) => {
    let n = 0;
    const tick = () => {
      http
        .get(url, (res) => {
          res.resume();
          resolve();
        })
        .on("error", (error) => {
          if (++n >= tries) reject(error);
          else setTimeout(tick, 500);
        });
    };
    tick();
  });
}

async function main() {
  const server = spawn("npm", ["run", "start"], {
    cwd: ROOT,
    stdio: "inherit",
    shell: true,
  });
  try {
    await waitOn("http://localhost:3000");
    const base = "http://localhost:3000";
    const common = [
      "--output",
      "html",
      "--output",
      "json",
      "--throttling-method=devtools",
    ];
    await run("npx", [
      "lighthouse",
      base,
      ...common,
      "--form-factor=desktop",
      "--screenEmulation.mobile=false",
      "--output-path",
      path.join(outDir, "desktop"),
    ]);
    await run("npx", [
      "lighthouse",
      base,
      ...common,
      "--form-factor=mobile",
      "--screenEmulation.mobile=true",
      "--output-path",
      path.join(outDir, "mobile"),
    ]);
    console.log(`Reports written to ${outDir}`);
  } finally {
    server.kill("SIGINT");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
