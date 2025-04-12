import type { Metadata } from "next";
import "./css/9d3f657866d1407e.css";
import "./css/1da2bba9afc7809e.css";

export const metadata: Metadata = {
  title: "UNIDEX",
  description: "What if your crypto could only go up? Meet UNIDEX, the world's first decentralized exchange with unidirectional functionality, built to perform better than other cryptocurrencies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta httpEquiv="content-type" content="text/html;charset=utf-8" />
      <head>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <meta name="generator" content="v0.dev"/>
      <meta name="next-size-adjust"/>
   </head>
      <body style={{background: '#192800'}} className="__className_d65c78">
        {children}
      </body>
    </html>
  );
}
