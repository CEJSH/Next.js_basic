import BookItem from "@/components/book-item";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";

async function SearchResult({ q }: { q: string }) {
  await delay(1500);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: "force-cache" }
  );
  if (!response.ok) return <div>오류가 발생했습니다...</div>;
  const books: BookData[] = await response.json();
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
export default async function Page({
  searchParams,
}: {
  searchParams: {
    q?: string;
  };
}) {
  // suspense key 속성에 설정을 해주면 해당 변수가 바뀌면 서스펜스 실행됨(키 값이 바뀌면 리액트가 컴포넌트가 완전히 바뀌었다고 인식하도록 만듦)
  return (
    <Suspense key={searchParams.q || ""} fallback={<div>Loading...</div>}>
      <SearchResult q={searchParams.q || ""} />
    </Suspense>
  );
}
