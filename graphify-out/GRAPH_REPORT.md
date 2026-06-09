# Graph Report - .  (2026-06-08)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 251 nodes · 409 edges · 19 communities (16 shown, 3 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.78)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e4616542`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]

## God Nodes (most connected - your core abstractions)
1. `getPayloadClient()` - 20 edges
2. `compilerOptions` - 16 edges
3. `Panel()` - 10 edges
4. `isEditorOrAbove()` - 10 edges
5. `Tag()` - 9 edges
6. `getPublishedArticles()` - 8 edges
7. `getActiveAdPlacements()` - 8 edges
8. `deploy.sh script` - 7 edges
9. `HomePage()` - 6 edges
10. `getUpcomingEvents()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `Next.js Logo SVG` --conceptually_related_to--> `Next.js Framework`  [INFERRED]
  public/next.svg → README.md
- `Vercel Logo SVG` --conceptually_related_to--> `Vercel Deployment Platform`  [INFERRED]
  public/vercel.svg → README.md
- `Next.js Agent Rules` --references--> `Next.js Framework`  [EXTRACTED]
  AGENTS.md → README.md
- `Claude Project Instructions` --references--> `Next.js Agent Rules`  [EXTRACTED]
  CLAUDE.md → AGENTS.md
- `File Icon SVG` --semantically_similar_to--> `Globe Icon SVG`  [INFERRED] [semantically similar]
  public/file.svg → public/globe.svg

## Import Cycles
- None detected.

## Communities (19 total, 3 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.09
Nodes (30): extractChildren(), extractTextFromRichText(), POST(), EventsPage(), metadata, getPayloadClient(), getActiveAdPlacements(), getArticlesByAuthor() (+22 more)

### Community 1 - "Community 1"
Cohesion: 0.10
Nodes (21): canReadOwnOrEditorial(), isAdmin(), isAdminOrSelf(), isEditorOrAbove(), isLoggedIn(), isPublishedOrEditorOrAbove(), Role, AdPlacements (+13 more)

### Community 2 - "Community 2"
Cohesion: 0.09
Nodes (19): AdsPage(), inventorySlots, metadata, metadata, getAdRevenueSummary(), STATUS_LABELS, STATUS_TONES, timeAgo() (+11 more)

### Community 3 - "Community 3"
Cohesion: 0.08
Nodes (23): dependencies, bcryptjs, date-fns, lucide-react, next, payload, @payloadcms/db-postgres, @payloadcms/db-sqlite (+15 more)

### Community 4 - "Community 4"
Cohesion: 0.10
Nodes (20): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+12 more)

### Community 5 - "Community 5"
Cohesion: 0.22
Nodes (4): importMap, Args, metadata, Args

### Community 6 - "Community 6"
Cohesion: 0.18
Nodes (10): devDependencies, eslint, ssh2, tailwindcss, @tailwindcss/postcss, @types/bcryptjs, @types/node, @types/react (+2 more)

### Community 7 - "Community 7"
Cohesion: 0.29
Nodes (6): getArticleBySlug(), formatDateTime(), AdSlot(), ArticlePage(), generateMetadata(), Props

### Community 8 - "Community 8"
Cohesion: 0.25
Nodes (9): Next.js Agent Rules, Claude Project Instructions, create-next-app CLI, Geist Font Family, Next.js Logo SVG, Next.js Framework, Independence Sentinel Next.js Project README, Vercel Deployment Platform (+1 more)

### Community 9 - "Community 9"
Cohesion: 0.46
Nodes (7): deploy.sh script, build_app(), setup_env(), setup_postgres(), setup_repo(), show_nginx_config(), start_app()

### Community 10 - "Community 10"
Cohesion: 0.32
Nodes (4): SECTIONS, Footer(), footerLinks, Masthead()

### Community 11 - "Community 11"
Cohesion: 0.29
Nodes (6): DELETE, GET, OPTIONS, PATCH, POST, PUT

### Community 12 - "Community 12"
Cohesion: 0.50
Nodes (4): CATEGORY_LABELS, DirectoryPage(), metadata, getDirectoryListings()

### Community 15 - "Community 15"
Cohesion: 1.00
Nodes (3): File Icon SVG, Globe Icon SVG, Window Icon SVG

## Knowledge Gaps
- **89 isolated node(s):** `name`, `version`, `private`, `dev`, `build` (+84 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `getPayloadClient()` connect `Community 0` to `Community 2`, `Community 12`, `Community 7`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **Why does `Panel()` connect `Community 2` to `Community 7`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `Tag()` connect `Community 2` to `Community 0`, `Community 12`, `Community 7`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _89 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.09408033826638477 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.10384615384615385 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.09246088193456614 - nodes in this community are weakly interconnected._