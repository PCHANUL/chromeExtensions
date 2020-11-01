let issueBody = [];


function IssueList($target) {
  issueBody = [];

  let issueList = document.createElement('div');
  if (responseResults.issues) {
    responseResults.issues.map((issue, i) => {
      let issueEle = Issue(issue, i)
      issueList.insertAdjacentHTML('beforeend', issueEle);
    })
  }
  $target.appendChild(issueList)

  insertMarkdown();
}

function Issue(data, i) {
  postTransMarkdown(data.body);

  return `
    <details id='issue_${i}' class='issue'>
      <summary>${TitleTag(data)}</summary>
    </details>
  `
}

function TitleTag(data) {
  let tags = data.labels.map((label) => {
    return `
      <div class='tag' style='background-color: #${label.color}'>
        ${label.name}
      </div>
    `
  });

  return `
    <div>
      <p class='issueTitle'>#${data.number} ${data.title}</p>
      ${tags.join('')}
    </div>
  `
}

function postTransMarkdown(content) {
  const body = `{"text": ${JSON.stringify(content)},"mode": "gfm","context": "github/gollum"}`
  transMarkdown.open("POST", "https://api.github.com/markdown", false);
  // transMarkdown.setRequestHeader("Authorization", "Basic " + btoa('username:password'));
  transMarkdown.setRequestHeader("Accept", "*/*");
  transMarkdown.setRequestHeader("Content-Type", "text/plain");
  transMarkdown.send(body);
}

function insertMarkdown() {
  console.log(issueBody);
  issueBody.map((item, i) => {
    document.querySelector(`#issue_${i}`).insertAdjacentHTML('beforeend', item);
  })
}