# Testing

The test suite protects the Rails engine at three levels:

- Rails Minitest checks helpers, rendered markup, assets, importmap setup, routes, and layouts.
- Vitest checks every shipped Stimulus controller without starting Rails.
- Playwright runs the dummy application in Chromium to verify Importmap, Turbo, Stimulus, responsive rendering, and browser errors.

## Requirements

- Ruby `>= 3.2`
- Bundler appropriate for the selected Ruby version
- Node.js `>= 20`
- Chromium for Playwright

## Setup

```bash
bundle install
npm install
npx playwright install chromium
```

## Commands

```bash
npm run test:ruby
npm run test:unit
npm run test:coverage
npm run test:e2e
npm run test:all
```

`test:all` runs Rails tests, Stimulus unit tests, and the Chromium browser suite. Playwright starts the dummy app at `http://127.0.0.1:3001`; set `CI=1` to force an isolated test server.

## Deferred Contracts

The test suite uses `skip` and Playwright `fixme` for contracts that require the future host application and database:

- authenticating a user;
- persisting and validating equipment-blocking requests;
- full Axe accessibility acceptance on prototype screens.

Remove the relevant `skip` or `fixme` only when the host application supplies the persistence, validation, and accessibility implementation. Do not replace these with assertions that accept broken behavior.

## Adding Features

For every new Stimulus controller, add a matching `test/javascript/controllers/*_controller.test.js` test file. For every new route or workflow, add a Rails rendering test and a Playwright user-path test. Keep browser tests focused on behavior and accessible controls rather than page snapshots.

When editing a component source stylesheet under `app/assets/stylesheets/alestra_rails_ui/components`, rebuild the distributed bundle:

```bash
bin/rails alestra_rails_ui:build_css
```

The Rails asset test fails when a component source is missing from `components.css`.
