const { execSync } = require('child_process');
const fs = require('fs');

const content = execSync('git show aa9a85f:script.js').toString('utf8');
const start = content.indexOf('const papersData = {');
const end = content.indexOf('};\n\n        for (let i = 1; i <= 4; i++)', start);

if (start !== -1 && end !== -1) {
    const papersDataCode = content.substring(start, end + 2);
    fs.writeFileSync('papers_data_extracted.js', papersDataCode, 'utf8');
    console.log('Successfully extracted full 61 papersData from aa9a85f');
} else {
    console.error('Could not find start/end');
}
