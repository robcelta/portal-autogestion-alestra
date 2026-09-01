# frozen_string_literal: true

module AlestraRailsUi
  class Engine < ::Rails::Engine
    isolate_namespace AlestraRailsUi

    config.autoload_paths += %W[#{config.root}/lib]

    initializer "alestra_rails_ui.assets" do |app|
      app.config.assets.paths << root.join("app/assets/builds").to_s if root.join("app/assets/builds").exist?
      if app.config.assets.respond_to?(:precompile)
        controllers = Dir[root.join("app/javascript/controllers/alestra/*_controller.js")].map do |path|
          "controllers/alestra/#{File.basename(path)}"
        end
        app.config.assets.precompile += controllers
      end
    end

    initializer "alestra_rails_ui.importmap", before: "importmap" do |app|
      next unless app.config.respond_to?(:importmap)

      app.config.importmap.paths << root.join("config/importmap.rb")
    end

    initializer "alestra_rails_ui.helpers" do
      ActiveSupport.on_load(:action_controller_base) do
        helper AlestraRailsUi::IconHelper
        helper AlestraRailsUi::NavHelper
        helper Importmap::ImportmapTagsHelper if defined?(Importmap::ImportmapTagsHelper)
      end
    end

    rake_tasks do
      load root.join("lib/tasks/alestra_rails_ui_tasks.rake")
    end
  end
end
