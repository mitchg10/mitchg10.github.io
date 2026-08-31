require "nokogiri"

SITE_DIR = File.expand_path("../../_site", __FILE__)

RSpec.configure do |config|
  config.before(:suite) do
    unless Dir.exist?(SITE_DIR)
      raise "Site not built. Run: bundle exec jekyll build --config _config.yml,_config.dev.yml"
    end
  end
end

def site_file(relative_path)
  File.join(SITE_DIR, relative_path)
end

def read_site_file(relative_path)
  File.read(site_file(relative_path))
end

def parsed_site_page(relative_path)
  Nokogiri::HTML(read_site_file(relative_path))
end

def visible_text_length(relative_path)
  parsed_site_page(relative_path).text.gsub(/\s+/, " ").strip.length
end
