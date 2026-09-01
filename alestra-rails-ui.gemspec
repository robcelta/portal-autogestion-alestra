# frozen_string_literal: true

require_relative "lib/alestra_rails_ui/version"

Gem::Specification.new do |spec|
  spec.name          = "alestra-rails-ui"
  spec.version       = AlestraRailsUi::VERSION
  spec.authors       = ["Alestra"]
  spec.email         = ["manuelbg@gmail.com"]
  spec.summary       = "Kit de UI Alestra (tokens, layouts, Stimulus) para Rails 8 + Hotwire"
  spec.description   = "Colores fijos, componentes CSS, layouts (app, Devise, mailer, impresión), " \
                       "JavaScript aislado compatible con Turbo y Stimulus del host."
  spec.homepage      = "https://github.com/alestra/alestra-rails-ui#readme"
  spec.license       = "MIT"
  spec.required_ruby_version = ">= 3.2.0"

  spec.metadata["source_code_uri"] = "https://github.com/alestra/alestra-rails-ui"
  spec.metadata["changelog_uri"] = "https://github.com/alestra/alestra-rails-ui/releases"

  spec.files = Dir.chdir(__dir__) do
    if File.directory?(".git")
      `git ls-files -z`.split("\x0")
    else
      Dir["lib/**/*", "app/**/*", "config/**/*", "docs/**/*", "examples/**/*", "MIT-LICENSE", "README.md", "Rakefile"]
        .flatten
        .select { |f| File.file?(f) }
    end
  end
  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{\Aexe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.add_dependency "rails", "~> 8.0"
  spec.add_dependency "importmap-rails", "~> 2.0"
  spec.add_dependency "stimulus-rails", "~> 1.0"
  spec.add_dependency "turbo-rails", "~> 2.0"

  spec.add_development_dependency "rake", "~> 13.0"
end
