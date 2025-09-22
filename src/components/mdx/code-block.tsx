'use client'
import React from "react";
import { useTheme } from "next-themes";
import { BundledLanguage, createHighlighter } from "shiki";

type Props = {
  code: string;
  lang?: BundledLanguage;
};

let highlighterPromise: ReturnType<typeof createHighlighter> | null = null;

export function getHighlighterSingleton() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["rose-pine", "rose-pine-dawn"],
      langs: ["javascript", "ts", "java"],
    });
  }
  return highlighterPromise;
}

export function CodeBlock({ code, lang = "javascript" }: Props) {
  const { theme } = useTheme(); 
  const [html, setHtml] = React.useState("");

  React.useEffect(() => {
    const generateHtml = async () => {
      const highlighter = await getHighlighterSingleton();
      
      const selectedTheme = theme === "light" ? "rose-pine-dawn" : "rose-pine";
      
      const generatedHtml = highlighter.codeToHtml(code, {
        lang, 
        theme: selectedTheme,
      });
      
      setHtml(generatedHtml);
    };

    generateHtml();
  }, [code, lang, theme]); 

  return (
    <div
  className="not-prose my-4 [&_.shiki]:rounded-lg [&_.shiki]:p-4 [&_.shiki]:overflow-x-auto"
  dangerouslySetInnerHTML={{ __html: html }}
/>
  );
}
