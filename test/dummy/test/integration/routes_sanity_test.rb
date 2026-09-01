# frozen_string_literal: true

require "test_helper"

class RoutesSanityTest < ActionDispatch::IntegrationTest
  test "root redirects or renders" do
    get "/"
    assert_response :success
  end

  test "login" do
    get "/login"
    assert_response :success
  end

  test "loading" do
    get "/loading"
    assert_response :success
  end

  test "dashboard" do
    get "/dashboard"
    assert_response :success
  end

  test "dashboard notice" do
    get "/dashboard/notice"
    assert_response :success
  end

  # ── Gestión de líneas y servicios ──────────────────────────────────────
  test "gestion root" do
    get "/gestion"
    assert_response :success
  end

  test "gestion historia" do
    get "/gestion/historia"
    assert_response :success
  end

  test "gestion bloqueo routes" do
    get "/gestion/bloqueo"
    assert_response :success
    get "/gestion/bloqueo/confirmar"
    assert_response :success
    get "/gestion/bloqueo/exito"
    assert_response :success
  end

  test "gestion desbloqueo routes" do
    get "/gestion/desbloqueo"
    assert_response :success
    get "/gestion/desbloqueo/confirmar"
    assert_response :success
    get "/gestion/desbloqueo/exito"
    assert_response :success
  end

  test "gestion bloqueo_equipo routes" do
    get "/gestion/bloqueo_equipo"
    assert_response :success
    get "/gestion/bloqueo_equipo/confirmar"
    assert_response :success
    get "/gestion/bloqueo_equipo/procesando"
    assert_response :success
    get "/gestion/bloqueo_equipo/exito"
    assert_response :success
    get "/gestion/bloqueo_equipo/bloqueado"
    assert_response :success
  end

  test "gestion desbloqueo_equipo routes" do
    get "/gestion/desbloqueo_equipo"
    assert_response :success
    get "/gestion/desbloqueo_equipo/confirmar"
    assert_response :success
    get "/gestion/desbloqueo_equipo/procesando"
    assert_response :success
    get "/gestion/desbloqueo_equipo/datos"
    assert_response :success
    get "/gestion/desbloqueo_equipo/exito"
    assert_response :success
  end

  test "gestion productos routes" do
    get "/gestion/productos"
    assert_response :success
    get "/gestion/productos/mensual"
    assert_response :success
    get "/gestion/productos/unica"
    assert_response :success
    get "/gestion/productos/paises"
    assert_response :success
    get "/gestion/productos/confirmar"
    assert_response :success
    get "/gestion/productos/exito"
    assert_response :success
    get "/gestion/productos/exito_mensual"
    assert_response :success
    get "/gestion/productos/exito_apps"
    assert_response :success
    get "/gestion/productos/exito_unica"
    assert_response :success
  end

  test "gestion plan routes" do
    get "/gestion/plan"
    assert_response :success
    get "/gestion/plan/confirmar"
    assert_response :success
    get "/gestion/plan/exito"
    assert_response :success
  end

  test "gestion sim routes" do
    get "/gestion/sim/reemplazo"
    assert_response :success
    get "/gestion/sim/reemplazo_2"
    assert_response :success
    get "/gestion/sim/reemplazo_3"
    assert_response :success
    get "/gestion/sim/activacion"
    assert_response :success
    get "/gestion/sim/activacion_2"
    assert_response :success
    get "/gestion/sim/activacion_3"
    assert_response :success
  end

  test "gestion esim" do
    get "/gestion/esim"
    assert_response :success
    get "/gestion/esim/exito"
    assert_response :success
  end

  test "gestion nuevos_servicios routes" do
    get "/gestion/nuevos_servicios"
    assert_response :success
    get "/gestion/nuevos_servicios/confirmar"
    assert_response :success
    get "/gestion/nuevos_servicios/exito"
    assert_response :success
  end

  test "gestion baja_linea" do
    get "/gestion/baja_linea"
    assert_response :success
    get "/gestion/baja_linea/exito"
    assert_response :success
  end

  test "gestion limite_consumo routes" do
    get "/gestion/limite_consumo"
    assert_response :success
    get "/gestion/limite_consumo/confirmar"
    assert_response :success
    get "/gestion/limite_consumo/exito"
    assert_response :success
  end

  # ── Consumo ────────────────────────────────────────────────────────────
  test "consumo routes" do
    get "/consumo"
    assert_response :success
    get "/consumo/por_linea"
    assert_response :success
  end

  # ── Ayuda ──────────────────────────────────────────────────────────────
  test "ayuda routes" do
    get "/ayuda"
    assert_response :success
    get "/ayuda/seccion_1"
    assert_response :success
    get "/ayuda/seccion_2"
    assert_response :success
    get "/ayuda/seccion_3"
    assert_response :success
    get "/ayuda/seccion_4"
    assert_response :success
    get "/ayuda/agregar"
    assert_response :success
    get "/ayuda/editar"
    assert_response :success
  end

  # ── Configuración ──────────────────────────────────────────────────────
  test "configuracion routes" do
    get "/configuracion"
    assert_response :success
    get "/configuracion/editar"
    assert_response :success
    get "/configuracion/notificaciones"
    assert_response :success
    get "/configuracion/seguridad"
    assert_response :success
    get "/configuracion/facturacion"
    assert_response :success
    get "/configuracion/busqueda_1"
    assert_response :success
    get "/configuracion/busqueda_2"
    assert_response :success
    get "/configuracion/perfil"
    assert_response :success
  end

  # ── Búsqueda ───────────────────────────────────────────────────────────
  test "busqueda routes" do
    get "/busqueda"
    assert_response :success
    get "/busqueda/error"
    assert_response :success
  end
end
