class App {
  constructor($target) {
    this.target = $target;
    this.dataArr = [];

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.render();
    this.getData();
  }

  initCode() {
    document.querySelector('#codeArea').value = '';
    chrome.storage.sync.set({
      code: ''
    });
  }

  getData() {
    chrome.storage.sync.get((data) => {
      if (data.code) document.querySelector('#codeArea').value = data.code;
    })
  }
  
  updateData(e) {
    chrome.storage.sync.set({
      code: e.target.value
    });
  }

  getCode() {
    this.dataArr = [];
    let code = document.querySelector('#codeArea').value;
    for(let i = 0; i < 5; i++) {
      let result = this.calcFunction(code);
      this.dataArr.push(result);
    }
    this.drawGraph();
  }

  drawGraph() {
    let clientWidth = this.canvas.width;
    let clientHeight = this.canvas.height;
    let gWidth = clientWidth / 10;
    
    this.dataArr.forEach((data, idx) => {
      this.ctx.fillStyle = '#4287f5';
      this.ctx.fillRect((gWidth + 5) * idx, clientHeight, gWidth, -1 * data);
    })
  }
  
  calcFunction(code) {
    let start = performance.now();
    for(let i = 0; i < 30; i++) {
      new Function(code)();
    }
    let finished = performance.now();
    let elapsed = (finished - start);
    return elapsed;
  }


  render() {
    // textarea
    let codeArea = document.createElement('textarea');
    codeArea.id = 'codeArea';
    codeArea.className = 'form-control';
    codeArea.addEventListener('keyup', this.updateData.bind(this));
    this.target.appendChild(codeArea);

    // input button
    let inputButton = document.createElement('button');
    inputButton.className = "btn btn-primary";
    inputButton.innerText = '성능측정'
    inputButton.addEventListener('click', this.getCode.bind(this));
    this.target.appendChild(inputButton);
    
    // init button
    let initButton = document.createElement('button');
    initButton.className = "btn btn-outline-secondary";
    initButton.innerText = '초기화'
    initButton.addEventListener('click', this.initCode.bind(this))
    this.target.appendChild(initButton);

    // graph canvas   
    this.canvas.id = 'graphCanvas';
    this.target.appendChild(this.canvas);
  }
}





