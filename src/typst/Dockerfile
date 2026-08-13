ARG RUST_VERSION=1.97.1

FROM rust:${RUST_VERSION}

ARG TYPST_VERSION
ARG PANDOC_VERSION
ARG TARGETARCH

RUN cargo install typst-cli --locked --version "=${TYPST_VERSION}"

# Install dependencies and download pandoc
RUN apt-get update && apt-get install -y curl tar && \
    curl --fail --location --show-error \
    https://github.com/jgm/pandoc/releases/download/${PANDOC_VERSION}/pandoc-${PANDOC_VERSION}-linux-${TARGETARCH}.tar.gz \
    | tar xz && \
    cp -r pandoc-${PANDOC_VERSION}/bin/* /usr/local/bin/ && \
    rm -rf pandoc-${PANDOC_VERSION}

WORKDIR /workspace
