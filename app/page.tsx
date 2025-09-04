import Image from "next/image";
import { headers } from "next/headers";
import DownloadButton from "./components/DownloadButton";

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
  const appStoreUrl = `https://apps.apple.com/${regionCode}/app/6746628937`;
  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-8">
      <div></div>
      
      {/* 主要内容区域 - 居中显示 */}
      <main className="flex flex-col items-center text-center space-y-8">
        {/* Logo */}
        <div className="mb-6">
          <Image
            src="/logo.jpg"
            alt="Learning English, just Talkit !"
            width={200}
            height={200}
            priority
            className="mx-auto"
          />
        </div>
        
        {/* 宣传语 */}
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
          Learning English, just <span className="text-[#A35AD9]">Talkit</span> !
          <br />
        </h1>
        
        {/* iOS下载按钮 */}
        <div className="mb-8">
          <DownloadButton appStoreUrl={appStoreUrl} />
        </div>
      </main>
      
      {/* 底部联系方式 */}
      <footer className="text-center text-gray-600 text-sm">
        <p>Contact us: <a href="mailto:support@originwise.ai" className="text-blue-600 hover:underline">support@originwise.ai</a></p>
      </footer>
    </div>
  );
}
