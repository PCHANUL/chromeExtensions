function SearchInputs($target, getData) {
  $target.innerHTML = `
    <div id='inputDiv' class='input-group mb-3'>
      <input id='ownerNameInput' class='form-control' type=text placeholder='owner name' autocomplete='on'></input>
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1">/</span>
      </div>
      <input id='repoNameInput' class='form-control' type=text placeholder='repo name' autocomplete='on'></input>
    </div>
    <button id='btn' class='btn btn-outline-secondary'>
      <img class='enterIcon' src='../check.png' />
    </button>
  `

  document.getElementById('btn')
  .addEventListener('click', () => getData($target));
}