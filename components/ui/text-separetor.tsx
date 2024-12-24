import React from "react";

interface TextSeparatorProps {
  text: string;
  textColor?: string;
  lineColor?: string;
  className?: string;
}

export function TextSeparator({
  text,
  textColor = "text-gray-500",
  lineColor = "border-gray-300",
  className = "",
}: TextSeparatorProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className={`flex-grow border-t ${lineColor}`}></div>
      <span className={`flex-shrink mx-2 text-sm ${textColor}`}>{text}</span>
      <div className={`flex-grow border-t ${lineColor}`}></div>
    </div>
  );
}
