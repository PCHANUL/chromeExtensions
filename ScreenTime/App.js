class App {
  constructor($target) {
    this.target = $target;
    chrome.storage.sync.get((data) => {
      console.log('data: ', data);
      this.text = data.code;
      this.render();
    })
  }

  render() {

    
    let h1 = document.createElement('h1');
    h1.innerText = this.text;
    this.target.appendChild(h1);
  }

}