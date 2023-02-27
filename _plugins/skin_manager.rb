# frozen_string_literal: true

module MinimaDemo
  class << self
    attr_accessor :available_skins
  end

  Jekyll::Hooks.register :site, :post_read do |site|
    skins_dir = site.in_theme_dir("_sass", "minima", "skins")
    MinimaDemo.available_skins = Dir["#{skins_dir}/*.scss"].map { |i| File.basename(i, ".scss") }
  end

  Jekyll::Hooks.register [:pages, :documents], :pre_render do |doc, payload|
    payload["page"]["available_skins"] = MinimaDemo.available_skins
  end

  class SkinPage < Jekyll::PageWithoutAFile
    def initialize(site, skin_name)
      super(site, site.source, "assets/css", "#{skin_name}.scss")
    end
  end

  class StyleSheetGenerator < Jekyll::Generator
    def generate(site)
      MinimaDemo.available_skins.each do |skin_name|
        site.pages << SkinPage.new(site, skin_name).tap do |page|
          page.data["skin_name"] = skin_name
          page.content = <<~SCSS
            @import
              "minima/skins/{{ page.skin_name }}",
              "minima/initialize";
          SCSS
        end
      end
    end
  end
end
