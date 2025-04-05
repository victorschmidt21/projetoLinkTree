import { ReactNode } from "react";

interface SocialMediaProps {
  children: ReactNode;
  url: string | undefined;
}

export function SocialMedia({ children, url }: SocialMediaProps) {
  return (
    <div className="p-3 border-2 border-[#959595] rounded-full hover:border-white">
      <a href={url} target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">{children}</a>
    </div>
  );
}
