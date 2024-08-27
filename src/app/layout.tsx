import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import { BookData } from "@/types";

/** page파일에서와 동일한 중복된 리퀘스트 -> Request Memoization 자동으로 실행(Next.js) */
async function Footer() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    return <footer>제작 @winterlood</footer>;
  }
  const books: BookData[] = await response.json();
  const bookCount = books.length;
  return (
    <footer>
      <div>제작 @winterlood</div>
      <div>{bookCount}개의 도서가 제공</div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={"/"}>📚 ONEBITE BOOKS</Link>
          </header>
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
