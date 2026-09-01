# frozen_string_literal: true

module AlestraRailsUi
  module IconHelper
    def alestra_icon(name, css_class: "alestra-icon", **attrs)
      icon_name = name.to_s
      return "".html_safe unless icon_name.match?(/\A[a-z0-9_-]+\z/)

      path = AlestraRailsUi::Engine.root.join("app/assets/images/alestra_rails_ui/icons/#{icon_name}.svg")
      return "".html_safe unless path.exist?

      extra = attrs.filter_map do |key, value|
        attribute = key.to_s
        " #{attribute}=\"#{ERB::Util.html_escape(value)}\"" if attribute.match?(/\A[a-zA-Z_:][a-zA-Z0-9:._-]*\z/)
      end.join
      svg = path.read
                .sub(/<svg/, "<svg class=\"#{ERB::Util.html_escape(css_class)}\"#{extra}")
                .gsub(/\s*(width|height)="[^"]*"/, "")
      svg.html_safe
    end
  end
end
