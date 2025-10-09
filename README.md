

#### Skins

Minima 3.0 supports defining and switching between multiple color-palettes (or *skins*).

```
.
├── minima.scss
└── minima
    └── _syntax-highlighting.scss
```


A skin is a Sass file placed in the directory `_sass/minima/skins` and it defines the variable defaults related to the "color"
aspect of the theme. It also embeds the Sass rules related to syntax-highlighting since that is primarily related to color and
has to be adjusted in harmony with the current skin.

The default color palette for Minima is defined within `_sass/minima/skins/classic.scss`. To switch to another available skin,
simply declare it in the site's config file. For example, to activate `_sass/minima/skins/dark.scss` as the skin, the setting
would be:

```yaml
minima:
  skin: dark
```

As part of the migration to support skins, some existing Sass variables have been retired and some **have been redefined** as
summarized in the following table:

Minima 2.0      | Minima 3.0
--------------- | ----------
`$brand-color`  | `$link-base-color`
`$grey-*`       | `$brand-*`
`$orange-color` | *has been removed*

##### Available skins

Skin setting    | Description
--------------- | -----------
classic         | Default, light color scheme.
dark            | Dark variant of the classic skin.
auto            | *Adaptive skin* based on the default classic and dark skins.
solarized       | *Adaptive skin* for [solarized](https://github.com/solarized) color scheme skins.
solarized-light | Light variant of solarized color scheme.
solarized-dark  | Dark variant of solarized color scheme.

*:bulb: Adaptive skins switch between the "light" and "dark" variants based on the user's operating system setting or browser setting
(via CSS Media Query [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)).*

### Customize navigation links

This allows you to set which pages you want to appear in the navigation area and configure order of the links.

For instance, to only link to the `about` and the `portfolio` page, add the following to your `_config.yml`:

```yaml
minima:
  nav_pages:
    - about.md
    - portfolio.md
```
> [!WARNING]
> Please note that **`site.header_pages`** is **`site.minima.nav_pages`** in Minima 3.0


### Change default date format

You can change the default date format by specifying `site.minima.date_format`
in `_config.yml`.

```
# Minima date format
# refer to http://shopify.github.io/liquid/filters/date/ if you want to customize this
minima:
  date_format: "%b %-d, %Y"
```


### Extending the `<head />`

You can *add* custom metadata to the `<head />` of your layouts by creating a file `_includes/custom-head.html` in your source directory. For example, to add favicons:

1. Head over to [https://realfavicongenerator.net/](https://realfavicongenerator.net/) to add your own favicons.
2. [Customize](#customization) default `_includes/custom-head.html` in your source directory and insert the given code snippet.


### Enabling comments (via Disqus)

Optionally, if you have a Disqus account, you can render a comments section below each post with the following configuration:

```yaml
url: "https://my_domain.com"
disqus:
  shortname: my_disqus_shortname
```

You can find out more about Disqus' shortnames [here](https://help.disqus.com/installation/whats-a-shortname).

Comments are enabled by default and will only appear in production, i.e., `JEKYLL_ENV=production`

If you don't want to display comments for a particular post you can disable them by adding `comments: false` to that
post's YAML Front Matter.

### Author Metadata

From `Minima-3.0` onwards, `site.author` is expected to be a mapping of attributes instead of a simple scalar value:

```yaml
author:
  name: John Smith
  email: "john.smith@foobar.com"
```

To migrate existing metadata, update your config file and any reference to the object in your layouts and includes as summarized below:

Minima 2.x    | Minima 3.0
------------- | -------------------
`site.author` | `site.author.name`
`site.email`  | `site.author.email`


### Social networks

You can add links to the accounts you have on other sites, with respective icon as an SVG graphic, via the config file.
From `Minima-3.0` onwards, the social media data is sourced from config key `minima.social_links`. It is a list of key-value pairs, each entry
corresponding to a link rendered in the footer. For example, to render links to Jekyll GitHub repository and Twitter account (now X), one
should have:

```yaml
minima:
  social_links:
    - title: Jekyll repository at GitHub
      icon: github
      url: "https://github.com/jekyll/jekyll"
    - title: Jekyll at X (formerly Twitter)
      icon: x-twitter
      url: "https://x.com/jekyllrb"
```

where `title` corresponds to the link-title displayed when a visitor hovers mouse-pointer over url / icon and
`icon` refers to the Font Awesome icon id. e.g. `github` corresponds to `fa-github`.

Social platform icons are rendered using the latest version of Font Awesome Free webfonts sourced via remote CDN.
The full list of available social icons can be found at https://fontawesome.com/search?ic=brands

> [!NOTE]
> The link to your site's main syndication feed is always rendered as the last item of the social-links list.<br />
> You may opt to not have this link rendered at all by setting config **`minima.hide_site_feed_link`** to `true`:
> ```yaml
> minima:
>   hide_site_feed_link: true  # `false` or `null` by default
> ```

### Enabling Google Analytics

To enable Google Analytics, add the following lines to your Jekyll site:

```yaml
google_analytics: G-NNNNNNNNNN  // The former `UA-NNNNNNNN-N` format is no longer supported by Google
```

Google Analytics will only appear in production, i.e., `JEKYLL_ENV=production`.

### Enabling Excerpts on the Home Page

To display post-excerpts on the Home Page, simply set `show_excerpts` under top-level key `minima` to `true` in your
`_config.yml`:

```yaml
minima:
  show_excerpts: true
```


## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/jekyll/minima. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## Development

To set up your environment to develop this theme, run `script/bootstrap`.

To test your theme, run `script/server` (or `bundle exec jekyll serve`) and open your browser at `http://localhost:4000`. This starts a Jekyll server using your theme and the contents. As you make modifications, your site will regenerate and you should see the changes in the browser after a refresh.

## License

The theme is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

# 💫About Me :
I’m studying at HUTECH University 

## 🌐Socials
[![Behance](https://img.shields.io/badge/Behance-1769ff?logo=behance&logoColor=white)](https://behance.net/Đạt) [![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?logo=YouTube&logoColor=white)](https://youtube.com/c/Quocdat) 

# 💻Tech Stack
![C++](https://img.shields.io/badge/c++-%2300599C.svg?style=for-the-badge&logo=c%2B%2B&logoColor=white) ![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=java&logoColor=white) ![Google Cloud](https://img.shields.io/badge/Google%20Cloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white) ![.Net](https://img.shields.io/badge/.NET-5C2D91?style=for-the-badge&logo=.net&logoColor=white) ![Insomnia](https://img.shields.io/badge/Insomnia-black?style=for-the-badge&logo=insomnia&logoColor=5849BE) ![Apache](https://img.shields.io/badge/apache-%23D42029.svg?style=for-the-badge&logo=apache&logoColor=white) ![MicrosoftSQLServer](https://img.shields.io/badge/Microsoft%20SQL%20Sever-CC2927?style=for-the-badge&logo=microsoft%20sql%20server&logoColor=white) ![Canva](https://img.shields.io/badge/Canva-%2300C4CC.svg?style=for-the-badge&logo=Canva&logoColor=white) ![PyTorch](https://img.shields.io/badge/PyTorch-%23EE4C2C.svg?style=for-the-badge&logo=PyTorch&logoColor=white)
# 📊GitHub Stats :
![](https://github-readme-stats.vercel.app/api?username=Q đạt&theme=radical&hide_border=false&include_all_commits=false&count_private=false)<br/>
![](https://github-readme-streak-stats.herokuapp.com/?user=Q đạt&theme=radical&hide_border=false)<br/>
![](https://github-readme-stats.vercel.app/api/top-langs/?username=Q đạt&theme=radical&hide_border=false&include_all_commits=false&count_private=false&layout=compact)

## 🏆GitHub Trophies
![](https://github-trophies.vercel.app/?username=Q đạt&theme=radical&no-frame=false&no-bg=false&margin-w=4)

### ✍️Random Dev Quote
![](https://quotes-github-readme.vercel.app/api?type=vetical&theme=radical)

### 😂Random Dev Meme
<img src="https://random-memer.herokuapp.com/" width="512px"/>

---
[![](https://visitcount.itsvg.in/api?id=Q đạt&icon=0&color=0)](https://visitcount.itsvg.in)
