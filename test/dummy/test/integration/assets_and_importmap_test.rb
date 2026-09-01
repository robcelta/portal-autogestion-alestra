# frozen_string_literal: true

require "test_helper"

class AssetsAndImportmapTest < ActiveSupport::TestCase
  CONTROLLERS = %w[
    accordion dropdown filter modal notification notification_center password_visibility selection sidebar tabs tooltip ui
  ].freeze

  test "ships every registered Stimulus controller" do
    root = AlestraRailsUi::Engine.root.join("app/javascript/controllers/alestra")

    CONTROLLERS.each do |name|
      assert root.join("#{name}_controller.js").exist?, "Missing #{name} Stimulus controller"
    end
  end

  test "ships the core CSS entry points" do
    root = AlestraRailsUi::Engine.root.join("app/assets/stylesheets/alestra_rails_ui")

    %w[tokens.css components.css print.css].each do |asset|
      assert root.join(asset).exist?, "Missing #{asset}"
    end
  end

  test "pins engine controllers through importmap" do
    importmap = AlestraRailsUi::Engine.root.join("config/importmap.rb").read

    assert_includes importmap, "pin_all_from"
    assert_includes importmap, "app/javascript/controllers"
  end

  test "compiled CSS includes every component source" do
    root = AlestraRailsUi::Engine.root.join("app/assets/stylesheets/alestra_rails_ui")
    compiled = root.join("components.css").read

    Dir[root.join("components/*.css")].each do |source|
      assert_includes compiled, "─── #{File.basename(source, ".css")}", "components.css is missing #{source}"
    end
  end
end
