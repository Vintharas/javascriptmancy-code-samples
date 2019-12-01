// later: warnings
// depends on global Prism & renderReport (an alert and log for now)
// renders single file from all file data, could be more efficient

async function renderFile(directory, file) {

  // // getting this set up for permalinks
  // const extension = window.location.pathname
  //   + '/?directory=' + encodeURIComponent(directory)
  //   + '&file=' + encodeURIComponent(file);
  // history.pushState({}, null, extension);

  if (views[directory + '/' + file]) {
    return views[directory + '/' + file];
  }


  const header = document.createElement('h2');
  header.innerHTML = directory + '/' + file;


  const gitHubButton = document.createElement('button');
  gitHubButton.innerHTML = 'read file on GitHub';

  const gitHubA = document.createElement('a');
  gitHubA.href = 'https://github.com/' + userName + '/' + repoName + '/tree/master/' + directory + '/' + file;
  gitHubA.target = '_blank';
  gitHubA.appendChild(gitHubButton);
  gitHubButton.style.height = '30px';


  const backButton = document.createElement('button');
  backButton.innerHTML = 'table of contents';
  backButton.onclick = () => {
    console.clear();
    console.log(views.tableOfContents.console);

    document.getElementById('root').innerHTML = '';
    document.getElementById('root').appendChild(views.tableOfContents.dom);
  };
  backButton.style.height = '30px';


  const code = await fetch('./' + directory + '/' + file)
    .then(resp => resp.text())
    .then(fileText => fileText);

  const codeEl = document.createElement('code');
  codeEl.innerHTML = code;
  codeEl.className = "language-js line-numbers";

  const pre = document.createElement('pre');
  pre.appendChild(codeEl);
  pre.style.fontSize = '80%';
  Prism.highlightAllUnder(pre);

  const container = document.createElement('div');
  container.appendChild(header);
  container.appendChild(gitHubA);
  container.appendChild(backButton);
  container.appendChild(pre);

  views[directory + '/' + file] = { dom: container, console: code };

  return Promise.resolve({ dom: container, console: code });
}

