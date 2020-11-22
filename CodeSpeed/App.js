class App {
  constructor($target) {
    this.target = $target;
    this.initData = {
      min: 0,
      avg: 0,
      max: 0,
    };
    this.dataArr = this.initData;
    this.animationMethod;

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.render();
    this.getData();
  }

  initCode() {
    document.querySelector('#codeArea').value = '';
    this.dataArr = this.initData;
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

  getCode(e) {
    e.target.className = 'btn btn-primary disabled';
    e.target.disabled = true;

    let times = [];
    let code = document.querySelector('#codeArea').value;
    for(let i = 0; i < 50; i++) {
      let result = this.calcFunction(code);
      times.push(result);
    }
    times.sort((a, b) => a - b);
    this.dataArr.min = times[0]
    this.dataArr.max = times[times.length - 1];
    this.dataArr.avg = times.reduce((acc, cur) => acc + cur) / times.length;

    console.log('times: ', times);
    console.log('this.dataArr: ', this.dataArr);

    this.drawGraph()
    setTimeout(() => {
      window.cancelAnimationFrame(this.animationMethod);
      e.target.className = 'btn btn-primary';
      e.target.disabled = false;
    }, 1000)
  }



  drawGraph() {
    console.log('draw');
    let clientWidth = this.canvas.width;
    let clientHeight = this.canvas.height;
    this.ctx.clearRect(0, 0, clientWidth, clientHeight);
    let gWidth = clientWidth / 3;
    
    Object.keys(this.dataArr).forEach((data, idx) => {
      this.ctx.fillStyle = '#4287f5';
      this.ctx.fillRect((gWidth + 5) * idx, clientHeight, gWidth, -1 * this.dataArr[data] * 10);
    })
    this.animationMethod = window.requestAnimationFrame(this.drawGraph.bind(this))
  }
  
  calcFunction(code) {
    let start = performance.now();
    new Function(code)();
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

    // button group
    let btnGroup = document.createElement('div');
    btnGroup.className = 'btn-group btn-group-toggle';

    // input button
    let inputButton = document.createElement('button');
    inputButton.id = "startBtn";
    inputButton.className = "btn btn-primary";
    inputButton.innerText = '성능 측정'
    inputButton.addEventListener('click', this.getCode.bind(this));
    btnGroup.appendChild(inputButton);
    
    // init button
    let initButton = document.createElement('button');
    initButton.id = "initBtn";
    initButton.className = "btn btn-outline-secondary";
    initButton.innerText = '초기화'
    initButton.addEventListener('click', this.initCode.bind(this))
    btnGroup.appendChild(initButton);

    this.target.appendChild(btnGroup);

    // graph canvas   
    this.canvas.id = 'graphCanvas';
    this.target.appendChild(this.canvas);
  }
}





