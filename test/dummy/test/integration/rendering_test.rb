# frozen_string_literal: true

require "test_helper"

class RenderingTest < ActionDispatch::IntegrationTest
  test "login renders the expected credential controls" do
    get "/login"

    assert_response :success
    assert_select "#login_username[name='user[email]'][autocomplete='username']"
    assert_select "#login_password[name='user[password]'][autocomplete='current-password']"
    assert_select "[data-controller='alestra--password-visibility']"
    assert_select "button.alestra-login-password-toggle[data-action='alestra--password-visibility#toggle'][aria-label]"
  end

  test "portal pages include navigation and application assets" do
    get "/dashboard"

    assert_response :success
    assert_select "aside#alestra-sidebar[data-alestra--sidebar-target='sidebar']"
    assert_select "button.alestra-sidebar-toggle[data-action='alestra--sidebar#toggle']"
    assert_select "nav.alestra-sidebar__nav"
    assert_select "link[href*='alestra_rails_ui/components']"
    assert_select "script[type='importmap']"
  end

  test "portal pages mount the accessible notification center" do
    get "/dashboard"

    assert_response :success
    assert_select "body[data-controller~='alestra--notification-center']"
    assert_select ".alestra-notification-cta[aria-label='Notificaciones']"
    assert_select "#alestra-notification-center[role='dialog'][aria-labelledby][aria-hidden='true'][hidden]"
    assert_select "[data-alestra--notification-center-target='item'][data-read='false']", minimum: 1
    assert_select "[data-action='alestra--notification-center#markAllRead']", count: 1
  end

  test "consumption page wires tabs to the public Stimulus action" do
    get "/consumo"

    assert_response :success
    assert_select "[data-controller='alestra--tabs']"
    assert_select "[data-action='click->alestra--tabs#switch']", count: 3
  end

  test "dialog pages retain accessible dialog metadata" do
    get "/gestion/bloqueo_equipo"

    assert_response :success
    assert_select "[role='dialog'][aria-modal='true'][aria-labelledby]"
  end
end
