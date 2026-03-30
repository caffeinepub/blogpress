# BlogPress

## Current State
New project — no existing application files.

## Requested Changes (Diff)

### Add
- Full blog platform with posts, categories, authors, and tags
- Backend: Motoko actor storing blog posts with title, excerpt, content, category, author, date, image URL, tags
- AJAX search: live search by keyword, filterable by category, sortable by newest/oldest/popular
- Pagination: backend-driven page offset + limit
- Category filter sidebar widget
- Recent posts sidebar widget
- Tags cloud sidebar widget
- Bootstrap 5-styled frontend (CDN) with teal accent theme
- Hero section on homepage
- Post cards grid (3-col) with thumbnail, category badge, title, excerpt, author, date, comment count
- Full navbar with logo, nav links, search input, subscribe button
- Footer with columns, social icons, copyright

### Modify
- N/A (new project)

### Remove
- N/A

## Implementation Plan
1. Generate Motoko backend with post/category/tag data structures, CRUD queries, search with keyword + category filter, pagination, sorting
2. Seed sample blog posts across multiple categories
3. Build React frontend with Bootstrap 5 CDN, matching the design preview layout
4. Wire AJAX search with debounce, category filter, sort order controls, and pagination
