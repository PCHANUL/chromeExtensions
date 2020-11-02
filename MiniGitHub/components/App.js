// global
let responseResults = {};
let username;
let password;


class App {
  constructor($target) {

    this.$target = $target;

    this.ownerName = '';
    this.repoName = '';

    this.searchRecords = [];

    this.currentPos = 'search';

    chrome.storage.sync.get(['searchRecord'], async(data) => {
      if(data.searchRecord.length !== 0) {
        this.searchRecords = await [...data.searchRecord];
        this.currentPos = 'record';
      }
      this.render();
    })
  }

  getData(owner, repo) {
    console.log('owner, repo: ', owner, repo);

    this.ownerName = owner ? owner : document.querySelector('#ownerNameInput').value
    this.repoName = repo ? repo : document.querySelector('#repoNameInput').value
    
    getDataReq.open("GET", `https://api.github.com/repos/${this.ownerName}/${this.repoName}/issues`, false);
    getDataReq.send();
    getDataReq.open("GET", `https://api.github.com/repos/${this.ownerName}/${this.repoName}/pulls`, false);
    getDataReq.send();

    if (!owner) {
      let isIncluded = false;
      let search = {
        owner: this.ownerName,
        repo: this.repoName,
      }
      let owner = this.ownerName.toLowerCase()
      let repo = this.ownerName.toLowerCase()
      for (let record of this.searchRecords) {
        if (record.owner.toLowerCase() === owner && record.repo.toLowerCase() === repo) { 
          isIncluded = true;
        }
      }

      if (!isIncluded) {
        this.searchRecords.push(search);
        chrome.storage.sync.set({
          searchRecord: this.searchRecords
        })
      }
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


