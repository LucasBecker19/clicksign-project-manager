import type { Metadata } from "next";
import { Encode_Sans_Semi_Expanded } from "next/font/google";
import "./globals.css";

const encodeSans = Encode_Sans_Semi_Expanded({
  weight: ['400', '600'],
  subsets: ["latin"],
  variable: "--font-encode-sans",
});

export const metadata: Metadata = {
  title: "Gerenciador de Projetos",
  description: "Gerenciador de Projetos desenvolvido para Clicksign",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${encodeSans.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
