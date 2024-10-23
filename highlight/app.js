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

    // ユーザーが入力した路線名を取得
    const query = document.querySelector('[name="q"]').value;

    // 入力された路線名で路線を検索（非同期処理）
    const lines = await rosen.searchLinesByName(query);

    // 該当する路線が見つからなかった場合、アラートを表示して処理を終了
    if (lines.length === 0) {
      alert('該当する路線がありません');
      return;
    }

    // 検索結果の最初の路線のコードを取得
    const { code } = lines[0];

    // 取得した路線を地図上でハイライト表示
    rosen.highlightLine(code);

    // ハイライトした路線の駅を取得（非同期処理）
    const stations = await rosen.searchStations({
      lineCode: code,  // 路線コードを使って駅情報を取得
    });

    // 駅のコードを使って地図の表示範囲を自動的に調整
    rosen.fitBoundsByStationCodes(stations.map(s => s.code));
  });
});
