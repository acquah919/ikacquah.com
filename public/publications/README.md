# Publication files

Place verified publication documents in this folder. Files here are served
from `/publications/<filename>`.

Use short, lowercase, hyphenated names without spaces:

- `mri-only-radiotherapy-planning.pdf`
- `radiation-safety-review.pdf`

Then add or update the matching record in `data/publications.ts` with the
verified title, authors, journal, year, publication type, research areas, and
file details.

For a PDF:

```ts
file: {
  format: "pdf",
  href: "/publications/mri-only-radiotherapy-planning.pdf",
  size: "2.4 MB",
}
```

Add a DOI as the complete `https://doi.org/...` URL when one is available.

`list-of-publications.docx` is a bibliography used to check metadata. It is
not listed on the publications page. Working drafts such as
`phet-edited-4[2][1].docx` should stay out of `data/publications.ts` until they
are a published paper with a journal record.
