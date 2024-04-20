

/*fetch('https://script.google.com/macros/s/AKfycbyq-_0timJxo3oiNYreExPuR4jnx4ncY8_CJIwaebZu-BydS3qqDnTcGnlUlxI5LqZ1/exec')
  .then(response => response.json())
  .then(data => {
    // column2プロパティの値のみを抽出する
    const column2Values = data.map(item => item.column2);
    console.log(column2Values); // column2プロパティの値をコンソールに出力
    // ここでHTMLに表示する処理を実装する
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
*/


// ページのURLが変更されるたびに実行されるリスナーを設定
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    // 変更されたURLを取得
    var url = tab.url;

    // URLに含まれる特定の文字列を置き換える
    var replacedUrl = replaceStringInUrl(url);

    // 新しいURLが元のURLと異なる場合、ページをリダイレクト
    if (replacedUrl !== url) {
        chrome.tabs.update(tabId, {url: replacedUrl});
    }
});

// URLに含まれる特定の文字列を置き換える関数
function replaceStringInUrl(url) {
    // 置き換えたい文字列とその置き換える文字列を定義
    var searchStrings = ["game", "ゲーム","poki","gaming","freem","scratch","youtube"];
    var replaceString = "https://townwork.net/magazine/skill/128819/";

    // URLに特定の文字列が含まれているかチェックし、含まれていた場合に置き換える
    for (var i = 0; i < searchStrings.length; i++) {
        if (url.includes(searchStrings[i])) {
            url = url.replace(searchStrings[i], replaceString);
        }
    }

    return url;
}


//ここまで


// ブロックしたいURLのパターンを配列で定義する
var blockedUrls = [
    "*://www.netflix.com/jp/*",
    "*://poki.com/jp/*",
    "https://www.gifu-np.co.jp/feature/games",
    "https://www.youtube.com/",
    "https://scratch.mit.edu/",
    "https://rugugu.jp/",
    "https://rugugu.jp/black/",
    "https://googlefeud.com/",
];


// webRequest APIを使って、特定のURLや単語を含むリクエストを監視してブロックする
chrome.webRequest.onBeforeRequest.addListener(
    blockRequest, // リクエストをキャンセルする関数を呼び出す
    {urls: blockedUrls}, // ブロックしたいURLのパターンを指定する
    ["blocking"] // リクエストをブロックするオプションを指定する
);


// メッセージリスナーを追加する
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "blockWord") {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "blockWord", wordToBlock: request.wordToBlock});
        });
    }
});

// リクエストをキャンセルする関数
function blockRequest(details) {
    return {cancel: true};
}

