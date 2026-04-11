"use client";

import { useMemo } from "react";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  // PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

type ButtonProps = Omit<React.ComponentProps<typeof Button>, "variant"> & {
  isActive?: boolean;
};

const ButtonPaginationButton = ({ isActive, ...rest }: ButtonProps) => {
  return <Button variant={isActive ? "outline" : "ghost"} {...rest} />;
};

export type Props = {
  total?: number;
  itemsPerPage?: number;
  current?: number;
  onMovePage: (page: number) => void;
};

export const ButtonPagination = ({
  total,
  itemsPerPage = 10,
  current,
  onMovePage,
}: Props) => {
  if (!total || !current) return null;

  const isShowPrev = useMemo<boolean>(() => {
    return current > 1;
  }, [current]);

  const isShowNext = useMemo<boolean>(() => {
    return current < Math.ceil(total / itemsPerPage);
  }, [current, total, itemsPerPage]);

  const pages = useMemo<number[]>(() => {
    const pagesNum = Math.ceil(total / itemsPerPage);
    return Array(pagesNum)
      .fill(null)
      .map((_, index) => index + 1);
  }, []);

  const handleClickButton = (to: number | "prev" | "next") => {
    if (!current || to === current) return;
    switch (to) {
      case "prev":
        onMovePage(current - 1);
        break;
      case "next":
        onMovePage(current + 1);
        break;
      default:
        onMovePage(to);
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        {isShowPrev && (
          <PaginationItem>
            <ButtonPaginationButton
              onClick={() => handleClickButton("prev")}
              data-testid="button-pagination-button-prev"
            >
              <ChevronLeftIcon />
              <span className="hidden sm:block">前へ</span>
            </ButtonPaginationButton>
          </PaginationItem>
        )}
        {pages.map((page) => (
          <PaginationItem key={page}>
            <ButtonPaginationButton
              isActive={page === current}
              onClick={() => handleClickButton(page)}
              data-testid={`button-pagination-button-${page}`}
            >
              {page}
            </ButtonPaginationButton>
          </PaginationItem>
        ))}
        {/* <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}
        {isShowNext && (
          <PaginationItem>
            <ButtonPaginationButton
              onClick={() => handleClickButton("next")}
              data-testid="button-pagination-button-next"
            >
              <span className="hidden sm:block">次へ</span>
              <ChevronRightIcon />
            </ButtonPaginationButton>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
