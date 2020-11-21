class App {
  constructor($target) {
    this.target = $target;

    this.render();
  }

  render() {
    let div = document.createElement('div');
    div.innerText = 'hello'
    this.target.appendChild(div)
  }
}