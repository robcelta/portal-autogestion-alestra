# frozen_string_literal: true

require "test_helper"

class IconHelperTest < ActionView::TestCase
  include AlestraRailsUi::IconHelper

  test "renders an existing icon with escaped attributes" do
    icon = alestra_icon("home", css_class: "portal-icon", aria_label: "Home \" icon")

    assert_includes icon, 'class="portal-icon"'
    assert_includes icon, 'aria_label="Home &quot; icon"'
    refute_match(/\s(width|height)=/, icon)
  end

  test "returns an empty string for an unknown or unsafe icon name" do
    assert_equal "", alestra_icon("missing")
    assert_equal "", alestra_icon("../alestra_logo")
  end

  test "ignores unsafe HTML attribute names" do
    icon = alestra_icon("home", "onload=alert(1)": "bad")

    refute_includes icon, "onload=alert"
  end
end
