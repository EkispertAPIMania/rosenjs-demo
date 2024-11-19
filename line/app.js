// ページが完全に読み込まれた後に実行されるイベントリスナー
document.addEventListener('DOMContentLoaded', () => {
  // Rosenクラスのインスタンスを作成。地図の要素にAPIキーを使って表示
  const rosen = new Rosen("map", {
    apiKey: API_KEY,  // APIキーは別途設定して使用する
  });

  // ボタンがクリックされた時に実行されるイベントリスナー
  document.querySelector('button').addEventListener('click', async (e) => {
    // ページの再読み込みを防ぐ
    e.preventDefault();

    // 入力された駅名の一覧を取得
    const stations = document.querySelector('#stations').value.split('\n');
    const res = await Promise.all(stations
      // 駅名を検索
      .map(station => rosen.searchStationsByName(station, {
        stationNameMatchType: 'forward', limit: 1
      })
    ));
    // 駅情報からコードを取得
    const codes = res.map(r => r[0].code);
    // 取得した駅を結ぶ折れ線を地図上でハイライト表示
    rosen.addPolyline(codes, {color: "#0000ff", weight: 3, opacity: 0.7});

    // 駅のコードを使って地図の表示範囲を自動的に調整
    rosen.fitBoundsByStationCodes(codes);
  });
});
