"use server";

import { delay } from "@/util/delay";
import { revalidatePath, revalidateTag } from "next/cache";

export async function createReviewAction(_: any, formData: FormData) {
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();
  const bookId = formData.get("bookId")?.toString();

  if (!bookId || !content || !author) {
    return {
      status: false,
      error: "리뷰 내용과 작성자를 입력해주세요.",
    };
  }

  try {
    await delay(2000);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ bookId, content, author }),
      }
    );
    console.log(response.status);
    // // 1. 특정 주소의 해당 페이지만 재검증
    // revalidatePath(`/book/${bookId}`);

    // // 2. 특정 경로의 모든 동적 페이지 재검증
    // revalidatePath(`/book/[id]`, "page");

    // // 3. 특정 레이아웃을 갖는 모든 페이지 재검증
    // revalidatePath(`/(with-searchbar)`, "layout");

    // // 4. 모든 데이터 재검증
    // revalidatePath(`/`, "layout");

    // 5. 태그 기준. 데이터 캐시 재검증
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    revalidateTag(`review=${bookId}`);
    return {
      status: true,
      error: "",
    };
  } catch (err) {
    return {
      status: false,
      error: `리뷰 저장에 실패했습니다 : ${err}`,
    };
  }
}
