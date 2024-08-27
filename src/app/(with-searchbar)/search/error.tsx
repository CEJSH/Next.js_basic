"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";
// Error 컴포넌트에 error props 자동으로 전달이 됨
// reset은 서버측에서 실행되는 서버컴포넌트를 다시 실행하지는 않음
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    console.error(error.message);
  }, [error]);
  return (
    <div>
      <h3>검색 과정에서 오류가 발생했습니다.</h3>
      <button
        onClick={() => {
          startTransition(() => {
            router.refresh(); // Next서버에게 서버 컴포넌트만 새롭게 렌더링 요청 (현재 페이지에 필요한 서버 컴포넌트들을 다시 불러온다)
            reset(); // 위에서 새롭게 전달받은 서버 컴포넌트의 데이터를 화면에 새롭게 다시 렌더링 함
          });
          //   window.location.reload(); // 강제 새로고침 (우아한 방법은 아니다)
        }}
      >
        again
      </button>
    </div>
  );
}
