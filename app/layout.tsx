import { Providers } from './providers';
import { Navigation } from '@/components/navigation';
import { ThemeProvider } from "@/components/theme-provider";
import { inter } from '@/lib/fonts';
import { Toaster } from 'sonner';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen bg-background">
              <Navigation />
              <main>{children}</main>
              <Toaster richColors position="bottom-right" />
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}