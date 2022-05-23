
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(filePath);
const {stdin, stdout} = process;

stdout.write('Enter text, please.\n');

stdin.on('data', data => {
  if (data.toString().trim() === 'exit') process.exit();
  writeStream.write(data.toString());
});

process.on('SIGINT', process.exit);

process.on('exit', () => {
  stdout.write('The end');
});
