import Image from "next/image";
import { headers } from "next/headers";

export default async function Home() {
  const requestHeaders = await headers();
  const ipCountryHeader = requestHeaders.get("x-vercel-ip-country");
  const acceptLanguageHeader = requestHeaders.get("accept-language") ?? "";

  const countryFromIp = ipCountryHeader?.toLowerCase();
  const countryFromAcceptLanguage = (() => {
    const firstLang = acceptLanguageHeader.split(",")[0] ?? "";
    const parts = firstLang.split("-");
    if (parts.length >= 2) return parts[1].toLowerCase();
    return undefined;
  })();

  const regionCode = countryFromIp || countryFromAcceptLanguage || "us";
  const appStoreUrl = `https://apps.apple.com/${regionCode}/app/6448311069`;
  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-8">
      <div></div>
      
      {/* 主要内容区域 - 居中显示 */}
      <main className="flex flex-col items-center text-center space-y-8">
        {/* Logo */}
        <div className="mb-6">
          <Image
            src="/logo.jpg"
            alt="Learning english, just talkit!"
            width={200}
            height={200}
            priority
            className="mx-auto"
          />
        </div>
        
        {/* 宣传语 */}
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
          Learning english, just <span className="text-[#A35AD9]">talkit</span> !
          <br />
        </h1>
        
        {/* iOS下载按钮 */}
        <div className="mb-8">
          <a
            href={appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white rounded-lg px-6 py-3 inline-flex items-center space-x-3 hover:bg-gray-800 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.85 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
            </svg>
            <span className="text-lg font-medium">Download for iOS</span>
          </a>
        </div>
      </main>
      
      {/* 底部联系方式 */}
      <footer className="text-center text-gray-600 text-sm">
        <p>Contact us: <a href="mailto:support@originwise.ai" className="text-blue-600 hover:underline">support@originwise.ai</a></p>
      </footer>
    </div>
  );
}
