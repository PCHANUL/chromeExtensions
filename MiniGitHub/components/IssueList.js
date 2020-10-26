function IssueList($target) {
  let issueList = document.createElement('div');
  if (responseResults.length !== 0) {
    responseResults.map((issue) => {
      let issueEle = Issue(issue)
      issueList.insertAdjacentHTML('beforeend', issueEle);
    })
  }
  $target.appendChild(issueList)
}

function Issue(data) {
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