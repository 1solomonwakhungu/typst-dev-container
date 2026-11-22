ARG RUST_VERSION=1.100.0
ARG DEBIAN_VERSION=trixie-slim

FROM debian:${DEBIAN_VERSION} AS binaries

ARG TYPST_VERSION
ARG PANDOC_VERSION
ARG TARGETARCH

RUN apt-get update && apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
        xz-utils \
    && rm -rf /var/lib/apt/lists/* \
    && mkdir -p /out \
    && case "${TARGETARCH}" in \
        amd64) TYPST_ARCH=x86_64 ;; \
        arm64) TYPST_ARCH=aarch64 ;; \
        *) echo "Unsupported architecture: ${TARGETARCH}" >&2; exit 1 ;; \
    esac \
    && curl --fail --location --show-error \
        "https://github.com/typst/typst/releases/download/v${TYPST_VERSION}/typst-${TYPST_ARCH}-unknown-linux-musl.tar.xz" \
        | tar xJ --strip-components=1 -C /out "typst-${TYPST_ARCH}-unknown-linux-musl/typst" \
    && curl --fail --location --show-error \
        "https://github.com/jgm/pandoc/releases/download/${PANDOC_VERSION}/pandoc-${PANDOC_VERSION}-linux-${TARGETARCH}.tar.gz" \
        | tar xz \
    && cp -r "pandoc-${PANDOC_VERSION}/bin/"* /out/ \
    && rm -rf "pandoc-${PANDOC_VERSION}"

FROM rust:${RUST_VERSION} AS rust

COPY --from=binaries /out/ /usr/local/bin/

WORKDIR /workspace

FROM debian:${DEBIAN_VERSION} AS slim

RUN apt-get update && apt-get install -y --no-install-recommends \
        ca-certificates \
        curl \
        git \
    && rm -rf /var/lib/apt/lists/*

COPY --from=binaries /out/ /usr/local/bin/

WORKDIR /workspace
