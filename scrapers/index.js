const path = require("path");
const childProcess = require("child_process");
const phantomJsPath = require("phantomjs-prebuilt").path;

exports.fetch = (url) => {
    return new Promise((resolve, reject) => {
        const childArgs = [path.join(__dirname, "phantom-script.js")];
        const phantom = childProcess.execFile(phantomJsPath, childArgs, { env: { URL: url }, maxBuffer: 2048 * 1024 });

        let stdout = "";
        let stderr = "";

        // data comes gradually, bit by bit
        phantom.stdout.on("data", (chunk) => {
            stdout += chunk;
        });

        phantom.stderr.on("data", (chunk) => {
            stderr += chunk;
        });

        phantom.on("uncaughtException", (err) => {
            console.log("uncaught exception: " + err);
        });

        phantom.on("exit", (exitCode) => {
            if (exitCode !== 0) {
                reject(stderr);
            } else {
                resolve(stdout);
            }
        });
    });
};
