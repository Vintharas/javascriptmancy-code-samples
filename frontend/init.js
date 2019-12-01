const cache = {};

const userName = window.location.origin
  .split('https://').join('')
  .split('http://').join('')
  .split('.')
  .shift();

const preRepoName = window.location.pathname
  .split('index.html').join('');
const repoName = preRepoName
  .slice(1, preRepoName.length - 1);


const views = {
  tableOfContents: {
    dom: renderTableOfContents(tableOfContents),
    console: `Let JavaScript Be Your Next Adventure!
  (https://www.javascriptmancy.com/)
Are you a C# or Java developer curious about the awesome things happening in the JavaScript world? Would you like to be a part of it? Build super rich web applications, mobile apps, backend services or even robots? Does JavaScript frustrate you? Would you like to master it and never again feel like you cannot make the language do what you want?
Are you a fan of the Fantasy genre? A sucker for wizards, elf-bowmen, powerful sorceresses and evil trolls? Love the works of Brandon Sanderson, G.R.R. Martin or Tolkien? Did you enjoy the Lord of the Rings or Game of Thrones?
Then this is the place for you! The JavaScript-mancy series are a collection of beautifully written JavaScript books that are a blast to read. Learn the basics of JavaScript, OOP, Functional Programming, async, ES6, TypeScript, tooling, testing, Angular 2 and more! `,
  },
}

window.onload = () => {

  // permalinking files would be cool, but doesn't exist yet

  const urlString = window.location.href;
  const url = new URL(urlString);

  const directory = url.searchParams.get("directory");
  const file = url.searchParams.get("file");

  const root = document.getElementById('root');
  if (directory && file) {
    const fileView = renderFile(directory, file);
    views[directory + '/' + file] = fileView;
    root.appendChild(fileView);
  } else {
    console.log(views.tableOfContents.console)
    root.appendChild(views.tableOfContents.dom);
  }

};
