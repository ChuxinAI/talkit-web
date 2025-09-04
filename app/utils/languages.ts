// 多语言配置
export const languages = {
  'zh-CN': {
    title: '需要在浏览器中打开',
    description: '当前环境不支持直接跳转到App Store，请复制链接在浏览器中打开',
    copyButton: '复制网站链接',
    copySuccess: '链接已复制，请在浏览器中打开',
    steps: [
      '1. 点击上方按钮复制链接',
      '2. 在 Safari 或 Chrome 等浏览器中打开',
      '3. 点击下载按钮即可跳转到 App Store'
    ],
    backHome: '返回首页',
    loading: '加载中...',
    redirecting: '正在跳转到 App Store...',
    invalidLink: '无效的跳转链接'
  },
  'zh-TW': {
    title: '需要在瀏覽器中開啟',
    description: '當前環境不支援直接跳轉到App Store，請複製連結在瀏覽器中開啟',
    copyButton: '複製網站連結',
    copySuccess: '連結已複製，請在瀏覽器中開啟',
    steps: [
      '1. 點擊上方按鈕複製連結',
      '2. 在 Safari 或 Chrome 等瀏覽器中開啟',
      '3. 點擊下載按鈕即可跳轉到 App Store'
    ],
    backHome: '返回首頁',
    loading: '載入中...',
    redirecting: '正在跳轉到 App Store...',
    invalidLink: '無效的跳轉連結'
  },
  'ja': {
    title: 'ブラウザで開く必要があります',
    description: '現在の環境ではApp Storeに直接ジャンプできません。リンクをコピーしてブラウザで開いてください',
    copyButton: 'ウェブサイトリンクをコピー',
    copySuccess: 'リンクがコピーされました。ブラウザで開いてください',
    steps: [
      '1. 上のボタンをクリックしてリンクをコピー',
      '2. Safari や Chrome などのブラウザで開く',
      '3. ダウンロードボタンをクリックしてApp Storeにジャンプ'
    ],
    backHome: 'ホームに戻る',
    loading: '読み込み中...',
    redirecting: 'App Storeにジャンプ中...',
    invalidLink: '無効なジャンプリンク'
  },
  'en': {
    title: 'Need to open in browser',
    description: 'The current environment does not support direct jumping to App Store. Please copy the link and open it in a browser',
    copyButton: 'Copy Website Link',
    copySuccess: 'Link copied, please open in browser',
    steps: [
      '1. Click the button above to copy the link',
      '2. Open in browsers like Safari or Chrome',
      '3. Click the download button to jump to App Store'
    ],
    backHome: 'Back to Home',
    loading: 'Loading...',
    redirecting: 'Redirecting to App Store...',
    invalidLink: 'Invalid redirect link'
  }
};

// 根据地区代码获取语言
export function getLanguageByRegion(regionCode: string): keyof typeof languages {
  const region = regionCode.toLowerCase();
  
  // 中国大陆
  if (region === 'cn') {
    return 'zh-CN';
  }
  
  // 中国香港、澳门、台湾
  if (['hk', 'mo', 'tw'].includes(region)) {
    return 'zh-TW';
  }
  
  // 日本
  if (region === 'jp') {
    return 'ja';
  }
  
  // 其他地区默认英文
  return 'en';
}