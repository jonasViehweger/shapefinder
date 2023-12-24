import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-40 rounded-full mx-auto text-center mt-5">
          <Link href="/adm0">Countries</Link>
        </div>
        <section>{children}</section>
      </body>
    </html>
  );
}
