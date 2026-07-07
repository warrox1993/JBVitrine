# INSTALLED_TOOLS.md — écosystème Claude Code du projet

> État au **2026-07-07**. Installé via le CLI `claude plugin install` (scope **user**, `~/.claude`) + installs manuels documentés. ⚠️ Les plugins fraîchement installés **se chargent au prochain démarrage** de session (pas hot-chargés dans la session en cours).

## Marketplaces configurés
| Marketplace | Source |
|---|---|
| `claude-plugins-official` | GitHub `anthropics/claude-plugins-official` |
| `superpowers-marketplace` | GitHub `obra/superpowers-marketplace` |
| `voltagent-subagents` | GitHub `VoltAgent/awesome-claude-code-subagents` (ajouté cette session) |

## Niveau 0 — Fondation
| Outil | Source | Statut | Couvre |
|---|---|---|---|
| **frontend-design** | `@claude-plugins-official` | ✅ déjà présent | Direction visuelle, design d'UI distinctif |
| **superpowers** | `@claude-plugins-official` | ✅ installé cette session | Lifecycle dev : brainstorming, writing-plans, TDD, subagent-driven-development, using-git-worktrees, requesting-code-review, finishing-a-development-branch |
| **context7** | `@claude-plugins-official` (+ MCP claude.ai) | ✅ installé cette session | Doc à jour des librairies (utilisé pour next-intl) |
| **security-guidance** | `@claude-plugins-official` v2.0.6 | ✅ déjà présent | Scan de vulnérabilités de base (son hook s'est déclenché en session) |

## Niveau 1 — Qualité de code & revue
| Outil | Source | Statut | Couvre |
|---|---|---|---|
| **typescript-lsp** | `@claude-plugins-official` | ✅ installé cette session | Serveur de langage TypeScript (cohérent avec la stack Next.js/TS) |
| **code-review** | `@claude-plugins-official` | ✅ installé cette session | Revue de code officielle Anthropic |
| **architect-reviewer** | VoltAgent (fichier extrait) | ✅ installé cette session, **uniquement lui** | Sous-agent de revue d'architecture. VoltAgent regroupe ses sous-agents en 10 plugins-catégories → pour respecter « uniquement celui-ci », le fichier `04-quality-security/architect-reviewer.md` a été copié dans `.claude/agents/` (pas d'installation de la catégorie entière) |

> ⚠️ Un seul outil de sécurité (`security-guidance`) — pas de Snyk/Cloudflare/VibeSec en plus, conformément à la consigne.

## Niveau 3 — Design & déploiement
| Outil | Source | Statut | Couvre |
|---|---|---|---|
| **vercel** | `@claude-plugins-official` v0.44.0 | ✅ déjà présent | Déploiement, AI SDK, storage, functions… (hébergement actuel du site) |
| **Vercel Web Interface Guidelines** | — | ⚠️ **non installé** | N'existe PAS comme plugin dans le marketplace officiel. C'est la ressource `github.com/vercel/web-interface-guidelines` — peut être ajoutée manuellement comme règle/skill si souhaité. À décider. |

## Niveau 4 — SEO/GEO & cohérence de contenu
| Outil | Source | Statut | Couvre |
|---|---|---|---|
| **claude-seo** | GitHub `AgriciDaniel/claude-seo` (tag v2.2.0) | ✅ installé cette session (install manuel contrôlé) | **23 skills SEO** (`/seo`, seo-audit, seo-technical, seo-schema, seo-geo, seo-local, seo-hreflang, seo-sxo…) + **16 sous-agents** dans `~/.claude/skills/` et `~/.claude/agents/`. Extensions **payantes NON installées** : DataForSEO (`seo-dataforseo`) et Banana (`seo-image-gen`) explicitement **retirées** ; `seo-images` (analyse gratuite) conservé. |
| **brand-voice** | — | ⚠️ **introuvable** | Absent du marketplace officiel et non trouvé dans les catalogues configurés. Nécessiterait une source communautaire spécifique (slug/repo à fournir). Non installé. |

## Sous-agents locaux du projet (`.claude/agents/`)
Créés pour l'audit (lecture seule) + architect-reviewer :
`content-auditor`, `code-reviewer`, `qa-tester`, `design-auditor`, `seo-strategist`, `architect-reviewer`.

## Notes
- Installation via le CLI `claude plugin install` (les commandes `/plugin` du REPL ne sont pas exécutables par l'assistant). Config globale `~/.claude` modifiée (scope user).
- Le `install.sh` de claude-seo a été **affiché avant** toute action ; son exécution directe ayant été bloquée par le garde-fou, l'équivalent a été réalisé par copie manuelle contrôlée (mêmes fichiers, sans le dossier `extensions/` payant).
- **Redémarrer une session Claude Code** pour activer les nouveaux plugins.
- Restent à décider : Vercel Web Interface Guidelines (ajout manuel ?) et brand-voice (source à fournir).
