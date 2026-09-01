# frozen_string_literal: true

module AlestraRailsUi
  class InstallGenerator < Rails::Generators::Base
    source_root File.expand_path("templates", __dir__)

    desc "Crea inicializador opcional y documenta layouts / estilos Alestra"

    def create_initializer
      template "initializer.rb.tt", "config/initializers/alestra_rails_ui.rb"
    end

    def show_readme
      say_status :info, "Layouts disponibles (usar en ApplicationController / Devise / mailers):", :green
      say "  layout 'alestra_rails_ui/application'   # app autenticada"
      say "  layout 'alestra_rails_ui/devise'        # login / registro"
      say "  layout 'alestra_rails_ui/print'         # impresión"
      say "  layout 'alestra_rails_ui/mailer'        # ActionMailer (html)"
      say_status :info, "Estilos (Propshaft):", :green
      say %(  <%= stylesheet_link_tag "alestra_rails_ui/tokens", "alestra_rails_ui/components", "alestra_rails_ui/print" %>)
      say_status :info, "Stimulus: controlador alestra--ui (data-controller=\"alestra--ui\")", :green
    end
  end
end
