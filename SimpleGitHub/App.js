let responseResult = [];

class App {
  constructor($target) {
    this.getData({ $target })

  }

  getData({ $target }) {
    let oReq = new XMLHttpRequest();
    oReq.addEventListener("progress", this.updateProgress);
    oReq.addEventListener("load", this.reqListener);
    oReq.addEventListener("error", this.transferFailed);
    oReq.open("GET", "https://api.github.com/repos/PCHANUL/nSarang/issues");
    oReq.send();

    console.log(responseResult)
    this.render({ $target });
  }

  reqListener () {
    let data = JSON.parse(this.response);
    for (let i of data) {
      responseResult.push({
        number: i.number,
        title: i.title,
        body: i.body,
        state: i.state,
        assignees: i.assignees,
        labels: i.labels,
      })
    }
    console.log(responseResult)
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

  render({ $target }) {
    console.log(responseResult[0]);
    // let element = document.createElement('div');

    for (let issue of responseResult) {
      console.log(issue)
      // let title = document.createElement('h1');
      // title.innerText = issue.title;
      // element.appendChild(title);
    }



    // $target.innerHTML = element;
  }
}


