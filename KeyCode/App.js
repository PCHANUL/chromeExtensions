
class App {
  constructor($target) {
    
    // 키를 입력하면 화면에 출력
    document.addEventListener('keydown', (event) => {
      console.log($target)
      this.input = {
        keyCode: event.keyCode,
        code: event.code,
        key: event.key,
        location: event.location,
      }
      this.render({ $target });
    });



  }

  render({ $target }) {
    console.log('render');
    $target.innerHTML = `
    <p id='keyCode'>${this.input.keyCode}</p>
    `;
  }
}




