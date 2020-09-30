
class App {
  constructor($target) {
    this.input = {
      keyCode: '',
      code: '',
      key: '',
      location: '',
    }
    
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


    this.render({ $target });
  }

  render({ $target }) {
    console.log('render');
    $target.innerHTML = `
    <div class='codeBox'>
      <div class='keyCodeDiv'>
        <p id='keyCode'>${this.input.keyCode}</p>
      </div>
      <div>
        <p id='code'>${this.input.code}</p>
      </div>
      <div>
        <p id='key'>${this.input.key}</p>
      </div>
      <div>
        <p id='location'>${this.input.location}</p>
      </div>
    </div>
    `;
  }
}




