// ページが完全に読み込まれた後に実行されるイベントリスナー
document.addEventListener('DOMContentLoaded', () => {
  const uiLanguage = location.hash === '#en' ? 'en' : 'ja';
  const options = {
    apiKey: API_KEY,  // APIキーは別途設定して使用する
    uiLanguage,
    sideMenuControl: true,
  };
  if (uiLanguage === 'en') {
    options.apiSetting = 'https_en';
    options.tileSetting = 'https_en';
  };
  // Rosenクラスのインスタンスを作成。地図の要素にAPIキーを使って表示
  const rosen = new Rosen("map", options);
});
