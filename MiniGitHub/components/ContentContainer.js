function ContentContainer($target, currentRepository) {
  $target.innerHTML = "<div id='repositoryContainer'></div><div id='issueContainer'></div>";

  currentRepo(document.querySelector('#repositoryContainer'), currentRepository);
  IssueList(document.querySelector('#issueContainer'));
}

function currentRepo($target, currentRepository) {
  if (responseResults.issues) {
    $target.insertAdjacentHTML('beforeend', `
      <div class="alert alert-primary" >
        <strong>${currentRepository.name}</strong> / ${currentRepository.repo}
        <button id='closeBtn' type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <br />
        <select id="category">
          <option value="issues">Issues</option>
          <option value="pulls">Pulls</option>
        </select>
      </div>
      <button id='addBtn' class='btn btn-outline-secondary'>
        <img class='enterIcon' src='../img/add.png' />
      </button>
    `)

    document.querySelector('#closeBtn').addEventListener('click', () => {
      responseResults.isRequested = false;
      currentRepository.render();
    })
    document.querySelector('#category').addEventListener('change', () => {
      console.log(responseResults)
      currentRepository.render();
    })
  }
}

