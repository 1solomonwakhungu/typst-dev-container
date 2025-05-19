#!/bin/bash
cd $(dirname "$0")
source test-utils.sh

# Template specific tests
check "distro" lsb_release -c

# Typst specific tests
check "typst help" typst help
check "typst help watch" typst help watch

# Pandoc specific tests
check "pandoc help" pandoc --version

# Report result
reportResults
