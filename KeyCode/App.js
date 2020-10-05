
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
          '0'
          //  (General Keys)' 
        ) : event.location === 1 ? (
          '1'
          //  (Left-side modifier keys)'
        ) : (
          '2'
          //  (Right-side modifier keys)'
        ),
      }
      this.render({ $target });
    });

    document.addEventListener('mousedown', (event) => {
      console.log(event)
      // event.clientX
      // event.clientY
      
    })


    this.render({ $target });
  }

  render({ $target }) {
    console.log('render');
    $target.innerHTML = `
    <div class='app'>
      <div class='keyCodeDiv'>${this.input.keyCode}</div>
      <div class='codeBox'>
        <p class='eleName'>event.code</p>
        <p class='ele'>${this.input.code}</p>
      </div>
      <div class='codeBox'>
        <p class='eleName'>event.key</p>
        <p class='ele'>${this.input.key}</p>
      </div>
      <div class='codeBox'>
        <p class='eleName'>event.location</p>
        <p class='ele'>${this.input.location}</p>
      </div>
    </div>
    `;
    let click = document.createElement('div');
    click.className = 'click'
    $target.appendChild(click)
  }
}




