"use client";

import { ChangeEvent, useCallback, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

type Props = {
  value?: string;
  disabled?: boolean;
  onSubmit: (text: string) => void;
};

export const SearchInput = ({ value, disabled, onSubmit }: Props) => {
  const [inputText, setInputText] = useState<string>(value || "");

  const canSubmit = useMemo<boolean>(() => {
    if (disabled) return false;
    if (value === inputText) return false;
    return true;
  }, [disabled, value, inputText]);

  const handleChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setInputText(e.target.value);
    },
    [setInputText],
  );

  const handleSubmit = useCallback(() => {
    if (!canSubmit) return;
    onSubmit(inputText);
  }, [inputText, canSubmit, onSubmit]);

  const handleClear = useCallback(() => {
    setInputText("");
  }, [setInputText]);

  return (
    <div className="grid grid-cols-[1fr_max-content]">
      <div className="relative h-full">
        <Input
          className="h-full rounded-r-none pr-9"
          onChange={handleChangeInput}
          // defaultValue={value}
          value={inputText}
          disabled={disabled}
          data-testid="search-input-input"
        />
        {!!inputText.length && !disabled && (
          <Button
            size="icon-sm"
            variant="ghost"
            className="absolute top-0 right-1 bottom-0 my-auto"
            aria-label="クリア"
            onClick={handleClear}
            data-testid="search-input-clear-button"
          >
            <X />
          </Button>
        )}
      </div>
      <Button
        size="icon-lg"
        className="border-primary h-full rounded-l-none"
        aria-label="検索"
        onClick={handleSubmit}
        disabled={!canSubmit}
        data-testid="search-input-submit-button"
      >
        <Search />
      </Button>
    </div>
  );
};
