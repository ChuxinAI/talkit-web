'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { languages, getLanguageByRegion } from '../utils/languages';

function RedirectContent() {
  const searchParams = useSearchParams();
  const [showCopyInstructions, setShowCopyInstructions] = useState(false);
  const [lang, setLang] = useState<keyof typeof languages>('en');
  const url = searchParams.get('url');

  useEffect(() => {
    if (!url) return;

    // 从URL中提取regionCode
    const urlMatch = url.match(/apps\.apple\.com\/([a-z]{2})\//);
    const regionCode = urlMatch ? urlMatch[1] : 'us';
    const detectedLang = getLanguageByRegion(regionCode);
    setLang(detectedLang);

    // 检测浏览器类型
    const userAgent = navigator.userAgent.toLowerCase();
    const isWeChat = userAgent.includes('micromessenger');
    const isQQ = userAgent.includes('qq/');
    const isQuark = userAgent.includes('quark');
    const isUC = userAgent.includes('ucbrowser');
    const isWeibo = userAgent.includes('weibo');
    
    // 如果是受限制的浏览器，显示复制提示
    if (isWeChat || isQQ || isQuark || isUC || isWeibo) {
      setShowCopyInstructions(true);
    } else {
      // 普通浏览器直接跳转
      window.location.href = url;
    }
  }, [url]);

  const copyToClipboard = async () => {
    if (!url) return;
    
    try {
      await navigator.clipboard.writeText(window.location.origin);
      alert(languages[lang].copySuccess);
    } catch (err) {
      // 降级方案
      const textArea = document.createElement('textarea');
      textArea.value = window.location.origin;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert(languages[lang].copySuccess);
    }
  };

  const currentLang = languages[lang];

  if (!url) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-800 mb-4">
            {currentLang.invalidLink}
          </h1>
          <a href="/" className="text-blue-600 underline">
            {currentLang.backHome}
          </a>
        </div>
      </div>
    );
  }

  if (showCopyInstructions) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-md mx-auto text-center bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <svg className="w-16 h-16 text-yellow-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <h1 className="text-xl font-semibold text-gray-800 mb-2">
              {currentLang.title}
            </h1>
            <p className="text-gray-600 text-sm mb-6">
              {currentLang.description}
            </p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={copyToClipboard}
              className="w-full bg-blue-600 text-white rounded-lg py-3 px-4 font-medium hover:bg-blue-700 transition-colors"
            >
              {currentLang.copyButton}
            </button>
            
            <div className="text-xs text-gray-500 space-y-1">
              {currentLang.steps.map((step, index) => (
                <p key={index}>{step}</p>
              ))}
            </div>
            
            <div className="pt-4 border-t">
              <a href="/" className="text-blue-600 underline text-sm">
                {currentLang.backHome}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 正在跳转的加载状态
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">{currentLang.redirecting}</p>
      </div>
    </div>
  );
}

export default function RedirectPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <RedirectContent />
    </Suspense>
  );
}