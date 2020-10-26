class BodyContainer{
  constructor($target, currentPos, searchRecords, getData, deleteData) {
    this.render($target, currentPos, searchRecords, getData, deleteData)
  }

  render($target, currentPos, searchRecords, getData, deleteData) {
    $target.innerHTML = "<div id='searchContainer'></div><div id='contentContainer'></div>"
  
    
    if (currentPos === 'search') {
      SearchInputs(
        document.querySelector('#searchContainer'), 
        getData,
      )
    };
  
    if (currentPos === 'record') {
      new RecordList(
        document.querySelector('#searchContainer'), 
        searchRecords, 
        getData, 
        deleteData,
      )
    }
    
    IssueList(document.querySelector('#contentContainer'));

  }
}
