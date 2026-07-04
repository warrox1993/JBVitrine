import { marked, Tokens } from "marked";
import DOMPurify from "isomorphic-dompurify";

/**
 * Configure marked options
 */
marked.setOptions({
  gfm: true, // GitHub Flavored Markdown
  breaks: false, // Don't convert \n to <br> for cleaner paragraphs
});

// Custom renderer to handle custom heading IDs like {#id}
const renderer = {
  heading({ tokens, depth, text }: Tokens.Heading) {
    // Get raw text from tokens
    const rawText = tokens.map((t) => ("text" in t ? t.text : "")).join("");

    // Check if text has a custom ID like "Title {#custom-id}"
    const match = rawText.match(/^(.+?)\s*\{#([a-z0-9-]+)\}\s*$/);

    if (match) {
      const [, title, id] = match;
      // Parse the title to handle markdown formatting (bold, italic, etc.)
      const parsedTitle = marked.parseInline(title.trim());
      return `<h${depth} id="${id}">${parsedTitle}</h${depth}>\n`;
    }

    // No custom ID, use the text as-is
    return `<h${depth}>${text}</h${depth}>\n`;
  },

  code({ text, lang }: Tokens.Code) {
    const language = lang || "";
    const escaped = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

    return `<pre><code class="language-${language}">${escaped}</code></pre>\n`;
  },

  paragraph({ text }: Tokens.Paragraph) {
    return `<p>${text}</p>\n`;
  },

  list({ ordered, items }: Tokens.List) {
    const type = ordered ? "ol" : "ul";
    const body = items.map((item) => this.listitem(item)).join("");
    return `<${type}>\n${body}</${type}>\n`;
  },

  listitem({ text }: Tokens.ListItem) {
    return `<li>${text}</li>\n`;
  },

  strong({ text }: Tokens.Strong) {
    return `<strong>${text}</strong>`;
  },

  em({ text }: Tokens.Em) {
    return `<em>${text}</em>`;
  },

  codespan({ text }: Tokens.Codespan) {
    return `<code>${text}</code>`;
  },

  link({ href, title, text }: Tokens.Link) {
    // 🔒 E1 : n'autoriser que les schémas d'URL sûrs
    const safe = /^(https?:|mailto:|\/|#)/i.test(href ?? "");
    const finalHref = safe ? href : "#";
    const titleAttr = title ? ` title="${title}"` : "";
    return `<a href="${finalHref}"${titleAttr} rel="noopener noreferrer">${text}</a>`;
  },
};

marked.use({ renderer });

/**
 * Convert Markdown to HTML
 */
export function markdownToHtml(markdown: string): string {
  if (!markdown) return "";

  try {
    const html = marked.parse(markdown);
    const raw = typeof html === "string" ? html : "";
    // 🔒 E1 : neutraliser tout HTML dangereux (script, onerror, javascript:, …)
    return DOMPurify.sanitize(raw, {
      ADD_ATTR: ["id", "target", "rel"],
      FORBID_TAGS: ["style", "iframe", "form", "input"],
    });
  } catch (error) {
    console.error("Error parsing markdown:", error);
    return "";
  }
}
