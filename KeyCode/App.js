
class App {
  constructor($target) {
    
    // 키를 입력하면 화면에 출력
    document.addEventListener('keydown', (event) => {
      console.log(event)
      this.input = {
        keyCode: event.keyCode,
        code: event.code,
        key: event.key,
        location: event.location === 0 ? (
          '0 (General Keys)' 
        ) : event.location === 1 ? (
          '1 (Left-side modifier keys)'
        ) : (
          '2 (Right-side modifier keys)'
        ),
      }
      this.render({ $target });
    });



  }

  render({ $target }) {
    console.log('render');
    $target.innerHTML = `
    <p id='keyCode'>${this.input.keyCode}</p>
    <p id='code'>${this.input.code}</p>
    <p id='key'>${this.input.key}</p>
    <p id='location'>${this.input.location}</p>
    `;
  }
}




