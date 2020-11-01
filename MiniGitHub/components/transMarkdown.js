const transMarkdown = new XMLHttpRequest();
transMarkdown.addEventListener("load", reqListenerMarkdown);
transMarkdown.addEventListener("error", transferFailed);

function reqListenerMarkdown() {
  console.log('this.response: ', this.response);
  let data = JSON.parse(this.response);
  console.log(data);

}