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
  tableOfContents: renderTableOfContents(tableOfContents),
}

window.onload = () => {

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
    root.appendChild(views.tableOfContents);
  }

};
