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
  
  console.log('onInstalled...', chrome.tabs);

  chrome.storage.sync.set({
    code: 'Hello world!'
  });

  // setInterval(() => {
  //   // chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    // chrome.tabs.query({
    //   url: 'https://www.youtube.com/*', 
    //   // audible: true,
    // }, tabs => {
    //   console.log('tabs: ', tabs);
    //   let url_id = tabs[0].id;
    //   console.log('url: ', url_id);

    //   chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    //     console.log('tabId, changeInfo, tab: ', tabId, changeInfo, tab);

    //   })
    // });

  // }, 5000);


  // chrome.alarms.create('refresh', { periodInMinutes: 1 });
});

// chrome.alarms.onAlarm.addListener((alarm) => {
//   console.log(alarm.name);
//   helloWorld();
// });



function helloWorld() {
  console.log("Hello, world!");
 
}