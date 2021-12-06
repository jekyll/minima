#!/usr/bin/env bash
# Copy logos from SimpleIcons repos to this project.
#
# This is only meant to be rrun locally.
#
# This clones the SimpleIcons repo as an ignored directory and copies desired SVG files into this
# theme, so they can be commited.
#
# It would be possible to use a submodule instead. But it would not be useful, as we do not care
# about locking to repo commit or including the directory in our repo theme.
set -e

# Name is stored in the original repo and this repo. The notes include the name
# on shields.io, in case you use logo field there.
LOGOS=(
  amazonaws
  ansible
  c
  circleci
  css3
  dart
  d3dotjs
  deno
  docker
  eslint
  git
  github
  githubactions # github-actions
  gnubash       # gnu-bash
  go
  graphql
  html5
  hugo
  java
  javascript
  jekyll
  kubernetes
  markdown
  mysql
  netlify
  nginx
  nodedotjs # node.js
  npm
  php
  postgresql
  python
  react
  rust
  ruby
  sqlite
  terraform
  typescript
  visualstudiocode
  wikipedia
  vuedotjs # vue.js
  yarn
)

if [[ -d 'simple-icons' ]]; then
  (cd simple-icons && git pull -q)
else
  git clone \
    --depth 1 \
    --single-branch \
    -q \
    git@github.com:simple-icons/simple-icons.git
fi

echo '------'

for LOGO in ${LOGOS[@]}; do
  echo "$LOGO"
  cp "simple-icons/icons/$LOGO.svg" _includes/logos

  sed -i '' \
    's/path/path fill="currentColor"/g' \
    "_includes/logos/$LOGO.svg"
done

echo '------'

echo 'Logos directory changes:'
git status --short _includes/logos

echo
echo 'If there were changes, you should commit them'
