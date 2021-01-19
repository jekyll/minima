#!/usr/bin/env bash
# Copy logos from SimpleIcons repos to this project.
#
# It would be possible to use a submodule instead of cloning an ignored directory.
# But it would not be to useful, as it is only used for local use and not for the distributed
# logos which are added to version control manually.
set -e

# Comments include the name on shields.io in case you use logo field there.
LOGOS=(
  ansible
  c
  circleci
  css3
  dart
  deno
  docker
  eslint
  git
  github
  githubactions
  gnubash # gnu-bash
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
  node-dot-js # node.js
  npm
  php
  postgresql
  python
  react
  ruby
  sqlite
  terraform
  typescript
  visualstudiocode
  vue-dot-js # vue.js
  yarn
)

if [[ -d 'simple-icons' ]]; then
  cd simple-icons
  git pull
  cd ..
else
  git clone --depth 1 --single-branch -q \
    git@github.com:simple-icons/simple-icons.git
fi

echo '------'

for LOGO in ${LOGOS[@]}; do
  echo $LOGO
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
