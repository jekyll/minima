# DigiMic platform website

This repository owns the DigiMic organisation website and the platform landing
page for [digimic.org](https://digimic.org). It is the gateway to the DigiMic
packages, documentation, research workflows, and training materials; package
documentation remains owned and built by each package repository.

## Local development

Ruby 3.3 is used in CI.

```bash
bundle install
bundle exec jekyll serve
```

Run the production-equivalent build before opening a pull request:

```bash
JEKYLL_ENV=production bundle exec jekyll build --trace
```

## Deployment

Pushes to `master` build and deploy through GitHub Actions. Pull requests run
the same Jekyll build without deploying.

The custom-domain transfer is an administrative operation:

1. Remove `digimic.org` as the custom domain of the `DigiMicPy` Pages site.
2. In this repository, set **Settings → Pages → Source** to **GitHub Actions**.
3. Set this repository's Pages custom domain to `digimic.org` and enforce HTTPS.
4. Verify that `digimic.org` serves this gateway and that the package site is
   inherited at `digimic.org/DigiMicPy/`.

GitHub ignores a source-tree `CNAME` when deployment uses a custom Actions
workflow, so the domain must be set in the repository's Pages settings.
