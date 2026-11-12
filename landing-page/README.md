# Landing page

The site at <https://typst-dev-container.vercel.app>. React, Vite and GitHub's
Primer Brand design system (`@primer/react-brand`), built to static files.

```bash
npm install
npm run dev
```

`npm run build` writes the static site to `dist/`.

The Typst, Pandoc and Rust versions on the page are not typed in here. At build
time `vite.config.ts` reads them from `../images/typst/docker-bake.hcl` and the
template version from `../src/typst/devcontainer-template.json`, and the build
fails if it cannot. A toolchain update on `main` therefore updates the page on
the next deploy.

Vercel builds this folder (project root directory `landing-page`) on every push
to `main`. Nothing here is part of the container image or the template.
