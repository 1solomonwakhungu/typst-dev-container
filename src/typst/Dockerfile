ARG RUST_VERSION
ARG TYPST_VERSION
ARG PANDOC_VERSION

FROM rust:${RUST_VERSION}

RUN cargo install typst-cli@${TYPST_VERSION}

# Install dependencies and download pandoc
RUN apt-get update && apt-get install -y curl tar && \
    curl -L https://github.com/jgm/pandoc/releases/download/${PANDOC_VERSION}/pandoc-${PANDOC_VERSION}-linux-amd64.tar.gz \
    | tar xz && \
    cp -r pandoc-${PANDOC_VERSION}/bin/* /usr/local/bin/ && \
    rm -rf pandoc-${PANDOC_VERSION}

WORKDIR /workspace
