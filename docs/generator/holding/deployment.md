
# Deployment

<!-- See [Terraform](/terraform) -->

## Fetching Secrets from GCP

From the `/api` folder, run the following gcloud command to get the current env secrets.
```shell
ENV=develop
gcloud secrets versions access latest --secret "${ENV}-env-overrides" > ./config/${ENV}.yml;
```

## Updating Secrets in GCP

Update the secrets as necessary and then reupload with
```shell
ENV=test
if gcloud secrets describe "${ENV}-env-overrides" &>/dev/null; then
    echo "Secret exists, updating..."
    gcloud secrets versions add "${ENV}-env-overrides" --data-file="./config/${ENV}.yml"
else
    echo "Secret does not exist, creating..."
    gcloud secrets create "${ENV}-env-overrides" --replication-policy="automatic" --data-file="./config/${ENV}.yml"
fi
```

The environment options are [ `develop`, `test`, `production` ]
