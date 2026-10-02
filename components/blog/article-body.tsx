import { MDXRemote } from "next-mdx-remote/rsc";
import { slugify } from "@/lib/headings";

function textOf(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (node && typeof node === "object" && "props" in node) {
    return textOf((node as { props: { children?: React.ReactNode } }).props.children);
  }
  return "";
}

function heading(Tag: "h2" | "h3") {
  return function Heading({ children }: { children?: React.ReactNode }) {
    return <Tag id={slugify(textOf(children))}>{children}</Tag>;
  };
}

const components = {
  h2: heading("h2"),
  h3: heading("h3"),
};

export function ArticleBody({ source }: { source: string }) {
  return (
    <div className="editorial-prose">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
