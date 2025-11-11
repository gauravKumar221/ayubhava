import './globals.css';
import { AppLayout } from '@/components/app-layout.jsx';
import { Toaster } from '@/components/ui/toaster.jsx';

export const metadata = {
  title: 'Bit Max',
  description: 'A modern dashboard for hospital administration.',
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
        <AppLayout>{children}</AppLayout>
        <Toaster />
      </body>
    </html>
  );
}
