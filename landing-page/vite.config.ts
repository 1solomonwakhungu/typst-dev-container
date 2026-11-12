import fs from 'node:fs'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const repoRoot = path.resolve(import.meta.dirname, '..')

// The page shows the versions the image is actually built with, read from the
// same files the image build and the template release use. A push that changes
// them redeploys the site, so the page cannot drift from the published tags.
function readToolchain() {
  const bake = fs.readFileSync(path.join(repoRoot, 'images/typst/docker-bake.hcl'), 'utf8')
  const latest = bake.match(/variable\s+"LATEST"[\s\S]*?default\s*=\s*"([^"]+)"/)?.[1]
  const rows = [
    ...bake.matchAll(/\{\s*typst\s*=\s*"([^"]+)",\s*rust\s*=\s*"([^"]+)",\s*pandoc\s*=\s*"([^"]+)"\s*\}/g),
  ].map(([, typst, rust, pandoc]) => ({ typst, rust, pandoc }))
  if (!latest || rows.length === 0 || !rows.some((row) => row.typst === latest)) {
    throw new Error('Could not read the version matrix from images/typst/docker-bake.hcl')
  }

  const template = JSON.parse(
    fs.readFileSync(path.join(repoRoot, 'src/typst/devcontainer-template.json'), 'utf8'),
  )
  if (typeof template.version !== 'string') {
    throw new Error('Could not read the template version from src/typst/devcontainer-template.json')
  }

  return { latest, rows, templateVersion: template.version as string }
}

export default defineConfig({
  plugins: [react()],
  define: {
    __TOOLCHAIN__: JSON.stringify(readToolchain()),
  },
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, './src') },
  },
})
