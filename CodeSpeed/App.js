class App {
  constructor($target) {
    this.target = $target;
    this.times = [];
    this.initData = {
      best: 0,
      average: 0,
      worst: 0,
    };
    this.adjHeight;
    this.dataArr = this.initData;
    this.animationMethod;

    this.barChart = document.createElement('canvas');
    this.barChart.width = '300';
    this.barChart.height = '150';
    this.ctxBar = this.barChart.getContext('2d');
    this.animationFrame = 0;

    this.lineChart = document.createElement('canvas');
    this.lineChart.width = '300';
    this.lineChart.height = '150';
    this.ctxLine = this.lineChart.getContext('2d');

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

    this.times = [];
    let code = document.querySelector('#codeArea').value;
    for(let i = 0; i < 10; i++) {
      let result = this.calcFunction(code);
      this.times.push(result);
    }
    this.times.sort((a, b) => a - b);
    console.log('this.times: ', this.times);

    // 데이터 분류
    this.dataArr.best = this.times[0]
    this.dataArr.worst = this.times[this.times.length - 1];
    this.dataArr.average = this.times.reduce((acc, cur) => acc + cur) / this.times.length;

    // height 150
    if (this.dataArr.worst < 0.1) this.adjHeight = -1500;
    else if (this.dataArr.worst < 0.5) this.adjHeight = -300;
    else if (this.dataArr.worst < 3) this.adjHeight = -50;
    else if (this.dataArr.worst < 5) this.adjHeight = -30;
    else if (this.dataArr.worst < 10) this.adjHeight = -15;
    else if (this.dataArr.worst < 50) this.adjHeight = -3;

    this.drawBarGraph();
    this.drawLineGraph();
    setTimeout(() => {
      window.cancelAnimationFrame(this.animationMethod);
      e.target.className = 'btn btn-primary';
      e.target.disabled = false;
      this.animationFrame = 0;
    }, 1000)

  }

  drawLineGraph() {
    let clientWidth = this.lineChart.width;
    let clientHeight = this.lineChart.height;
    this.ctxLine.clearRect(0, 0, clientWidth, clientHeight);
    this.ctxLine.fillStyle = '#4287f5';
    // times 데이터를 점으로 찍는다.
    this.times.forEach((time, idx) => {
      console.log('time: ', time);
      this.ctxLine.beginPath();
      this.ctxLine.arc(idx * 30 + 15, (time.toFixed(3) * this.adjHeight) + 140, 5, 0, Math.PI * 2, false)
      this.ctxLine.fill();
    })
    
    
  }




  drawBarGraph() {
    let clientWidth = this.barChart.width;
    let clientHeight = this.barChart.height;
    this.ctxBar.clearRect(0, 0, clientWidth, clientHeight);
    let gWidth = clientWidth / 3;

    this.animationFrame += this.animationFrame > this.adjHeight && this.adjHeight / 50;

    Object.keys(this.dataArr).forEach((data, idx) => {
      this.ctxBar.fillStyle = '#4287f5';
      this.ctxBar.fillRect((gWidth + 2) * idx, clientHeight, gWidth, this.dataArr[data] * this.animationFrame);
      
      this.ctxBar.fillStyle = '#000';
      this.ctxBar.font = '15px sanserif';
      this.ctxBar.fillText(String(this.dataArr[data].toFixed(3)) + 'ms', (gWidth + 2) * idx + gWidth / 2 - 30, 80)

      this.ctxBar.fillText(data, (gWidth + 2) * idx + gWidth / 2 - 30, 60)
    })
    this.animationMethod = window.requestAnimationFrame(this.drawBarGraph.bind(this))
  }
  
  calcFunction(code) {
    let start = performance.now();
    new Function(code)();
    let finished = performance.now();

    let elapsed = (finished - start);
    return elapsed;
  }

  autoSizeTextarea(element) {
    element.style.height = '5px';
    element.style.height = `${element.scrollHeight + 10}px`;
  }


  render() {
    // textarea
    let codeArea = document.createElement('textarea');
    codeArea.id = 'codeArea';
    codeArea.className = 'form-control';
    codeArea.addEventListener('keyup', () => {
      this.updateData(this);
      this.autoSizeTextarea(codeArea);
    });
    this.target.appendChild(codeArea);

    // button group
    let btnGroup = document.createElement('div');
    btnGroup.className = 'btn-group btn-group-toggle';

    // input button
    let inputButton = document.createElement('button');
    inputButton.id = "startBtn";
    inputButton.className = "btn btn-primary";
    inputButton.innerText = '코드 측정'
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
    this.barChart.id = 'barChart';
    this.target.appendChild(this.barChart);

    this.lineChart.id = 'lineChart';
    this.target.appendChild(this.lineChart);

  }
}





