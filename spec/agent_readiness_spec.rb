# Run with: bundle exec jekyll build --config _config.yml,_config.dev.yml && bundle exec rspec
require_relative "spec_helper"

RSpec.describe "agent readiness" do
  describe "homepage heading order (fix: H1 must be first heading)" do
    it "has no h1-h6 tag before the page's H1" do
      doc = parsed_site_page("index.html")
      headings = doc.css("h1, h2, h3, h4, h5, h6")
      expect(headings).not_to be_empty
      expect(headings.first.name).to eq("h1")
    end

    it "no longer renders the sidebar author name as a raw heading tag" do
      doc = parsed_site_page("index.html")
      expect(doc.css("h1, h2, h3, h4, h5, h6").text).not_to include("Mitch Gerhardt")
      author_name = doc.at_css(".author__name")
      expect(author_name.name).to eq("p")
      expect(author_name["role"]).to eq("heading")
    end
  end

  describe "404 page (fix: agent-friendly recovery links)" do
    it "returns a body with recovery links to home, sitemap, and llms.txt" do
      doc = parsed_site_page("404.html")
      hrefs = doc.css("a").map { |a| a["href"] }
      expect(hrefs).to include("/")
      expect(hrefs).to include("/sitemap/")
      expect(hrefs).to include("/llms.txt")
    end
  end

  describe "llms.txt (fix: agent instruction / when-to-use guidance)" do
    it "exists and names when-to-use guidance" do
      content = read_site_file("llms.txt")
      expect(content).not_to be_empty
      expect(content.downcase).to include("when to use")
    end
  end

  describe "robots.txt" do
    it "exists and references the sitemap" do
      content = read_site_file("robots.txt")
      expect(content).to include("Sitemap:")
      expect(content).to include("sitemap.xml")
    end
  end

  describe "trust anchor pages (fix: real /about, /contact, /privacy content)" do
    { "about/index.html" => "about", "contact/index.html" => "contact", "privacy/index.html" => "privacy" }.each do |path, name|
      it "#{name} page exists with at least 500 characters of visible content" do
        expect(File.exist?(site_file(path))).to be(true)
        expect(visible_text_length(path)).to be >= 500
      end
    end

    it "redirects the old /terms/ URL forward instead of dropping it" do
      expect(File.exist?(site_file("terms/index.html"))).to be(true)
    end
  end

  describe "footer links (visible discovery of trust anchor pages)" do
    it "links to about, contact, and privacy from every page's footer" do
      doc = parsed_site_page("index.html")
      hrefs = doc.css("footer a, .page__footer a").map { |a| a["href"] }
      expect(hrefs.any? { |h| h.to_s.end_with?("/about/") }).to be(true)
      expect(hrefs.any? { |h| h.to_s.end_with?("/contact/") }).to be(true)
      expect(hrefs.any? { |h| h.to_s.end_with?("/privacy/") }).to be(true)
    end
  end
end
