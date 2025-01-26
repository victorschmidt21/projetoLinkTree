import { ReactNode } from "react";

interface SocialMediaProps {
  children: ReactNode;
  url: string | undefined;
}

export function SocialMedia({ children, url }: SocialMediaProps) {
  return (
    <>
      <a href={url} target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">{children}</a>
    </>
  );
}
