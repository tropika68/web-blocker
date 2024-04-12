chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'showData') {
      const data = request.data;
      // データを表示する処理を行う
  }
});

