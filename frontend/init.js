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
  tableOfContents: null,
}

window.onload = () => {
  const root = document.getElementById('root');
  views.tableOfContents = renderTableOfContents(tableOfContents);
  root.appendChild(views.tableOfContents);
};
