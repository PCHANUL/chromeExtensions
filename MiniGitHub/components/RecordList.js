class RecordList{
  constructor($target, searchRecords, getData, deleteData) {

    this.render($target, searchRecords, getData, deleteData)
  }

  
  render($target, searchRecords, getData, deleteData) {
    console.log('searchRecords: ', searchRecords);

    let recordList = document.createElement('div');

    if (searchRecords.length !== 0) {
      searchRecords.map((record, idx) => {
        Record(idx, record, $target, getData, deleteData)
      });
  
    } else {
      let noRecord = document.createElement('h2');
      noRecord.innerText = 'no record';
      recordList.appendChild(noRecord);
    }
    $target.appendChild(recordList)
  }
}


function Record (key, record, $target, getData, deleteData) {
  let recordDOM = `
    <div class='record form-control'>
      <a>${record.owner} / ${record.repo}</a>
      <button id='search_${key}' class='btn btn-outline-secondary'>0</button>
      <button id='delete_${key}' class='btn btn-outline-secondary'>X</button>
    </div>
  `
  $target.insertAdjacentHTML('beforeend', recordDOM);

  document.querySelector(`#search_${key}`)
  .addEventListener('click', () => getData($target, record.owner, record.repo));

  document.querySelector(`#delete_${key}`)
  .addEventListener('click', () => deleteData($target, record.owner, record.repo));
}