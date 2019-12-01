// later: warnings

function renderTableOfContents(tableOfContents) {

  // history.pushState({}, null, repoName);

  console.clear();
  console.log(`Let JavaScript Be Your Next Adventure!
  (https://www.javascriptmancy.com/)

Are you a C# or Java developer curious about the awesome things happening in the JavaScript world? Would you like to be a part of it? Build super rich web applications, mobile apps, backend services or even robots? Does JavaScript frustrate you? Would you like to master it and never again feel like you cannot make the language do what you want?

Are you a fan of the Fantasy genre? A sucker for wizards, elf-bowmen, powerful sorceresses and evil trolls? Love the works of Brandon Sanderson, G.R.R. Martin or Tolkien? Did you enjoy the Lord of the Rings or Game of Thrones?

Then this is the place for you! The JavaScript-mancy series are a collection of beautifully written JavaScript books that are a blast to read. Learn the basics of JavaScript, OOP, Functional Programming, async, ES6, TypeScript, tooling, testing, Angular 2 and more! `);

  const tocDiv = Object.keys(tableOfContents)
    .map(directory => {
      const dirNameTextEl = document.createElement('text');
      dirNameTextEl.innerHTML = directory;

      const filesList = tableOfContents[directory]
        .map(file => {

          const liveButton = document.createElement('button');
          liveButton.innerHTML = file + ' (live)';
          liveButton.onclick = () => {

            document.getElementById('root').innerHTML = '';

            if (views[directory + '/' + file]) {
              document.getElementById('root').appendChild(
                views[dirNameTextEl + '/' + file]
              );
            } else {
              renderFile(directory, file)
                .then(fileView => {
                  views[dirNameTextEl + '/' + file] = fileView;
                  document.getElementById('root').appendChild(fileView);
                });
            }

          }
          liveButton.style.height = '30px';

          const gitHubButton = document.createElement('button');
          gitHubButton.innerHTML = 'read file on GitHub';

          const gitHubA = document.createElement('a');
          gitHubA.href = 'https://github.com/' + userName + '/' + repoName + '/tree/master/' + directory + '/' + file;
          gitHubA.target = '_blank';
          gitHubA.appendChild(gitHubButton);
          gitHubButton.style.height = '30px';

          const li = document.createElement('li');
          li.appendChild(liveButton);
          li.appendChild(gitHubA);

          return li;
        }).reduce((filesUl, li) => {
          filesUl.appendChild(li);
          return filesUl;
        }, document.createElement('ul'));


      const dirNameH2 = document.createElement('h2');
      dirNameH2.appendChild(document.createTextNode(directory));

      const container = document.createElement('div');
      container.appendChild(dirNameH2);
      container.appendChild(filesList);

      return container;

    })
    .reduce((container, dirDiv) => {
      container.appendChild(dirDiv);
      return container;
    }, document.createElement('div'));


  return tocDiv;
}

//   const filesListUl = Object.keys(directory.files)
//     .map(fileName => {


//       const newButton = document.createElement('button');
//       newButton.innerHTML = fileName;

//       const newLi = document.createElement('li');

//       const reportPath = './exercises/' + directory.dirName + '/report.json';
//       newLi.onclick = () => {
//         if (cache.hasOwnProperty(reportPath)) {
//           render(renderFile(directory, fileName));
//         } else {
//           fetch(reportPath)
//             .then(resp => resp.json())
//             .then(directory => {
//               cache[reportPath] !== undefined ? cache[reportPath] = directory : null;
//               render(renderFile(directory, fileName));
//             })
//             .catch(err => console.log(err));
//         };
//       };
//       newLi.appendChild(newButton);
//       return newLi
//     })
//     .reduce((ul, li) => {
//       ul.appendChild(li);
//       return ul;
//     }, document.createElement('ul'));

//   const directoryDiv = document.createElement('div');
//   directoryDiv.appendChild(dirNameH2);
//   directoryDiv.appendChild(statusTextEl);
//   directoryDiv.appendChild(document.createElement('br'));
//   directoryDiv.appendChild(document.createElement('br'));
//   directoryDiv.appendChild(filesListUl);

//   return directoryDiv;
// }
