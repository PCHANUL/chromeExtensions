const transMarkdown = new XMLHttpRequest();
transMarkdown.addEventListener("load", reqListenerMarkdown);
// transMarkdown.addEventListener("error", transferFailed);

function reqListenerMarkdown() {
  issueBody.push(this.response)
}