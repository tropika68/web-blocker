document.addEventListener('DOMContentLoaded', function () {
  var saveButton = document.getElementById('getDataButton');

  saveButton.addEventListener('click', function () {
    var urlInput = document.querySelector('input[name="url"]').value;
    var wordInput = document.querySelector('input[name="word"]').value;

    // ブロックしたいURLとワードをそれぞれ別々のキーで保存する
    chrome.storage.local.set({
      "blockedURL": urlInput,
      "blockedWord": wordInput
    }, function () {
      var status = document.getElementById('status');
      status.textContent = 'Saved.';
      setTimeout(function () {
        status.textContent = '';
      }, 10000);

      // データの取得と表示
      chrome.storage.local.get(["blockedURL", "blockedWord"], function(result) {
        console.log("Blocked URL:", result.blockedURL);
        console.log("Blocked Word:", result.blockedWord);
        // ここで取得したデータをHTML上に表示する処理を追加することができます
        status.textContent = "Blocked URL: " + result.blockedURL + ", Blocked Word: " + result.blockedWord;
      });

    });
  });
});
