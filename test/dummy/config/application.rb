require_relative "boot"

require "rails"
Bundler.require(*Rails.groups)
require "active_model/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_view/railtie"
require "action_mailer/railtie"
require "active_job/railtie"
require "rails/test_unit/railtie"
require "sprockets/railtie"

module Dummy
  class Application < Rails::Application
    config.load_defaults 8.0
    config.active_record.schema_format = :sql

    config.hosts << /.*\.run\.app/
  end
end

require "alestra_rails_ui"
