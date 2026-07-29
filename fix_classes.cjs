const fs = require('fs');
const path = require('path');

const replacements = {
  'before:via-gray-200:via-gray-700': 'before:via-gray-200',
  'group-hover:text-gray-600:text-gray-300': 'group-hover:text-gray-600',
  'group-hover:text-gray-900:text-white': 'group-hover:text-gray-900',
  'hover:bg-gray-100:bg-gray-700': 'hover:bg-gray-100',
  'hover:bg-gray-100:bg-gray-800': 'hover:bg-gray-100',
  'hover:bg-gray-50:bg-gray-700': 'hover:bg-gray-50',
  'hover:bg-gray-50:bg-gray-800': 'hover:bg-gray-50',
  'hover:border-blue-300:border-blue-700': 'hover:border-blue-300',
  'hover:border-gray-300:border-gray-600': 'hover:border-gray-300',
  'hover:text-blue-500:text-blue-300': 'hover:text-blue-500',
  'hover:text-gray-700:text-gray-300': 'hover:text-gray-700',
  'hover:text-gray-900:text-gray-200': 'hover:text-gray-900',
  'selection:bg-blue-200:bg-blue-900': 'selection:bg-blue-200',
  'hover:bg-gray-50:bg-gray-700/50': 'hover:bg-gray-50',
  'hover:bg-gray-100:bg-gray-700/50': 'hover:bg-gray-100'
};

function processDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let newContent = content;
            for (const [bad, good] of Object.entries(replacements)) {
                newContent = newContent.split(bad).join(good);
            }
            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent);
                console.log(`Updated ${fullPath}`);
            }
        }
    });
}
processDir('src');
