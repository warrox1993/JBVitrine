import type { Metadata } from "next";
import "./css/main.css";
import PreloadRemover from "./PreloadRemover";
import Script from "next/script";
import HeaderBasic from "../components/HeaderBasic/HeaderBasic";

export const metadata: Metadata = {
  title: "JB site vitrine",
  description: "Site vitrine de JB en Next.js ",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className="is-preload">
        <PreloadRemover />
        {/* Sidebar (exact Hyperspace markup) */}
        <section id="sidebar">
          <div className="inner">
            <nav>
              <ul>
                <li><a href="#intro">Welcome</a></li>
                <li><a href="#one">Who we are</a></li>
                <li><a href="#two">What we do</a></li>
                <li><a href="#three">Get in touch</a></li>
              </ul>
            </nav>
          </div>
        </section>

        {/* Wrapper */}
        <div id="wrapper">
          <HeaderBasic />
          {children}
        </div>

        {/* Footer (exact Hyperspace markup) */}
        <footer id="footer" className="wrapper style1-alt">
          <div className="inner">
            <ul className="menu">
              <li>&copy; Untitled. All rights reserved.</li>
              <li>
                Design: <a href="http://html5up.net">HTML5 UP</a>
              </li>
            </ul>
          </div>
        </footer>

        {/* Noscript stylesheet like template (served from public/assets/css) */}
        <noscript>
          <link rel="stylesheet" href="/assets/css/noscript.css" />
        </noscript>

        {/* Hyperspace scripts in original order */}
        <Script src="/assets/js/jquery.min.js" strategy="beforeInteractive" />
        <Script src="/assets/js/jquery.scrollex.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/jquery.scrolly.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/browser.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/breakpoints.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/util.js" strategy="afterInteractive" />
        <Script src="/assets/js/main.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
