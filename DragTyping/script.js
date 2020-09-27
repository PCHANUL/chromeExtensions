// 컨텐트 페이지를 텍스트를 가져온다.

// content page를 대상으로 코드를 작성한다.
chrome.tabs.executeScript({
  // code: "document.querySelector('body').innerText"
  code: "window.getSelection().getRangeAt(0).toString()"
}, function(result) {
  // code의 실행값을 result로 받는다.
  document.getElementById("console").innerHTML = result;
});



// 팝업 페이지
function selectText() {
  console.log(document.getSelection)
  let selected = "ffff";

  if (document.getSelection) {
    selected = document.getSelection();
  } else if (document.selection) {
    selected = document.selection.createRange().text;
  }
  return selected;
}

window.onmouseup = function() {
  document.getElementById("console").innerHTML = selectText();
}