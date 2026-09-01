# frozen_string_literal: true

require "test_helper"

class NavHelperTest < ActiveSupport::TestCase
  include AlestraRailsUi::NavHelper

  test "marks an exact navigation path as active" do
    assert _nav_active?("/gestion", "/gestion")
  end

  test "marks a nested navigation path as active" do
    assert _nav_active?("/gestion/productos", "/gestion")
  end

  test "does not match a similarly named path" do
    refute _nav_active?("/gestion-extra", "/gestion")
  end
end
