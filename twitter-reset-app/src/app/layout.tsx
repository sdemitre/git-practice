

import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter for now as it's close enough
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Twitter Clone - Algorithmic Reset",
  description: "A demo of hard algorithmic reset functionality",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-[#e7e9ea] min-h-screen overscroll-none`}>
        <div className="flex max-w-[1265px] mx-auto min-h-screen">
          {/* Left Sidebar - width handled in component (275px on XL) */}
          <header className="flex-shrink-0 w-20 xl:w-72">
            <Sidebar />
          </header>

          {/* Main Feed */}
          <main className="flex-1 min-w-0 border-r border-gray-800 max-w-[600px]">
            {children}
          </main>

          {/* Right Sidebar - Trending / Search */}
          <div className="hidden lg:block w-[350px] pl-8 py-2">

            {/* Search Bar */}
            <div className="sticky top-0 bg-black pt-2 pb-1 z-20 mb-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500 group-focus-within:text-[#1d9bf0] transition-colors">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current"><g><path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.684 3.815-1.838 5.27l6.706 6.705-1.414 1.414-6.706-6.704c-1.455 1.154-3.284 1.838-5.27 1.838-4.694 0-8.5-3.806-8.5-8.5z"></path></g></svg>
                </div>
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full bg-[#202327] border border-transparent focus:border-[#1d9bf0] focus:bg-black rounded-full py-3 pl-12 pr-4 outline-none text-[15px] placeholder-gray-500 transition-all text-white"
                />
              </div>
            </div>

            {/* What's Happening */}
            <div className="bg-[#16181c] rounded-2xl overflow-hidden mb-4 border border-[#16181c]">
              <h2 className="font-bold text-xl px-4 py-3">What&apos;s happening</h2>

              <div className="px-4 py-3 hover:bg-white/[0.03] cursor-pointer transition-colors relative">
                <div className="text-gray-500 text-xs flex justify-between">
                  <span>Engineering · Trending</span>
                  <span className="font-bold cursor-pointer hover:bg-blue-500/20 rounded-full p-1 -m-1">...</span>
                </div>
                <div className="font-bold font-sm mt-0.5">#AlgorithmicReset</div>
                <div className="text-gray-500 text-xs mt-0.5">50.4K posts</div>
              </div>

              <div className="px-4 py-3 hover:bg-white/[0.03] cursor-pointer transition-colors">
                <div className="text-gray-500 text-xs">Politics · Trending</div>
                <div className="font-bold font-sm mt-0.5">Elections 2026</div>
                <div className="text-gray-500 text-xs mt-0.5">1.2M posts</div>
              </div>

              <div className="px-4 py-3 hover:bg-white/[0.03] cursor-pointer transition-colors">
                <div className="text-gray-500 text-xs">Music · LIVE</div>
                <div className="font-bold font-sm mt-0.5">The Weeknd</div>
                <div className="text-gray-500 text-xs mt-0.5">Posted by @Variety</div>
              </div>

              <div className="px-4 py-3 text-[#1d9bf0] text-sm hover:bg-white/[0.03] cursor-pointer cursor-not-allowed">
                Show more
              </div>
            </div>

            {/* Who to follow */}
            <div className="bg-[#16181c] rounded-2xl overflow-hidden border border-[#16181c]">
              <h2 className="font-bold text-xl px-4 py-3">Who to follow</h2>

              {[1, 2, 3].map((i) => (
                <div key={i} className="px-4 py-3 hover:bg-white/[0.03] cursor-pointer transition-colors flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-600" />
                    <div>
                      <div className="font-bold text-sm hover:underline">Person {i}</div>
                      <div className="text-gray-500 text-sm">@person{i}</div>
                    </div>
                  </div>
                  <button className="bg-white text-black font-bold text-sm px-4 py-1.5 rounded-full hover:bg-gray-200 transition-colors">
                    Follow
                  </button>
                </div>
              ))}
            </div>

            <div className="text-gray-500 text-[13px] mt-4 px-4 leading-5">
              Terms of Service Privacy Policy Cookie Policy Accessibility Ads info More © 2026 X Corp.
            </div>

          </div>
        </div>
      </body>
    </html>
  );
}

