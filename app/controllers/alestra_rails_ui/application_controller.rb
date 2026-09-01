# frozen_string_literal: true

module AlestraRailsUi
  class ApplicationController < ActionController::Base
    layout "alestra_rails_ui/portal"

    def default_render(*args)
      cname = self.class.name
      if cname.start_with?("AlestraRailsUi::") && cname.end_with?("::PagesController")
        section = cname.delete_prefix("AlestraRailsUi::").delete_suffix("::PagesController").underscore
        render "alestra_rails_ui/pages/#{section}/#{action_name}", *args
      else
        super
      end
    end
  end
end
