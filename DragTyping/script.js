// initial setting
let input = '';
let keys = [8,9,13,16,17,18,91,32,20,39,38,37,40,93];

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
  
  // print input letter
    
  let printInputLetter = Hangul.assemble(input.split(''))
  if (printInputLetter === letters.arr[letters.index]) {
    setTimeout(() => {
      input = '';
      letters.index ++;
      printLetter();
      document.getElementById("input").innerHTML = input
    }, 500)
  }

  document.getElementById("input").innerHTML = printInputLetter;

});

function printLetter(isInit) {
  if (!letters.arr[letters.index]) {
    document.getElementById("letter").innerHTML 
      = isInit ? '연습할 문장을 드래그하세요' : '모든 텍스트를 타이핑하였습니다.'; 
  } else {
    document.getElementById("letter").innerHTML = letters.arr[letters.index];
  }
}


