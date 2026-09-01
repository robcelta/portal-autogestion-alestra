# Cloud Run Deployment

The Docker image serves the dummy Rails application as a public UI demo. It does not persist application data: the production database is local SQLite, and Cloud Run's filesystem is ephemeral. Use managed Postgres before adding persisted records, uploads, or jobs.

`test/dummy/Gemfile.lock` pins the Rails application's dependencies. Update it intentionally with `bundle lock` from a supported Ruby/Bundler environment when changing dependencies.

## Local production verification

Build and run the exact production image before publishing it:

```sh
docker build --platform linux/amd64 -t alestra-web:production .
docker run --rm -p 8080:8080 \
  -e RAILS_SERVE_STATIC_FILES=true \
  -e RAILS_LOG_TO_STDOUT=true \
  -e SECRET_KEY_BASE="$(openssl rand -hex 64)" \
  alestra-web:production
```

Open `http://localhost:8080` and confirm that CSS, JavaScript, and each important route load. Stop the container with `Ctrl+C` after testing.

## Google Cloud setup

Install the [Google Cloud CLI](https://cloud.google.com/sdk/docs/install), sign in, select a project with billing enabled, and choose a region. `us-central1` is used below because it is a Tier 1 Cloud Run region.

```sh
gcloud auth login
gcloud config set project YOUR_PROJECT_ID

gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com \
  secretmanager.googleapis.com

gcloud artifacts repositories create alestra \
  --repository-format=docker \
  --location=us-central1
```

Create a runtime secret. Never commit or reuse a development `SECRET_KEY_BASE`.

```sh
PROJECT_ID="$(gcloud config get-value project)"
PROJECT_NUMBER="$(gcloud projects describe "$PROJECT_ID" --format='value(projectNumber)')"

gcloud secrets create alestra-secret-key-base --replication-policy=automatic
openssl rand -hex 64 | gcloud secrets versions add alestra-secret-key-base --data-file=-

gcloud secrets add-iam-policy-binding alestra-secret-key-base \
  --member="serviceAccount:${PROJECT_NUMBER}-compute@developer.gserviceaccount.com" \
  --role=roles/secretmanager.secretAccessor
```

## Build and publish

Use Cloud Build when your account has Cloud Build build permissions. It builds the required Linux `amd64` image remotely.

```sh
gcloud builds submit \
  --tag "us-central1-docker.pkg.dev/${PROJECT_ID}/alestra/web:latest"
```

If Cloud Build is unavailable, publish the locally verified `linux/amd64` image directly:

```sh
gcloud auth configure-docker us-central1-docker.pkg.dev
docker build --platform linux/amd64 -t alestra-web:production .
docker tag alestra-web:production "us-central1-docker.pkg.dev/${PROJECT_ID}/alestra/web:latest"
docker push "us-central1-docker.pkg.dev/${PROJECT_ID}/alestra/web:latest"
```

## Deploy

```sh

gcloud run deploy alestra-web \
  --image "us-central1-docker.pkg.dev/${PROJECT_ID}/alestra/web:latest" \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080 \
  --set-env-vars RAILS_ENV=production,RAILS_SERVE_STATIC_FILES=true,RAILS_LOG_TO_STDOUT=true \
  --set-secrets SECRET_KEY_BASE=alestra-secret-key-base:latest \
  --cpu 1 \
  --memory 512Mi \
  --min-instances 0 \
  --max-instances 1 \
  --concurrency 20
```

The command prints the public `run.app` URL. The application already permits `*.run.app` hosts.

## Console deployment

After publishing to Artifact Registry, Cloud Run's **Create service** > **Deploy one revision from an existing container image** flow can use the same image. Configure the same port, environment variables, secret reference, and scaling values from the command above.

## Cost guardrails

Cloud Run request-based billing has a monthly free allowance, but a billing account is required and the allowance is not a hard spending limit. Keep minimum instances at zero, cap this demo at one instance, and create a Google Cloud Billing budget alert. Artifact Registry storage and Cloud Build usage are billed separately from Cloud Run.
