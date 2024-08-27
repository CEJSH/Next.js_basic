import { notFound } from "next/navigation";
import style from "./page.module.css";

/** 미리 정해둔 파라미터 외에 모두 404로 보내고 싶다면? */
// export const dynamicParams = false;

// export const dynamic = ''
// 특정 페이지의 유형을 강제로 Static, Dynamic 페이지로 설정
// 1. 며새
//2 . force-dynamic
export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export default async function Page({
  params,
}: {
  params: { id: string | string[] };
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${params.id}`
  );
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생..</div>;
  }
  const book = await response.json();
  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
