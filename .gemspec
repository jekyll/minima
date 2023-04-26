Gem::Specification.new do |s|
  s.name          = "luxu0812_pages"
  s.version       = "0.1.0"
  s.authors       = ["Xu Lu"]
  s.email         = ["zh.luxu1986@gmail.com"]

  s.homepage      = "https://github.com/luxu0812/pages_theme"
  s.summary       = "Xu Lu's theme for GitHub Pages"
  s.description   = "Xu Lu's theme designed for GitHub Pages sites"
  s.license       = "MIT"

  s.files         = `git ls-files`.split("\n")
  s.files.reject! { |f| f.match(%r{^(test|spec|features)/}) }
  s.require_paths = ["lib"]

  s.add_runtime_dependency "jekyll", "~> 3.9"
  s.add_development_dependency "bundler", "~> 2.1"
  s.add_development_dependency "rake", "~> 13.0"
end

