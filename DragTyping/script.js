// initial setting
let input = '';
let keys = [8,9,13,16,17,18,91,20,39,38,37,40,93];

let letters = {
  arr: [],
  index: 0,
};


// content page를 대상으로 코드를 작성한다.
chrome.tabs.executeScript({
  code: "window.getSelection().getRangeAt(0).toString()"
}, function(result) {
  try {
    // code의 실행값을 result로 받는다.
    document.getElementById("selected").innerHTML = result;
    letters.arr = result[0].split('');
    printLetter('init')
  } catch (err) {
    console.log(err)
    printLetter('init')
  }
});


document.addEventListener('keydown', (e) => {
  console.log(e.keyCode)

  // enter
  if (e.keyCode === 13) { 
    input = '';
  }

  // backspace
  if (e.keyCode === 8) { 
    input = input.substring(0, input.length - 1)
  }

  // input
  if (!keys.includes(e.keyCode)) {
    input = input + e.key
  }
  
  // 한글을 초중종성 결합
  let printInputLetter = Hangul.assemble(input.split(''))

  // 입력된 값이 현재 출력된 값과 같다면 다음 글자로 넘어갑니다.
  if (printInputLetter === letters.arr[letters.index]) {
    setTimeout(() => {
      input = '';
      letters.index ++;
      printLetter();
      document.getElementById("input").innerHTML = input
    }, 0)
  } else if (printInputLetter !== letters.arr[letters.index]) {
    document.getElementById("input").innerHTML = printInputLetter;
  }
});

function printLetter(isInit) {
  if (!letters.arr[letters.index]) {
    document.getElementById("selected").innerHTML 
      = isInit ? '연습할 문장을 드래그하세요' : '모든 텍스트를 타이핑하였습니다.'; 
    document.getElementById("letter").innerHTML = '';
  } else if (letters.arr[letters.index] === ' ') {
    document.getElementById("letter").innerHTML = "<img src='/img/spacebar.png' width='50' height='50'>";
  } else {
    document.getElementById("letter").innerHTML = letters.arr[letters.index];
  }
}


