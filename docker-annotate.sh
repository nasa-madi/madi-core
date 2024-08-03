TOKEN=$(curl -s -H "Authorization: Bearer $DOCKER_TOKEN" \
"https://hub.docker.com/v2/users/login/" | jq -r .token)


ACCESS_TOKEN=$(curl -s -X POST "https://hub.docker.com/v2/access-tokens/" \
-H "Authorization: JWT $TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "description": "Generated token for automated tasks",
  "expires_in": 30
}' | jq -r .token)

echo "Your new access token is: $ACCESS_TOKEN"


# Make the API request to update the description
curl -X PATCH "https://hub.docker.com/v2/repositories/$DOCKER_USERNAME/$REPO_NAME/" \
     -H "Authorization: Bearer $ACCESS_TOKEN" \
     -H "Content-Type: application/json" \
     -d "{\"full_description\": \"$NEW_DESCRIPTION\"}"