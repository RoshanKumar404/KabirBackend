// devChecklistCLI.js
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import figlet from 'figlet';

console.log(
  chalk.cyan(figlet.textSync('Dev Checklist')),
  '\nYour personal bug sniper \uD83D\uDD2B\n'
);

const funnyMessages = [
  "You forgot a semicolon again? That’s a criminal offense in 12 programming languages.",
  "Calling res.send() twice? Server just rage-quit internally.",
  "Looks like you typed 'coockie'. Hungry much? 🍪",
  "Missing '/' in route? Your route is as lost as my motivation on Mondays.",
  "JWT with Date.now()? That's not how expiration works, time traveler.",
  "return statement missing? That function is ghosting us." 
];

const checklist = [
  {
    label: 'Missing semicolons',
    pattern: /[^;\s]\n/g,
    hint: funnyMessages[0]
  },
  {
    label: 'Common typo: coockie()',
    pattern: /\bcoockie\b/gi,
    hint: funnyMessages[2]  
  },
  {
    label: 'Multiple res.send()',
    pattern: /res\.send\([^)]*\)[\s\S]*res\.send\(/gi,
    hint: funnyMessages[1]
  },
  {
    label: 'Route path missing "/"',
    pattern: /app\.use\(["'](?!\/)/g,
    hint: funnyMessages[3]
  },
  {
    label: 'Bad JWT expiresIn usage',
    pattern: /expiresIn\s*:\s*(Math\.floor|Date\.now)/,
    hint: funnyMessages[4]
  },
  {
    label: 'Missing return in arrow function',
    pattern: /=\s*\([^)]*\)\s*=>\s*\{[^}]*[^return]/g,
    hint: funnyMessages[5]
  }
];

function getAllJSFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);
  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory() && !filePath.includes('node_modules')) {
      arrayOfFiles = getAllJSFiles(filePath, arrayOfFiles);
    } else if (file.endsWith('.js')) {
      arrayOfFiles.push(filePath);
    }
  });
  return arrayOfFiles;
}

const allFiles = getAllJSFiles(process.cwd());

allFiles.forEach((file) => {
  const code = fs.readFileSync(file, 'utf-8');
  checklist.forEach(({ label, pattern, hint }) => {
    const matches = code.match(pattern);
    if (matches) {
      console.log(chalk.yellow(`\n⚠️  [${label}] found in ${file}`));
      console.log(chalk.gray(`Hint: ${hint}`));
    }
  });
});

console.log(chalk.green('\n✅ Dev checklist scan complete!'));
console.log(chalk.magenta('💡 Tip of the run: ' + funnyMessages[Math.floor(Math.random() * funnyMessages.length)]));
