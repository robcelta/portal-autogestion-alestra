# frozen_string_literal: true

require "test_helper"

class PrototypeContractsTest < ActionDispatch::IntegrationTest
  test "login submission has a real authentication contract" do
    skip "Prototype gap: add host authentication and a POST session route before enabling this contract."

    post "/login", params: { user: { email: "user@example.com", password: "secret" } }
    assert_redirected_to "/dashboard"
  end

  test "equipment blocking accepts the prototype POST workflow" do
    post "/gestion/bloqueo_equipo/confirmar", params: { marca: "Alestra", modelo: "Demo", imei: "123" }
    assert_response :success
    assert_select "#confirmar-bloqueo-equipo-title", text: "Bloqueo de equipo"
  end
end
