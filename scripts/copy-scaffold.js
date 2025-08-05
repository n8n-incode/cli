const fs = require('fs');
const path = require('path');

function copyDirectory(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyDirectory(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

// Copy scaffold folder to dist
const scaffoldSrc = path.join(__dirname, '../scaffold');
const scaffoldDest = path.join(__dirname, '../dist/scaffold');

console.log('📁 Copying scaffold folder to dist...');
copyDirectory(scaffoldSrc, scaffoldDest);
console.log('✅ Scaffold folder copied successfully!');