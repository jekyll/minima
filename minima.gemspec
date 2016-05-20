# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "minima"
  spec.version       = "0.1.0"
  spec.authors       = ["Parker Moore"]
  spec.email         = ["parkrmoore@gmail.com"]

  spec.summary       = %q{TODO: Write a short summary, because Rubygems requires one.}
  spec.homepage      = "TODO: Put your gem's website or public repo URL here."
  spec.license       = "MIT"

  spec.metadata["plugin_type"] = "theme"

  spec.files         = `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(exe|_layouts|_includes|_sass|example|example/_posts)/}) }
  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }

  spec.add_development_dependency "jekyll", "~> 3.1"
  spec.add_development_dependency "bundler", "~> 1.12"
  spec.add_development_dependency "rake", "~> 10.0"
end
