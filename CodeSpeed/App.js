class App {
  constructor($target) {
    this.target = $target;

    this.render();
    this.getData();
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

  render() {
    // textarea
    let codeArea = document.createElement('textarea');
    codeArea.id = 'codeArea';
    codeArea.className = 'form-control';
    codeArea.addEventListener('keyup', this.updateData);
    this.target.appendChild(codeArea);

    // input button
    let inputButton = document.createElement('button');
    inputButton.className = "btn btn-primary";
    inputButton.innerText = '성능측정'
    inputButton.addEventListener('click', getCode)
    this.target.appendChild(inputButton);
    
    // init button
    let initButton = document.createElement('button');
    initButton.className = "btn btn-outline-secondary";
    initButton.innerText = '초기화'
    initButton.addEventListener('click', initCode)
    this.target.appendChild(initButton);

    // result div
    let resultDiv = document.createElement('div');
    resultDiv.id = 'result';
    resultDiv.style.border = '1px solid #000';
    this.target.appendChild(resultDiv);


    let canvas = document.createElement('canvas');
    canvas.id = 'graphCanvas';
    let ctx = canvas.getContext('2d');
    this.target.appendChild(canvas);

    drawGraph(ctx);

    
  }
}

function drawGraph(ctx) {
  

  let clientWidth = document.querySelector('#graphCanvas').clientWidth;
  let clientHeight = document.querySelector('#graphCanvas').clientHeight;
  alert(clientHeight);

  let gWidth = clientWidth / 10;
  ctx.fillStyle = '#000';
  ctx.fillRect(gWidth, clientHeight, 50, -50);
  

  
}

function initCode() {
  document.querySelector('#codeArea').value = '';
  chrome.storage.sync.set({
    code: ''
  });
}

function getCode() {
  let target = document.querySelector('#result');
  target.innerHTML = '';
  let code = document.querySelector('#codeArea').value;
  for(let i = 0; i < 30; i++) {
    target.insertAdjacentHTML('beforeend',`코드 속도: ${calcFunction(code)}<br />`);
  }
}

function calcFunction(code) {
  let start = performance.now();
  for(let i = 0; i < 30; i++) {
  new Function(code)();
  }
  let finished = performance.now();

  elapsed = (finished - start);

  return elapsed;
}

