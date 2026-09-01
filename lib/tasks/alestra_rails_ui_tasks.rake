# frozen_string_literal: true

namespace :alestra_rails_ui do
  desc "Muestra la ruta del engine (assets, layouts, JS) para depuración"
  task :info do
    root = AlestraRailsUi::Engine.root
    puts "AlestraRailsUi::Engine.root = #{root}"
    puts "  Stylesheets: #{root.join('app/assets/stylesheets/alestra_rails_ui')}"
    puts "  Layouts:     #{root.join('app/views/layouts/alestra_rails_ui')}"
    puts "  Stimulus:    #{root.join('app/javascript/controllers/alestra')}"
  end

  desc "Lista los layouts incluidos en la gema"
  task :layouts do
    Dir[AlestraRailsUi::Engine.root.join("app/views/layouts/alestra_rails_ui/*.html.erb")].sort.each do |path|
      puts File.basename(path)
    end
  end

  desc "Reconstruye components.css concatenando los archivos fuente en components/"
  task :build_css do
    root      = AlestraRailsUi::Engine.root
    src_dir   = root.join("app/assets/stylesheets/alestra_rails_ui/components")
    out_file  = root.join("app/assets/stylesheets/alestra_rails_ui/components.css")

    sources = %w[
      base buttons badges alerts forms checkbox switch radio dropdown
      shell portal navigation data table modal spinner tooltip notification configuration
    ].map { |name| src_dir.join("#{name}.css") }

    header = <<~HEADER
      /**
       * Alestra Rails UI — compiled component stylesheet.
       *
       * Source files (edit these, then run `bin/rails alestra_rails_ui:build_css`):
      #{sources.map { |f| " *   components/#{File.basename(f)}" }.join("\n")}
       */

    HEADER

    sections = sources.map do |src|
      name = File.basename(src, ".css")
      separator = "\n/* #{"─" * 3} #{name} #{("─" * (52 - name.length))} */\n\n"
      separator + File.read(src)
    end

    File.write(out_file, header + sections.join("\n"))
    puts "Built #{out_file} from #{sources.length} source files."
  end
end
