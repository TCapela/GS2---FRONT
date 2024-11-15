import type { Metadata } from "next";
import { Poppins } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { UserProvider } from "@/context/UserContext";
import Footer from "@/components/Footer/Footer";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: 'normal',
  display: 'swap'
});

export const metadata: Metadata = {
  title: "EnergyCalc",
  description: "Descubra qual energia renovável utilizar",
};



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.className}`}>
        <Navbar/>
        <UserProvider>{children}</UserProvider>
        <Footer/>
      </body>
    </html>
  );
}

