import SearchBar from "@/components/searchbar";
import { ReactNode, Suspense } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>{new Date().toLocaleString()}</div>
      <Suspense fallback={<div>loading...</div>}>
        <SearchBar />
      </Suspense>
      {children}
    </div>
  );
}
