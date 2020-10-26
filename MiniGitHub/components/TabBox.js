class TabBox {
  constructor($target, changeCurrent, currentPos){
    this.render($target, changeCurrent, currentPos)
  } 

  render($target, changeCurrent, currentPos) {
    $target.innerHTML = `
      <div id='searchBox' class='btn btn-outline-secondary'>Search</div>
      <div id='recordBox' class='btn btn-outline-secondary'>Record</div>
    `;
  
    document.getElementById('searchBox').addEventListener('click', () => {
      changeCurrent(document.querySelector('#bodyContainer'), 'search');
    })
    document.getElementById('recordBox').addEventListener('click', () => {
      changeCurrent(document.querySelector('#bodyContainer'), 'record');
    })
    document.getElementById(`${currentPos}Box`).className = 'btn btn-primary';
  }
}