const fs = require('fs');
const zlib = require('zlib');
const { argv } = require('process');
const { performance } = require('perf_hooks');

if (argv.length !== 4) {
    console.error('Usage: node script.js <source> <target>');
    process.exit(1);
}

const sourcePath = argv[2];
const targetPath = argv[3];

const input = fs.createReadStream(sourcePath);
const output = fs.createWriteStream(targetPath);
const gzip = zlib.createGzip();

const start = performance.now();

input.pipe(gzip).pipe(output).on('finish', () => {
    const end = performance.now();
    const elapsed = end - start;

    const sourceStats = fs.statSync(sourcePath);
    const targetStats = fs.statSync(targetPath);

    console.log(`Source len: ${sourceStats.size}`);
    console.log(`Target len: ${targetStats.size}`);
    console.log(`Elapsed: ${elapsed} ms`);
});
