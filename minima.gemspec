# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = 'minima-jamesalfei-jamesalfei'
  spec.version       = '1.0.0'
  spec.authors       = ['James Alfei']
  spec.email         = ['jamesalfei@gmail.com']

  spec.summary       = 'Customised minima-jamesalfei theme for https://www.jamesalfei.co.uk'
  spec.homepage      = 'https://github.com/jamesalfei/minima-jamesalfei'
  spec.license       = 'MIT'

  spec.metadata['plugin_type'] = 'theme'

  spec.files = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r{^(assets|_(includes|layouts|sass)/|(LICENSE|README)(\.(txt|md|markdown)|$))}i)
  end

  spec.add_runtime_dependency 'jekyll', '>= 3.5', '< 5.0'
  spec.add_runtime_dependency 'jekyll-feed', '~> 0.9'
  spec.add_runtime_dependency 'jekyll-seo-tag', '~> 2.1'

  spec.add_development_dependency 'bundler'
end
