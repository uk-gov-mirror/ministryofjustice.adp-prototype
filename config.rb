###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (https://middlemanapp.com/advanced/dynamic_pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

data.cases.each do |c|
  proxy "/claims/#{c.id}.html", '/claim.html', locals: {
    claim: c,
    messages: data.messages.select {|m| m.claim_id == c.id },
    defendants: data.defendants.select {|m| m.claim_id == c.id }
  }
end

###
# Helpers
###

# Methods defined in the helpers block are available in templates
helpers do
  def match_from_collection(local_key, remote_key, collection)
    collection.select {|i| i[remote_key] == local_key }
  end

  def get_full_name(list)
    list.map {|d| "#{d['first_name']} #{d['last_name']}" }
  end

  def get_defendants(case_id)
    defendants = data.defendants.select {|d| d.claim_id == case_id }
    get_full_name(defendants)
  end
end

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload, ignore: [/source\/images\//]
end

# Load Sass paths
govuk_elements_path = File.join(root, 'node_modules/mojular-govuk-elements')
JSON.parse(IO.read("#{govuk_elements_path}/package.json"))['paths']['sass'].each do |p|
  Sass.load_paths << File.expand_path("#{govuk_elements_path}/#{p}")
end

# Copy layouts
`mkdir -p source/layouts && cp #{root}/node_modules/mojular-templates/layouts/erb/* source/layouts`
# Copy images
`mkdir -p source/images && cp #{govuk_elements_path}/assets/images/* source/images`

set :layout, 'adp'

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  # activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end
