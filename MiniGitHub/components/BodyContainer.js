class BodyContainer{
  constructor($target, currentPos, searchRecords, getData, deleteData) {
    this.render($target, currentPos, searchRecords, getData, deleteData)
  }

  render($target, currentPos, searchRecords, getData, deleteData) {
    $target.innerHTML = "<div id='searchContainer'></div><div id='contentContainer'></div>"
  
    
    if (currentPos === 'search') {
      SearchInputs(
        document.querySelector('#searchContainer'), 
        getData,
      )
    };
  
    if (currentPos === 'record') {
      new RecordList(
        document.querySelector('#searchContainer'), 
        searchRecords, 
        getData, 
        deleteData,
      )
    }
    
    IssueList(document.querySelector('#contentContainer'));
  }
}

function SearchInputs($target, getData) {
  $target.innerHTML = `
    <div id='inputDiv'>
      <input id='ownerNameInput' class='input form-control' type=text placeholder='owner name' autocomplete='on'></input>
      <input id='repoNameInput' class='input form-control' type=text placeholder='repo name' autocomplete='on'></input>
    </div>
    <button id='btn' class='btn btn-outline-primary'>search</button>
  `

  document.getElementById('btn')
  .addEventListener('click', () => getData($target));
}


function IssueList($target) {
  let issueList = document.createElement('div');
  if (responseResults.length !== 0) {
    responseResults.map((issue) => {
      console.log(issue);
      let issueEle = document.createElement('div');
      issueEle.className = 'issue';
      issueEle.appendChild(TitleTag(issue));

      let body = document.createElement('details');
      let summary = document.createElement('summary');
      summary.innerText = 'content';
      body.innerText = issue.body;
      body.appendChild(summary)
      issueEle.appendChild(body);

      issueList.appendChild(issueEle);


    })
  }
  $target.appendChild(issueList)
}

function TitleTag(data) {
  let titleEle = document.createElement('div');
  let title = document.createElement('h3');
  title.className = 'issueTitle';
  title.innerText = `#${data.number} ${data.title}`;
  titleEle.appendChild(title);

  data.labels.map((label) => {
    let tag = document.createElement('div');
    tag.className = 'tag'
    tag.style.backgroundColor = `#${label.color}`;
    tag.innerText = label.name;
    titleEle.appendChild(tag);
  })
  return titleEle
}