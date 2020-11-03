class BodyContainer{
  constructor($target, currentPos, searchRecords, getData, deleteData, currentRepository) {

    this.$target = $target
    this.currentPos = currentPos;
    this.searchRecords = searchRecords;
    this.getData = getData;
    this.deleteData = deleteData;
    this.currentRepository = currentRepository;

    this.render();
  }

  render() {
    this.$target.innerHTML = "<div id='searchContainer'></div><div id='contentContainer'></div>"
  
    if (responseResults.isRequested) {
      new ContentContainer(
        document.querySelector('#contentContainer'), 
        this.currentRepository,
      );
    } else {
      if (this.currentPos === 'search') {
        SearchInputs(
          document.querySelector('#searchContainer'), 
          this.getData,
        )
      };
    
      if (this.currentPos === 'record') {
        new RecordList(
          document.querySelector('#searchContainer'), 
          this.searchRecords, 
          this.getData, 
          this.deleteData,
        )
      }
      
      if (this.currentPos === 'auth') {
        new AuthInput(
          document.querySelector('#searchContainer'),
        )
      
      }
    }

  }
}


class AuthInput{
  constructor($target) {
    this.$target = $target;

    this.render();
  }

  setUserAuth(render) {
    username = document.querySelector('#usernameAuth').value;
    password = document.querySelector('#passwordAuth').value;
    if (username && password) render();
  }

  render() {
    let input = `
      <input id='usernameAuth' class='form-control' type=text placeholder='username' value=${username ? username : ''}></input>
      <input id='passwordAuth' class='form-control' type=password placeholder='password' value=${password ? password : ''}></input>
    `;
    let alert;
    if (username && password) {
      alert = `
        <button id='authBtn' class='btn btn-success'>
          <img class='enterIcon' src='../img/safe.png' />
        </button>
      `
    } else {
      alert = `
        <button id='authBtn' class='btn btn-warning'>
          <img class='enterIcon' src='../img/insecure.png' />
          <p style='color: #fff'>입력하신 정보는 저장되지 않습니다</p>
        </button>
      `;
    }
    this.$target.innerHTML = input + alert;
  
    document.getElementById('usernameAuth')
    .addEventListener('change', () => this.setUserAuth(this.render.bind(this)));
  
    document.getElementById('passwordAuth')
    .addEventListener('change', () => this.setUserAuth(this.render.bind(this)));
  }
}


