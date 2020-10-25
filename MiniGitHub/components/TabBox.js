class TabBox {
  constructor($target, changeCurrent, currentPos){
    this.render($target, changeCurrent, currentPos)
  } 

  render($target, changeCurrent, currentPos) {
    $target.innerHTML = `
      <div id='searchBox' class='box'>Search</div>
      <div id='recordBox' class='box'>Record</div>
    `;
  
    document.getElementById('searchBox').addEventListener('click', () => {
      changeCurrent(document.querySelector('#bodyContainer'), 'search');
    })
    document.getElementById('recordBox').addEventListener('click', () => {
      changeCurrent(document.querySelector('#bodyContainer'), 'record');
    })
    document.getElementById(`${currentPos}Box`).style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
  }
}