function SearchInputs($target, getData) {
  $target.innerHTML = `
    <div id='inputDiv' class='input-group input-group-default'>
      <input id='ownerNameInput' class='form-control' type=text placeholder='owner name' style='height: 50px'></input>
      <div class="input-group-prepend">
        <span class="input-group-text" style='height: 50px'>/</span>
      </div>
      <input id='repoNameInput' class='form-control' type=text placeholder='repo name' style='height: 50px'></input>
    </div>
    <button id='btn' class='btn btn-outline-secondary'>
      <img class='enterIcon' src='../check.png' />
    </button>
  `

  document.getElementById('btn')
  .addEventListener('click', () => getData($target));
}