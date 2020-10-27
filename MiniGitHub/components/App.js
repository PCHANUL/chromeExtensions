let responseResults = {};


class App {
  constructor($target) {

    this.$target = $target;

    this.ownerName = '';
    this.repoName = '';

    this.searchRecords = [];

    this.currentPos = 'search';

    this.oReq = new XMLHttpRequest();
    this.oReq.addEventListener("load", this.reqListener);
    this.oReq.addEventListener("error", this.transferFailed);

    chrome.storage.sync.get(['searchRecord'], async(data) => {
      if(data.searchRecord.length !== 0) {
        this.searchRecords = await [...data.searchRecord];
        this.currentPos = 'record';
      }
      this.render();
    })
  }

  reqListener () {
    let data = JSON.parse(this.response);
    console.log(data)

    if (data[0].url.includes('issue')) {
      let issueResult = [];
      for (let i of data) {
        issueResult.push({
          number: i.number,
          title: i.title,
          body: i.body,
          state: i.state,
          assignees: i.assignees,
          labels: i.labels,
        })
      }
      responseResults = { issues: issueResult };
    }

    if (data[0].url.includes('pulls')) {
      let pullResult = [];
      for (let i of data) {
        pullResult.push({
          number: i.number,
          title: i.title,
          body: i.body,
          state: i.state,
          assignees: i.assignees,
          labels: i.labels,
        })
      }
      responseResults = { pulls: pullResult };
    }

  }

  transferFailed (e) {
    console.log("error" , e)
  }


  getData(owner, repo) {
    console.log('owner, repo: ', owner, repo);

    this.ownerName = owner ? owner : document.querySelector('#ownerNameInput').value
    this.repoName = repo ? repo : document.querySelector('#repoNameInput').value
    
    this.oReq.open("GET", `https://api.github.com/repos/${this.ownerName}/${this.repoName}/issues`, false);
    this.oReq.send();
    this.oReq.open("GET", `https://api.github.com/repos/${this.ownerName}/${this.repoName}/pulls`, false);
    this.oReq.send();

    if (!owner && !responseResults.issues) {
      this.searchRecords.push({
        owner: this.ownerName,
        repo: this.repoName,
      })
      chrome.storage.sync.set({
        searchRecord: this.searchRecords
      })
    }
    this.render();
  }

  deleteData(owner, repo) {
    this.searchRecords = this.searchRecords.filter((record) => owner !== record.owner && repo !== record.repo)
    chrome.storage.sync.set({
      searchRecord: this.searchRecords
    });

    this.render();
  }

  changeCurrent(pos) {
    this.currentPos = pos;
    this.render();
  }

  render() {
    this.$target.innerHTML = "<div id='tabContainer' class='btn-group'></div><div id='bodyContainer'><div>"

    new TabBox(
      document.querySelector('#tabContainer'), 
      this.changeCurrent.bind(this), 
      this.currentPos
    );

    new BodyContainer(
      document.querySelector('#bodyContainer'),
      this.currentPos,
      this.searchRecords,
      this.getData.bind(this),
      this.deleteData.bind(this),
      { name: this.ownerName, repo: this.repoName, render: this.render.bind(this) }
    );
  }
}


