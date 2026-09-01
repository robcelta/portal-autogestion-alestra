require "active_support/core_ext/integer/time"

Rails.application.configure do
  config.enable_reloading = false
  config.eager_load = true
  config.consider_all_requests_local = false
  config.hosts.clear
  config.action_controller.allow_forgery_protection = false

  config.assets.compile = true

  config.active_support.deprecation = :notify
  config.active_support.disallowed_deprecation = :log
  config.active_support.disallowed_deprecation_warnings = []

  config.log_level = :info
  config.log_tags = [:request_id]

  config.action_mailer.perform_caching = false

  config.active_record.migration_error = false
end
