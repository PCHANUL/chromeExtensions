const getDataReq = new XMLHttpRequest();
getDataReq.addEventListener("load", reqListenerGetData);
getDataReq.addEventListener("error", transferFailed);

function reqListenerGetData() {
  let data = JSON.parse(this.response);

  if (data[0].url.includes('issues')) {
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
    responseResults.issues = issueResult;
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
    responseResults.pulls = pullResult;
  }
  
  
  
}

function transferFailed(e) {
  console.log("error" , e)
}