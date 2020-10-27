class BodyContainer{
  constructor($target, currentPos, searchRecords, getData, deleteData, currentRepository) {

    this.$target = $target
    this.currentPos = currentPos;
    this.searchRecords = searchRecords;
    this.getData = getData;
    this.deleteData = deleteData;
    this.currentRepository = currentRepository;

    this.render();
  }

  render() {
    this.$target.innerHTML = "<div id='searchContainer'></div><div id='contentContainer'></div>"
  
    if (responseResults.issues) {
      new ContentContainer(
        document.querySelector('#contentContainer'), 
        this.currentRepository,
      );
    } else {
      if (this.currentPos === 'search') {
        SearchInputs(
          document.querySelector('#searchContainer'), 
          this.getData,
        )
      };
    
      if (this.currentPos === 'record') {
        new RecordList(
          document.querySelector('#searchContainer'), 
          this.searchRecords, 
          this.getData, 
          this.deleteData,
        )
      }
      
    }

  }
}
