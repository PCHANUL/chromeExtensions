class RecordList{
  constructor($target, searchRecords, getData, deleteData) {

    this.render($target, searchRecords, getData, deleteData)
  }

  
  render($target, searchRecords, getData, deleteData) {
    console.log('searchRecords: ', searchRecords);

    let recordList = document.createElement('div');

    if (searchRecords.length !== 0) {
      searchRecords.map((record, idx) => {
        new Record(idx, record, $target, getData)
      });
  
    } else {
      let noRecord = document.createElement('h2');
      noRecord.innerText = 'no record';
      recordList.appendChild(noRecord);
    }
    $target.appendChild(recordList)
  }
}


class Record {
  constructor(key, record, $target, getData) {
    this.render(key, record, $target, getData)
  }

  render(key, record, $target, getData) {
    let recordDOM = `
      <div class='record'>
        <h4>${record.owner} / ${record.repo}</h4>
        <button id='search_${key}'>search</button>
        <button id='delete_${key}'>delete</button>
      </div>
    `
    $target.insertAdjacentHTML('beforeend', recordDOM);

    document.querySelector(`#search_${key}`)
    .addEventListener('click', () => getData($target, record.owner, record.repo));

    document.querySelector(`#delete_${key}`)
    .addEventListener('click', () => deleteData($target, record.owner, record.repo));
 
  }
}