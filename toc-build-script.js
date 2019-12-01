// run in node to build the table of contents in the main directory

const fs = require('fs');
const path = require('path');
const directories = [
  '01-basics',
  '02-data-structures',
  '03-oop'
];

const tableOfContents = {};

console.log('----', directories)

directories.forEach(directory => {
  tableOfContents[directory] = [];

  fs.readdirSync('../' + directory)
    .filter(function (file) {
      return path.extname(file) === '.js';
    })
    .forEach(function (file) {
      tableOfContents[directory].push(file);
    });

})

const tocString = JSON.stringify(tableOfContents, null, 2);
fs.writeFileSync('../table-of-contents.js', 'const tableOfContents = ' + tocString);



