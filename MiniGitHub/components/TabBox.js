class TabBox {
  constructor($target, changeCurrent, currentPos){
    this.render($target, changeCurrent, currentPos)
  } 

  render($target, changeCurrent, currentPos) {
    if (!responseResults.issues) {
      $target.innerHTML = `
        <div id='searchBox' class='btn btn-outline-secondary'>Search</div>
        <div id='recordBox' class='btn btn-outline-secondary'>Record</div>
      `;

      document.getElementById('searchBox').addEventListener('click', () => {
        changeCurrent('search');
      })
      document.getElementById('recordBox').addEventListener('click', () => {
        changeCurrent('record');
      })
      document.getElementById(`${currentPos}Box`).className = 'btn btn-primary';
      
    } else {
      $target.innerHTML = `
      <div id='searchBox' class='btn btn-outline-secondary disabled'>Search</div>
      <div id='recordBox' class='btn btn-outline-secondary disabled'>Record</div>
      `;

      document.getElementById(`${currentPos}Box`).className = 'btn btn-primary disabled';
    }
  
  }
}