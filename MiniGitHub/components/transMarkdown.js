const transMarkdown = new XMLHttpRequest();
transMarkdown.addEventListener("load", reqListenerMarkdown);
transMarkdown.addEventListener("error", translateMarkdownFailed);

function reqListenerMarkdown() {
  console.log('JSON.parse(this.response).message: ', JSON.parse(this.response).message);
  if (JSON.parse(this.response).message) {
    issueBody.push(`
      <p style="font-weight: bold; text-align: center; margin-top: 15px;">
        Git API 요청 한도가 초과되었습니다.<br /> 
        Auth 탭에 유저 정보를 입력하십시오.
      </p>
    `);
  } else {
    issueBody.push(this.response);
  }
}

function translateMarkdownFailed(e) {
  console.log("error", e)
}