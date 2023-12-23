import './globals.css'
import Link from 'next/link';

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body>
        <section><Link href="/adm0">Go to country selector.</Link></section>
        <section>{children}</section>
        </body>
      </html>
    )
  }