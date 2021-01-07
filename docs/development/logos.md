# Logos
> How to add to or update logos in the project.

The SVG icons or logos are stored in the [\_includes/logos](/_includes/logos/) directory as includes files. This is easier to manage than assets as it allows the content of the file to be inserted inline in HTML, rather than referencing a path to an asset which has to be fetched on the frontend.

You could use the You can use the includes files in your project directly. But the intention is to set `logo: vue-dot-js` for example on a page, then this theme will find the appropriate includes file and use it. It will give an error a file is missing or referenced incorrectly, so you can find out at build time if you need to change your logo parameter or need to add a new logo file to this theme so you can use it.

## How to update logos

The list of supported logos in this project is maintained in [bin/install_logos.sh](/bin/install_logos.sh). More logos are available, but that covers the logos that I want to use. The names of the logos are kept as they are on the SimpleIcons site. e.g. `vue-dot-js` or `gnu-bash`.

You can add a new logo name to that script. Then run it.

Here is the shorthand:

```sh
$ make logos
```

That will also _update_ an existing logos in version control to match the latest content in the logo provider.

Then commit any changes and push your commits. When you rebuild a site that uses this theme, you'll get the updates.

If you want to add a new logo from the SimpleIcons repo, add the name to the `LOGOS` variable in the script in [bin](/bin/). Then run the command above.
