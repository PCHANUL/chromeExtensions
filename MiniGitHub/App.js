let responseResults = [];


class App {
  constructor($target) {

    this.ownerName = '';
    this.repoName = '';

    this.searchRecords = [];

    this.currentPos = 'search';

    this.oReq = new XMLHttpRequest();
    this.oReq.addEventListener("progress", this.updateProgress);
    this.oReq.addEventListener("load", this.reqListener);
    this.oReq.addEventListener("error", this.transferFailed);

    chrome.storage.sync.get(['searchRecord'], async(data) => {
      console.log('data.searchRecord: ', data.searchRecord);
      if(data.searchRecord.length !== 0) {
        this.searchRecords = await [...data.searchRecord];
        this.currentPos = 'record';
      }
      this.render({ $target });
    })
  }

  reqListener () {
    let data = JSON.parse(this.response);
    let result = [];
    for (let i of data) {
      result.push({
        number: i.number,
        title: i.title,
        body: i.body,
        state: i.state,
        assignees: i.assignees,
        labels: i.labels,
      })
    }
    responseResults = result;
  }

  transferFailed (e) {
    console.log("error" , e)
  }

  updateProgress (oEvent) {
    if (oEvent.lengthComputable) {
      var percentComplete = oEvent.loaded / oEvent.total * 100;
      console.log(percentComplete)
    }
  }

  getData($target, owner, repo) {
    console.log('owner, repo: ', owner, repo);

    this.ownerName = owner ? owner : document.getElementById('ownerNameInput').value
    this.repoName = repo ? repo : document.getElementById('repoNameInput').value
    
    this.oReq.open("GET", `https://api.github.com/repos/${this.ownerName}/${this.repoName}/issues`, false);
    this.oReq.send();

    if (!owner && responseResults.length !== 0) {
      this.searchRecords.push({
        owner: this.ownerName,
        repo: this.repoName,
      })
      chrome.storage.sync.set({
        searchRecord: this.searchRecords
      })
    }
    this.render({ $target });
  }

  deleteData($target, owner, repo) {
    this.searchRecords = this.searchRecords.filter((record) => owner !== record.owner && repo !== record.repo)
    chrome.storage.sync.set({
      searchRecord: this.searchRecords
    });

    this.render({ $target });
  }

  changeCurrent($target, pos) {
    this.currentPos = pos;
    this.render({ $target });
  }

  render({ $target }) {
    console.log('render')

    DefaultBox($target, this.changeCurrent.bind(this), this.currentPos);
    if (this.currentPos === 'search') SearchInputs($target, this.getData.bind(this));
    if (this.currentPos === 'record') RecordList($target, this.searchRecords, this.getData.bind(this), this.deleteData.bind(this));
    
    IssueList($target);

  }
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


function DefaultBox($target, changeCurrent, currentPos) {
  $target.innerHTML = `
    <div id='boxContainer'>
      <div id='searchBox' class='box'>Search</div>
      <div id='recordBox' class='box'>Record</div>
    </div>
  `;

  document.getElementById('searchBox').addEventListener('click', () => {
    changeCurrent($target, 'search');
  })
  document.getElementById('recordBox').addEventListener('click', () => {
    changeCurrent($target, 'record');
  })
  document.getElementById(`${currentPos}Box`).style.backgroundColor = 'rgba(0, 0, 0, 0.05)';

}

function SearchInputs($target, getData) {
  let searchEle = `
    <div id='app'>
      <div id='inputDiv'>
        <input id='ownerNameInput' class='input' type=text placeholder='owner name' autocomplete='on'></input>
        <input id='repoNameInput' class='input' type=text placeholder='repo name' autocomplete='on'></input>
      </div>
      <button id='btn'>search</button>
    </div>
  `

  $target.insertAdjacentHTML("beforeend", searchEle);

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





