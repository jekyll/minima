Gem::Specification.new do |s|
  s.name          = "luxu0812_pages"
  s.version       = "0.1.0"
  s.authors       = ["Xu Lu"]
  s.email         = ["zh.luxu1986@gmail.com"]

  s.homepage      = "https://github.com/luxu0812/pages_theme"
  s.summary       = "Xu Lu's theme for GitHub Pages"
  s.description   = "Xu Lu's theme designed for GitHub Pages sites"
  s.license       = "MIT"

  s.metadata["plugin_type"] = "theme"

  s.files = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r!^(assets|_(includes|layouts|sass)/|(LICENSE|README)((\.(txt|md|markdown)|$)))!i)
  end
  s.files.reject! { |f| f.match(%r{^(test|spec|features)/}) }

  s.add_runtime_dependency "jekyll", "~> 3.9"
  s.add_runtime_dependency "jekyll-feed", "~> 0.9"
  s.add_runtime_dependency "jekyll-seo-tag", "~> 2.1"
  s.add_development_dependency "bundler", "~> 2.1"
  s.add_development_dependency "rake", "~> 13.0"
  
  s.add_development_dependency "bundler"
end

