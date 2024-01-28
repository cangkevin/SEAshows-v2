#!/bin/bash
# Set the pipefail option.
set -o pipefail
set -e

# Get the Vercel API endpoints.
GET_DEPLOYMENTS_ENDPOINT="https://api.vercel.com/v6/deployments" # NOTE https://vercel.com/docs/rest-api/endpoints#list-deployments
DELETE_DEPLOYMENTS_ENDPOINT="https://api.vercel.com/v13/deployments" # NOTE https://vercel.com/docs/rest-api/endpoints#delete-a-deployment

# Create a list of deployments.
deployments=$(curl -s -X GET "$GET_DEPLOYMENTS_ENDPOINT/?projectId=$VERCEL_PROJECT_ID&target=preview" -H "Authorization: Bearer $VERCEL_TOKEN")

# Filter the deployments list by meta.base_hash === meta tag.
filtered_deployments=$(echo $deployments | jq -r --arg META_TAG "$META_TAG" '[.deployments[] | select(.meta.base_hash | type == "string" and contains($META_TAG)) | .uid] | join(",")')

# Clears the values from filtered_deployments
IFS=',' read -ra values <<< "$filtered_deployments"

echo "META_TAG: $META_TAG"
echo "Filtered deployments: ${filtered_deployments}"

# Iterate over the filtered deployments list.
for uid in "${values[@]}"; do
    echo "Deleting ${uid}"

    delete_url=${DELETE_DEPLOYMENTS_ENDPOINT}/${uid}
    echo $delete_url

    # Make DELETE a request to the /v13/deployments/{id} endpoint.
    curl -X DELETE $delete_url -H "Authorization: Bearer $VERCEL_TOKEN"

    echo "Deleted!"
done
