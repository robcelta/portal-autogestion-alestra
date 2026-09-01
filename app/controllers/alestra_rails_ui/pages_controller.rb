# frozen_string_literal: true

module AlestraRailsUi
  class PagesController < ApplicationController
    layout :resolve_layout

    def login
      return redirect_to dashboard_path if request.post?

      render "alestra_rails_ui/pages/login/index", layout: "alestra_rails_ui/devise"
    end

    def loading
      render "alestra_rails_ui/pages/login/loading", layout: "alestra_rails_ui/devise"
    end

    def dashboard
      render "alestra_rails_ui/pages/dashboard/index"
    end

    def dashboard_notice
      render "alestra_rails_ui/pages/dashboard/notice"
    end

    private

    def resolve_layout
      case action_name
      when "login", "loading" then "alestra_rails_ui/devise"
      else "alestra_rails_ui/portal"
      end
    end
  end
end
