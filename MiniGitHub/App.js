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
      if(data.searchRecord !== undefined) this.searchRecords = await [...data.searchRecord];
      console.log(this.searchRecords)
      this.render({ $target });
    })

    // this.render({ $target });
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

    this.ownerName = document.getElementById('ownerNameInput').value
    this.repoName = document.getElementById('repoNameInput').value
    
    this.oReq.open("GET", `https://api.github.com/repos/${owner ? owner : this.ownerName}/${repo ? repo : this.repoName}/issues`, false);
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

  changeCurrent($target, pos) {
    this.currentPos = pos;
    this.render({ $target });
  }

  render({ $target }) {
    console.log('render')


    defaultBox($target, this.changeCurrent.bind(this), this.render.bind(this));
    if (this.currentPos === 'search') searchInputs($target, this.getData.bind(this));
    if (this.currentPos === 'record') makeRecordList($target, this.searchRecords, this.getData.bind(this));
    
    
    let issueList = document.createElement('div');
    if (responseResults.length !== 0) {
      responseResults.map((issue) => {
        console.log(issue);
        let ele = document.createElement('h1');
        ele.innerText = issue.title;
        issueList.appendChild(ele)
      })
    }
    $target.appendChild(issueList)

  }
}

function defaultBox($target, currentPos, render) {
  $target.innerHTML = `
    <div id='boxContainer'>
      <div id='searchBox' class='box'>Search</div>
      <div id='recordBox' class='box'>Record</div>
    </div>
  `;

  document.getElementById('searchBox').addEventListener('click', () => {
    currentPos($target, 'search');
  })
  document.getElementById('recordBox').addEventListener('click', () => {
    currentPos($target, 'record');
  })

}

function searchInputs($target, getData) {
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


function makeRecordList($target, searchRecords, getData) {
  let recordList = document.createElement('div');
  if (searchRecords.length !== 0) {
    searchRecords.map((record, i) => {
      let recordElement  = `
        <div class='record' id='${i}'>
          <p>
           owner: ${record.owner} <br /> 
           repo: ${record.repo}
          </p>
          <button id='search/${i}' class='recordBtn'>search</button>
          <button id='delete/${i}' class='recordBtn'>delete</button>
        </div>
      `
      recordList.insertAdjacentHTML("afterbegin", recordElement)

      document.getElementById(`search/${i}`)
      .addEventListener('click', () => getData($target, record.owner, record.repo));
    })
  } else {
    let noRecord = document.createElement('h2');
    noRecord.innerText = 'no record';
    recordList.appendChild(noRecord);
  }
  $target.appendChild(recordList)
}





