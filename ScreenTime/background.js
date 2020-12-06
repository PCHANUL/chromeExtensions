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


// 탭 정보 가져오기
// chrome.tabs.query({
//   url: 'https://www.youtube.com/*', 
//   // audible: true,
// }, tabs => {
//   let url_id = tabs[0].id;
// });

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.clear();
  chrome.storage.sync.set({'asdf': 1});

  let target = 'www.youtube.com';

  let start, end, calc, dateNow = '00000000';
  let times = {};

  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    dateNow = getDateNow(dateNow);
    console.log('tabId, changeInfo, tab: ', tabId, changeInfo, tab, dateNow);
    
    // 영상 시청 조건
    if (changeInfo.audible !== undefined) {
      if (changeInfo.audible) {
        times[tab.url] = performance.now(); // url과 시작시간
      } else {
        start = times[tab.url];
        end = performance.now();
        calc = end - start; // 시간 계산
        delete times[tab.url];  // 객체 정리

        console.log('calc: ', toTime(calc));
        
        // 크롬에 저장, url로 구분
        // chrome.storage.sync.get([target], (data) => {
        chrome.storage.sync.get((data) => {
          console.log('data: ', data);

          // 초기화 
          if (data[target] === undefined) {
            let init = {};
            init[target] = {};
            init[target][dateNow] = calc; // 첫번째 시간 값
            chrome.storage.sync.set({ ...init })
          } else {
            data[target][dateNow] = data[target][dateNow] + calc;
            chrome.storage.sync.set(data);
          }
        })
      }
    }
  })
});



// chrome.alarms.create('refresh', { periodInMinutes: 1 });
// chrome.alarms.onAlarm.addListener((alarm) => {
//   console.log(alarm.name);
//   helloWorld();
// });


