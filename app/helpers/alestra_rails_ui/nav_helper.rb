# frozen_string_literal: true

module AlestraRailsUi
  module NavHelper
    def _nav_active?(path, prefix)
      path == prefix || path.start_with?(prefix + "/")
    end
  end
end
