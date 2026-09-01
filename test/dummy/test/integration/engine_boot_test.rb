# frozen_string_literal: true

require "test_helper"

class EngineBootTest < ActionDispatch::IntegrationTest
  test "mounts the engine root" do
    get "/"

    assert_response :success
    assert_select "main.alestra-portal-content"
  end

  test "exposes every page controller route through the mounted engine" do
    routes = [
      "/login", "/dashboard", "/gestion", "/consumo", "/ayuda", "/configuracion", "/busqueda"
    ]

    routes.each do |path|
      get path
      assert_response :success, "Expected #{path} to render successfully"
    end
  end
end
