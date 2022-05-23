const path = require('path');
const pathToFile = path.join(__dirname, 'text.txt');

const fs = require('fs');
const writeStream = fs.createWriteStream(pathToFile, {encoding: 'utf-8', emitClose: false })

const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });

console.log('Введите текст:')
rl.on('line', (line) => {
  let text = line.toString().trim();
  if (text === 'exit') {
    console.log('Goodbye!');
    rl.close();
  }
  else writeStream.write(`${text}\n`);
});

rl.on('SIGINT', () => {
  console.log('Goodbye!');
  rl.close();
})
