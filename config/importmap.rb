# frozen_string_literal: true

# Se fusiona con `config/importmap.rb` de la app host vía Engine.
pin_all_from File.expand_path("../app/javascript/controllers", __dir__), under: "controllers"
