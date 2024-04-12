document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('form');
    var status = document.getElementById('status');

    form.addEventListener('submit', function (event) {

        // メッセージを表示
        status.textContent = 'Saved.';

        // 10秒後にメッセージを消去
        setTimeout(function () {
            status.textContent = '';
        }, 10000);
    });
});

document.addEventListener('DOMContentLoaded', function() {
  var getDataButton = document.getElementById('getDataButton');
  var dataContainer = document.getElementById('dataContainer');

  getDataButton.addEventListener('click', function() {
    // ボタンがクリックされたときにデータを取得して表示
    getDataFromSpreadsheet()
      .then(function(data) {
        // データを処理して特定のプロパティの値のみを抽出して表示
        var column2Values = extractColumn2Values(data);
        dataContainer.textContent = JSON.stringify(column2Values, null, 2);
      })
      .catch(function(error) {
        console.error('データの取得に失敗しました:', error);
      });
  });
});

async function getDataFromSpreadsheet() {
  var response = await fetch('https://script.google.com/macros/s/AKfycbyLUNhu6RyRrKan92B9LfFebRjDo7fKoley2NIAwsu2ZdMm9Pj8Fl0Wm2PPNrmv7JWu-g/exec');
  if (!response.ok) {
      throw new Error('スプレッドシートからデータを取得できませんでした。');
  }
  var data = await response.json();
  return data;
}

function extractColumn2Values(data) {
  // column2プロパティの値のみを抽出する
  return data.map(item => item.column2);
}
