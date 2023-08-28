import './globals.css';

export const metadata = {
  title: 'Whatsapp Clone',
  description: 'Created and powered by Stream',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
