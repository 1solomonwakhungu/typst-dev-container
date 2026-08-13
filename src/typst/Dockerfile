ARG RUST_VERSION=1.97.1

FROM rust:${RUST_VERSION}

ARG TYPST_VERSION
ARG PANDOC_VERSION
ARG TARGETARCH

RUN apt-get update && apt-get install -y curl xz-utils && \
    case "${TARGETARCH}" in \
        amd64) TYPST_ARCH=x86_64 ;; \
        arm64) TYPST_ARCH=aarch64 ;; \
        *) echo "Unsupported architecture: ${TARGETARCH}" >&2; exit 1 ;; \
    esac && \
    curl --fail --location --show-error \
    https://github.com/typst/typst/releases/download/v${TYPST_VERSION}/typst-${TYPST_ARCH}-unknown-linux-musl.tar.xz \
    | tar xJ --strip-components=1 -C /usr/local/bin typst-${TYPST_ARCH}-unknown-linux-musl/typst && \
    curl --fail --location --show-error \
    https://github.com/jgm/pandoc/releases/download/${PANDOC_VERSION}/pandoc-${PANDOC_VERSION}-linux-${TARGETARCH}.tar.gz \
    | tar xz && \
    cp -r pandoc-${PANDOC_VERSION}/bin/* /usr/local/bin/ && \
    rm -rf pandoc-${PANDOC_VERSION}

WORKDIR /workspace
