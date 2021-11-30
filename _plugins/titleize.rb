# as seen in; https://jekyllfieldguide.com/plugins/titleise-gem-example/

require 'titleize'

module Jekyll
  module Titleize
    def titleize(title)
      title.titleize
    end
  end
end

Liquid::Template.register_filter(Jekyll::Titleize)