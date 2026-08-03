import { marked, Tokens } from "marked";
import sanitizeHtml from "sanitize-html";
import { escapeHtml } from "@/lib/security/escape";

/**
 * Configure marked options
 */
marked.setOptions({
  gfm: true, // GitHub Flavored Markdown
  breaks: false, // Don't convert \n to <br> for cleaner paragraphs
});

// Custom renderer. On ne surcharge QUE ce qui a besoin d'un comportement
// spécifique (ancres de titres, échappement des blocs de code, rel sur les
// liens). Les paragraphes, listes et l'inline (gras/italique/code/liens) sont
// laissés au rendu par défaut de marked : les surcharger avec `token.text`
// renvoyait le markdown BRUT (marked v5+ donne le texte non parsé dans `.text`),
// d'où les « ** » et « - » affichés littéralement dans les articles.
const renderer = {
  heading(this: { parser: { parseInline: (t: Tokens.Heading["tokens"]) => string } }, { tokens, depth }: Tokens.Heading) {
    // Ancre personnalisée "Titre {#custom-id}" pour la table des matières.
    const rawText = tokens.map((t) => ("text" in t ? t.text : "")).join("");
    const match = rawText.match(/^(.+?)\s*\{#([a-z0-9-]+)\}\s*$/);

    if (match) {
      const [, title, id] = match;
      const parsedTitle = marked.parseInline(title.trim());
      return `<h${depth} id="${id}">${parsedTitle}</h${depth}>\n`;
    }

    // Parse l'inline du titre (gras/italique/liens), ne PAS utiliser le brut.
    return `<h${depth}>${this.parser.parseInline(tokens)}</h${depth}>\n`;
  },

  code({ text, lang }: Tokens.Code) {
    const language = lang || "";
    const escaped = escapeHtml(text);

    return `<pre><code class="language-${escapeHtml(language)}">${escaped}</code></pre>\n`;
  },

  link(
    this: { parser: { parseInline: (t: Tokens.Link["tokens"]) => string } },
    { href, title, tokens }: Tokens.Link,
  ) {
    // 🔒 E1 : n'autoriser que les schémas d'URL sûrs
    const safe = /^(https?:|mailto:|\/|#)/i.test(href ?? "");
    const finalHref = safe ? href : "#";
    const titleAttr = title ? ` title="${escapeHtml(title)}"` : "";
    // Parse l'inline du libellé, comme heading() ci-dessus. L'ancien code
    // interpolait `text` (markdown BRUT depuis marked v5+) sans échappement :
    // `[**gras**](url)` rendait littéralement « **gras** », et la sécurité
    // reposait entièrement sur sanitize-html en aval.
    return `<a href="${escapeHtml(finalHref ?? "#")}"${titleAttr} rel="noopener noreferrer">${this.parser.parseInline(tokens)}</a>`;
  },
};

marked.use({ renderer });

/**
 * Retire le premier titre de niveau 1 d'un article.
 *
 * Chaque article du journal commence par `# Son titre`, qui est aussi rendu
 * par la page dans son `<h1>`. Sans ce filtre, le titre s'affiche deux fois :
 * une fois dans l'en-tête, une seconde en tête du corps et dans une taille
 * plus grande que le vrai titre — c'est ce qui déséquilibrait visuellement les
 * articles, et cela produisait deux `<h1>` sur la même page.
 *
 * Le markdown source garde son `# Titre` : c'est lui qui documente l'article,
 * et le test de contenu continue d'exiger exactement un H1. Seul le rendu le
 * retire. Les `#` à l'intérieur d'un bloc de code (commentaires shell) ne sont
 * pas des titres et sont donc ignorés. Seule la syntaxe ATX (`# Titre`) est
 * traitée : c'est la seule utilisée, et un titre « souligné » se reconnaît sur
 * deux lignes, ce que ce filtre volontairement ne tente pas de deviner.
 */
export function stripLeadingH1(markdown: string): string {
  const lines = markdown.split("\n");
  let inCode = false;

  for (let i = 0; i < lines.length; i++) {
    if (/^\s*```/.test(lines[i])) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;
    if (!/^#\s+\S/.test(lines[i])) continue;

    // Le titre trouvé : on l'enlève, ainsi que les lignes vides qui le
    // suivaient, pour ne pas laisser un blanc en tête de corps d'article.
    let j = i + 1;
    while (j < lines.length && lines[j].trim() === "") j++;
    return [...lines.slice(0, i), ...lines.slice(j)].join("\n");
  }

  return markdown;
}

/**
 * Convert Markdown to HTML
 */
export function markdownToHtml(markdown: string): string {
  if (!markdown) return "";

  try {
    const html = marked.parse(markdown);
    const raw = typeof html === "string" ? html : "";
    // 🔒 E1 : neutraliser tout HTML dangereux (script, onerror, javascript:, …).
    // sanitize-html est pur-JS (pas de jsdom) → fonctionne dans le runtime
    // serverless. style/iframe/form/input/script sont absents de allowedTags
    // donc retirés ; seuls http/https/mailto sont autorisés sur les liens.
    return sanitizeHtml(raw, {
      allowedTags: [
        "h1", "h2", "h3", "h4", "h5", "h6",
        "p", "a", "ul", "ol", "li", "strong", "em", "b", "i",
        "code", "pre", "blockquote", "br", "hr", "span", "del", "ins", "sup", "sub",
        "table", "thead", "tbody", "tfoot", "tr", "th", "td", "img",
      ],
      allowedAttributes: {
        a: ["href", "title", "target", "rel"],
        code: ["class"],
        img: ["src", "alt", "title"],
        th: ["colspan", "rowspan", "scope"],
        td: ["colspan", "rowspan"],
        "*": ["id"],
      },
      allowedSchemes: ["http", "https", "mailto"],
      allowedSchemesByTag: {
        a: ["http", "https", "mailto"],
        img: ["http", "https"],
      },
      // Force rel=noopener noreferrer on any link (defense in depth; the marked
      // renderer already sets it) so target=_blank links can't tabnab.
      transformTags: {
        a: (tagName, attribs) => ({
          tagName,
          attribs: { ...attribs, rel: "noopener noreferrer" },
        }),
      },
    });
  } catch (error) {
    console.error("Error parsing markdown:", error);
    return "";
  }
}
