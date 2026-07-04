import React, { type ReactElement } from "react";
import cls from "./Stack.module.css";

type StackProps = React.HTMLAttributes<HTMLDivElement> & {
  direction?: "row" | "column";
  gap?: string;
};

export function Stack({
  direction = "column",
  gap,
  className,
  style,
  ...rest
}: StackProps): ReactElement {
  const classList = [
    direction === "column" ? cls.col : cls.row,
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const computedStyle: React.CSSProperties =
    gap !== undefined
      ? ({ "--gap": gap } as React.CSSProperties)
      : {};

  return (
    <div
      className={classList}
      style={{ ...computedStyle, ...style }}
      {...rest}
    />
  );
}
