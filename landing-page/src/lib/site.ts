export const REPO = '1solomonwakhungu/typst-dev-container'
export const REPO_URL = `https://github.com/${REPO}`
export const CLONE_URL = `${REPO_URL}.git`
export const CODESPACES_URL = `https://codespaces.new/${REPO}`
export const IMAGE = 'ghcr.io/1solomonwakhungu/typst-dev-container/typst'
export const TEMPLATE_ID = 'ghcr.io/1solomonwakhungu/typst-dev-container/templates/typst'
export const AUTHOR_URL = 'https://github.com/1solomonwakhungu'

export const toolchain = __TOOLCHAIN__
export const latestRow = toolchain.rows.find((row) => row.typst === toolchain.latest)!
