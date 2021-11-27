# Deploy
> Configurie GitHub Pages environment and CI

## Enable GH Pages

Go to _Settings_ on your repo then _GitHub Pages_.

For Jekyll 3 and standard GH Pages, select `master` and repo root.

For Jekyll 4 and GH Pages with GH Actions, select `gh-pages`.

Push to GitHub and your site will build.


## Configure GH Actions

This is necessary if you want to use Jekyll 4. Set up GitHub Actions with a custom environment to build and deploy your site to a `gh-pages` branch.

See [main.yml](https://github.com/MichaelCurrin/dev-cheatsheets/blob/master/.github/workflows/main.yml) in Dev Cheatsheets. 

Copy this file to your repo as the same path - `.github/workflows/main.yml`.
