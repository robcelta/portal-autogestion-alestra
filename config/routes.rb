AlestraRailsUi::Engine.routes.draw do
  root to: "pages#dashboard"

  get "login",    to: "pages#login"
  post "login",   to: "pages#login", as: :demo_login
  get "loading",  to: "pages#loading"
  get "dashboard", to: "pages#dashboard"
  get "dashboard/notice", to: "pages#dashboard_notice", as: :dashboard_notice

  namespace :gestion do
    root to: "pages#index"
    get "historia",       to: "pages#historia"

    namespace :bloqueo do
      root to: "pages#index"
      get "confirmar",    to: "pages#confirmar"
      get "exito",        to: "pages#exito"
    end

    namespace :desbloqueo do
      root to: "pages#index"
      get "confirmar",    to: "pages#confirmar"
      get "exito",        to: "pages#exito"
    end

    namespace :bloqueo_equipo do
      root to: "pages#index"
      get "confirmar",    to: "pages#confirmar"
      post "confirmar",   to: "pages#confirmar"
      get "procesando",   to: "pages#procesando"
      post "procesando",  to: "pages#procesando"
      get "exito",        to: "pages#exito"
      get "bloqueado",    to: "pages#bloqueado"
    end

    namespace :desbloqueo_equipo do
      root to: "pages#index"
      get "confirmar",    to: "pages#confirmar"
      get "procesando",   to: "pages#procesando"
      get "datos",        to: "pages#datos"
      get "exito",        to: "pages#exito"
    end

    namespace :productos do
      root to: "pages#index"
      get "mensual",      to: "pages#mensual"
      get "unica",        to: "pages#unica"
      get "paises",       to: "pages#paises"
      get "confirmar",    to: "pages#confirmar"
      get "exito",        to: "pages#exito"
      get "exito_mensual", to: "pages#exito_mensual"
      get "exito_apps",   to: "pages#exito_apps"
      get "exito_unica",  to: "pages#exito_unica"
    end

    namespace :plan do
      root to: "pages#index"
      get "confirmar",    to: "pages#confirmar"
      get "exito",        to: "pages#exito"
    end

    namespace :sim do
      get "reemplazo",    to: "pages#reemplazo"
      get "reemplazo_2",  to: "pages#reemplazo_2"
      get "reemplazo_3",  to: "pages#reemplazo_3"
      get "activacion",   to: "pages#activacion"
      get "activacion_2", to: "pages#activacion_2"
      get "activacion_3", to: "pages#activacion_3"
    end

    namespace :esim do
      root to: "pages#index"
      get "exito",          to: "pages#exito"
    end

    namespace :nuevos_servicios do
      root to: "pages#index"
      get "confirmar",    to: "pages#confirmar"
      get "exito",        to: "pages#exito"
    end

    namespace :baja_linea do
      root to: "pages#index"
      get "exito",        to: "pages#exito"
    end

    namespace :limite_consumo do
      root to: "pages#index"
      get "confirmar",    to: "pages#confirmar"
      get "exito",        to: "pages#exito"
    end
  end

  namespace :consumo do
    root to: "pages#index"
    get "por_linea",      to: "pages#por_linea"
  end

  namespace :ayuda do
    root to: "pages#index"
    get "seccion_1",      to: "pages#seccion_1"
    get "seccion_2",      to: "pages#seccion_2"
    get "seccion_3",      to: "pages#seccion_3"
    get "seccion_4",      to: "pages#seccion_4"
    get "agregar",        to: "pages#agregar"
    get "editar",         to: "pages#editar"
  end

  namespace :configuracion do
    root to: "pages#index"
    get "editar",         to: "pages#editar"
    get "notificaciones", to: "pages#notificaciones"
    get "seguridad",      to: "pages#seguridad"
    get "facturacion",    to: "pages#facturacion"
    get "busqueda_1",     to: "pages#busqueda_1"
    get "busqueda_2",     to: "pages#busqueda_2"
    get "perfil",         to: "pages#perfil"
  end

  namespace :busqueda do
    root to: "pages#index"
    get "error",          to: "pages#error"
  end
end
