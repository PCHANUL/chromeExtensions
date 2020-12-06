// const kLocales = {
//   'com.au': 'Australia',
//   'com.br': 'Brazil',
//   'ca': 'Canada',
//   'cn': 'China',
//   'fr': 'France',
//   'it': 'Italy',
//   'co.in': 'India',
//   'co.jp': 'Japan',
//   'com.ms': 'Mexico',
//   'ru': 'Russia',
//   'co.za': 'South Africa',
//   'co.uk': 'United Kingdom'
// };

// for (let key of Object.keys(kLocales)) {
//   chrome.contextMenus.create({
//     id: key,
//     title: kLocales[key],
//     type: 'normal',
//     contexts: ['selection'],
//   });
// }


chrome.runtime.onInstalled.addListener(function() {
  console.log(toTime(30000000))
  
  console.log('onInstalled...', chrome.tabs);
  let timer = 0;
  
  // setInterval(() => {
  // }, 5000);

    // chrome.storage.sync.set({
    //   code: ++timer
    // });
    
    chrome.tabs.query({
      url: 'https://www.youtube.com/*', 
      // audible: true,
    }, tabs => {
      console.log('tabs: ', tabs);
      let url_id = tabs[0].id;
      console.log('url: ', url_id);
    });

    let start, end, dateNow = '00000000';


    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      dateNow = getDateNow(dateNow);
      console.log('dateNow: ', dateNow.slice(6));
      console.log('tabId, changeInfo, tab: ', tabId, changeInfo, tab, dateNow);
      



      if (changeInfo.audible !== undefined) {

        if (changeInfo.audible) {
          // url, 데이터 위치  - 확인
          start = performance.now()
        } else {
          end = performance.now();
          let calc = end - start;
          console.log(calc, toTime(calc));
          chrome.storage.sync.get((data) => {
            chrome.storage.sync.set({ dateNow })
            data[dateNow]
          })
        }
        // chrome.storage.sync.set({
        //   start: 
        // });
      }

    })

  // chrome.alarms.create('refresh', { periodInMinutes: 1 });
});

// chrome.alarms.onAlarm.addListener((alarm) => {
//   console.log(alarm.name);
//   helloWorld();
// });

function getDateNow(prevDate) {
  let now = new Date();
  let date = now.getDate();
  console.log('prevDate.slice(6) === date: ', prevDate.slice(6), date);
  if (prevDate.slice(6) === date) return prevDate;
  let month = now.getMonth();
  return `${now.getFullYear()}${month < 10 ? `0${month}` : month}${date < 10 ? `0${date}` : date}`;
}



function helloWorld() {
  console.log("Hello, world!");
 
}