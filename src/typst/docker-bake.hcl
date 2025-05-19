
variable "LATEST" {
  type    = string
  default = "0.13.1"
}

group "default" {
  targets = ["typst"]
}

repo     = "https://github.com/1solomonwakhungu/typst-dev-container"
template = "${repo}/tree/main/src/typst"
image    = "ghcr.io/1solomonwakhungu/typst-dev-container/typst"

target "typst" {
  matrix = {
    item = [
      { typst = "0.13.1", rust = "1.87.0", pandoc = "3.7.0.1" },
      { typst = "0.13.0", rust = "1.87.0", pandoc = "3.7" },
      { typst = "0.12.0", rust = "1.87.0", pandoc = "3.7" },
    ]
  }
  name       = "typst-v${replace(item.typst, ".", "-")}"
  context    = "./"
  dockerfile = "Dockerfile"
  platforms  = ["linux/amd64", "linux/arm64"]
  args = {
    RUST_VERSION   = "${item.rust}"
    TYPST_VERSION  = "${item.typst}"
    PANDOC_VERSION = "${item.pandoc}"
  }
  labels = {
    "org.opencontainers.image.source"        = repo
    "org.opencontainers.image.authors"       = "Solomon Wakhungu <1solomonwakhungu@users.noreply.github.com>"
    "org.opencontainers.image.url"           = "${template}"
    "org.opencontainers.image.documentation" = "${template}/README.md"
    "org.opencontainers.image.title"         = "Typst v${item.typst}"
  }
  tags = ["${image}:${item.typst}", LATEST == item.typst ? "${image}:latest" : ""]
}