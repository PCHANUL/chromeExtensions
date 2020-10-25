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
    $target.innerHTML = "<div id='tabContainer'></div><div id='bodyContainer'><div>"

    new TabBox(
      document.querySelector('#tabContainer'), 
      this.changeCurrent.bind(this), 
      this.currentPos
    );

    bodyContainer(
      document.querySelector('#bodyContainer'),
      this.searchRecords,
      this.getData.bind(this),
      this.deleteData.bind(this),
    );
  }
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
