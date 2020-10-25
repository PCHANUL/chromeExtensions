function bodyContainer($body, searchRecords, getData, deleteData) {

  $body.insertAdjacentHTML("afterbegin", "<div id='searchContainer'></div>");
  $body.insertAdjacentHTML("afterbegin", "<div id='contentContainer'></div>");

  SearchInputs(
    document.querySelector('#searchContainer'), 
    getData,
  )
  



  
  // if (this.currentPos === 'search') {
  //   SearchInputs($body, getData)
  // };

  // if (this.currentPos === 'record') {
  //   RecordList($body, searchRecords, getData, deleteData);
  //   IssueList($body);
  // }
}

function SearchInputs($target, getData) {
  $target.innerHTML = `
    <div id='app'>
      <div id='inputDiv'>
        <input id='ownerNameInput' class='input' type=text placeholder='owner name' autocomplete='on'></input>
        <input id='repoNameInput' class='input' type=text placeholder='repo name' autocomplete='on'></input>
      </div>
      <button id='btn'>search</button>
    </div>
  `

  // $target.insertAdjacentHTML("afterbegin", searchEle);

  document.getElementById('btn')
  .addEventListener('click', () => getData($target));
}


function RecordList($target, searchRecords, getData, deleteData) {
  let recordList = document.createElement('div');
  if (searchRecords.length !== 0) {
    searchRecords.map((record) => {
      let recordElement = document.createElement('div');
      recordElement.className = 'record';

      let content = document.createElement('h4');
      content.innerText = `${record.owner} / ${record.repo}`;
      let searchBtn = document.createElement('button');
      searchBtn.innerText = 'search';
      searchBtn.addEventListener('click', () => getData($target, record.owner, record.repo));
      let deleteBtn = document.createElement('button');
      deleteBtn.innerText = 'delete';
      deleteBtn.addEventListener('click', () => deleteData($target, record.owner, record.repo));

      recordElement.appendChild(content)
      recordElement.appendChild(searchBtn)
      recordElement.appendChild(deleteBtn)
      recordList.appendChild(recordElement)
    });

  } else {
    let noRecord = document.createElement('h2');
    noRecord.innerText = 'no record';
    recordList.appendChild(noRecord);
  }
  $target.appendChild(recordList)
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