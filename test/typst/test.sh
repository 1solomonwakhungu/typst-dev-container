#!/bin/bash
cd $(dirname "$0")
source test-utils.sh

# Template specific tests
check "distro" test -r /etc/os-release
check "git" git --version
check "curl" curl --version

# Typst specific tests
check "typst help" typst help
check "typst help watch" typst help watch
check "typst compile" bash -c '
  tmpdir=$(mktemp -d)
  trap "rm -rf \"$tmpdir\"" EXIT
  printf "= Hello\n\nCompiled from test.\n" > "$tmpdir/hello.typ"
  typst compile "$tmpdir/hello.typ" "$tmpdir/hello.pdf"
  test -s "$tmpdir/hello.pdf"
'

# Pandoc specific tests
check "pandoc help" pandoc --version
check "pandoc markdown to pdf via typst" bash -c '
  tmpdir=$(mktemp -d)
  trap "rm -rf \"$tmpdir\"" EXIT
  printf "# Hello\n\nConverted with Pandoc and Typst.\n" > "$tmpdir/hello.md"
  pandoc "$tmpdir/hello.md" --pdf-engine=typst -o "$tmpdir/hello.pdf"
  test -s "$tmpdir/hello.pdf"
'

# Report result
reportResults
