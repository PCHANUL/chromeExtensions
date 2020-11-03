class TabBox {
  constructor($target, changeCurrent, currentPos){
    this.render($target, changeCurrent, currentPos)
  } 

  render($target, changeCurrent, currentPos) {
    if (!responseResults.isRequested) {
      $target.innerHTML = `
        <div id='searchBox' class='btn btn-outline-secondary'>Search</div>
        <div id='recordBox' class='btn btn-outline-secondary'>History</div>
        <div id='authBox' class='btn btn-warning'>Auth</div>
      `;

      document.getElementById('searchBox').addEventListener('click', () => {
        changeCurrent('search');
      })
      document.getElementById('recordBox').addEventListener('click', () => {
        changeCurrent('record');
      })
      document.getElementById('authBox').addEventListener('click', () => {
        changeCurrent('auth');
      })
      document.getElementById(`${currentPos}Box`).className = 'btn btn-primary';

      if (username && password) {
        document.getElementById('authBox').className = 'btn btn-success';
      }
      
      
    } else {
      $target.innerHTML = `
      <div id='searchBox' class='btn btn-outline-secondary disabled'>Search</div>
      <div id='recordBox' class='btn btn-outline-secondary disabled'>Record</div>
      <div id='authBox' class='btn btn-${username && password ? 'success' : 'warning'} disabled'>Auth</div>
      `;

      document.getElementById(`${currentPos}Box`).className = 'btn btn-primary disabled';
    }
  
  }
}