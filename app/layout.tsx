import '@styles/globals.css';
import PageHead from './head';
import Header from '@components/header';
import Providers from './Provider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <PageHead />
      <body className="bg-[#F9FAFB] font-nanum-square text-16 font-regular">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
