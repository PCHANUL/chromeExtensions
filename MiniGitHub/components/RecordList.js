class RecordList{
  constructor($target, searchRecords, getData, deleteData) {

    this.render($target, searchRecords, getData, deleteData)
  }

  
  render($target, searchRecords, getData, deleteData) {
    
    let recordList = document.createElement('div');
    if (searchRecords.length !== 0) {
      searchRecords.map((record, idx) => {
        Record(idx, record, $target, getData, deleteData)
      });
    } else {
      let noRecord = `
        <div class='record'>
          <h2>no record</h2>
        </div>
      `
      recordList.insertAdjacentHTML('beforeend', noRecord);
    }
    $target.appendChild(recordList)
  }
}


function Record (key, record, $target, getData, deleteData) {
  let recordDOM = `
    <div class='record'>
      <span>${record.owner} / ${record.repo}</span>
      <div>
        <button id='search_${key}' class='recordBtn btn btn-outline-secondary'>
          <img class='recordIcon' src='../check.png' />
        </button>
        <button id='delete_${key}' class='recordBtn btn btn-outline-secondary'>
          <img class='recordIcon' src='../delete.png' />
        </button>
      </div>
    </div>
  `
  $target.insertAdjacentHTML('beforeend', recordDOM);

  document.querySelector(`#search_${key}`)
  .addEventListener('click', () => getData(record.owner, record.repo));

  document.querySelector(`#delete_${key}`)
  .addEventListener('click', () => deleteData(record.owner, record.repo));
}