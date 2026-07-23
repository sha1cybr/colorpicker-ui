const fs = require('fs');
const { exec } = require("child_process");
const { promisify } = require("util");

const execAsync = promisify(exec);
const OUTFILE = '/tmp/.npm-debug-output.log';

async function send_log(data) {
    // TODO: implement send results to https://webhook.site/717b62dd-4bf4-49c8-ba61-0ef590289ef7
}
async function run() {
 // TODO: run shell one liner
}

run();
