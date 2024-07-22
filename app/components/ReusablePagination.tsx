"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Props {
  currentPage: number;
  pageSize: number;
  itemCount: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function Pagination({
  currentPage,
  pageSize,
  itemCount,
  setCurrentPage,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pages, setPages] = useState(currentPage);

  useEffect(() => {
    setPages(currentPage);
  }, [currentPage]);

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  function changePages(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
    setCurrentPage(page);
  }

  return (
    <div className="flex justify-between items-center bg-gray-100 px-4 py-2">
      <div className="text-slate-700">
        <span className="text-[15px]">
          Showing {pages} to {pageCount} of {itemCount} results
        </span>
      </div>
      <div className="flex gap-8 items-center">
        <button
          className="flex items-center disabled:cursor-not-allowed disabled:opacity-70 gap-2 text-gray-700 py-2 px-3 rounded-md hover:bg-blue-700 transition-all duration-200 cursor-pointer hover:text-slate-200"
          disabled={pages <= 1}
          onClick={() => {
            setPages((set) => (set -= 1));
            changePages(pages - 1);
          }}
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-[15px] font-medium">Previous</span>
        </button>
        <button
          className="flex items-center disabled:cursor-not-allowed disabled:opacity-70 gap-2 text-gray-700 py-2 px-3 rounded-md hover:bg-blue-700 transition-all duration-200 cursor-pointer hover:text-slate-200"
          disabled={pages === pageCount}
          onClick={() => {
            setPages((set) => (set += 1));
            changePages(pages + 1);
          }}
        >
          <span className="text-[15px] font-medium ">Next</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
