function IssueList($target) {
  let issueList = document.createElement('div');
  if (responseResults.issues) {
    responseResults.issues.map((issue) => {
      let issueEle = Issue(issue)
      issueList.insertAdjacentHTML('beforeend', issueEle);
    })
  }
  $target.appendChild(issueList)
}

function Issue(data) {
  postTransMarkdown(data.body)
  return `
    <details class='issue'>
      <summary>${TitleTag(data)}</summary>
      ${data.body}
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
  console.log('content: ', content);
  transMarkdown.open("POST", "https://api.github.com/markdown", false);
  transMarkdown.setRequestHeader("Authorization", "Basic " + btoa("PCHANUL:Qcksdnf95162!"));
  transMarkdown.setRequestHeader("Accept", "application/vnd.github.v3+json");
  transMarkdown.setRequestHeader("Content-Type", "text/html");
  transMarkdown.send(`
    {
      "text": "${content}",
      "mode": "gfm",
      "context": "github/gollum"
    }
  `);

  


}