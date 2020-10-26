function ContentContainer($target, currentRepository, render) {
  $target.innerHTML = "<div id='repositoryContainer'></div><div id='issueContainer'></div>";

  currentRepo(document.querySelector('#repositoryContainer'), currentRepository, render);
  IssueList(document.querySelector('#issueContainer'));
}

function currentRepo($target, currentRepository, render) {
  if (responseResults.length !== 0) {
    $target.insertAdjacentHTML('beforeend', `
      <div class="alert alert-primary" >
        <strong>${currentRepository.name}</strong> / ${currentRepository.repo}
        <button id='closeBtn' type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    `)

    document.querySelector('#closeBtn').addEventListener('click', () => {
      responseResults = [];
      render();
    })
  }
}

