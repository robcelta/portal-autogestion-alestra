FROM ruby:3.2-slim

RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends \
      build-essential \
      libsqlite3-dev \
      libyaml-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . .

WORKDIR /app/test/dummy
ENV RAILS_ENV=production \
    BUNDLE_FROZEN=1 \
    BUNDLE_WITHOUT="development:test"

RUN bundle install && \
    SECRET_KEY_BASE_DUMMY=1 bundle exec rails assets:precompile

EXPOSE 8080
CMD ["sh", "-c", "exec bin/rails server -b 0.0.0.0 -p ${PORT:-8080}"]
