#!/bin/sh

# Docker Build and Push Script
# This script automates the process of building Docker images from Dockerfiles located in specified directories
# and pushing them to a Docker registry. It first checks if the user is logged into the Docker registry and
# prompts for login if necessary. Then, it iterates over specified directories, builds Docker images from
# Dockerfiles found at the root of those directories, and pushes the images to the registry.

# Prerequisites:
# - Docker must be installed and running on your system.
# - You must have access to the Docker registry where images will be pushed.
# - This script assumes Dockerfiles are located directly within the specified directories and not in subdirectories.

# Usage:
# 1. Ensure the script is executable: chmod +x docker-build.sh
# 2. Run the script: ./docker-build.sh

# Configuration:
# - base_name: Set this variable to your Docker registry username or organization name.
# - root_dirs: List the root directories where Dockerfiles are located. Separate each directory with a space.

# Note:
# - The script uses 'docker login' for authentication. Ensure you have access rights to the registry and the
#   specified repositories.
# - The script exits with an error if any step fails, including Docker build or push failures.




# Base name for Docker images
base_name="nasamadi"
root_dirs="./api ./parsers/nlm ./interfaces/web ./storage/gcp-emulator ./local-llm"
root_dirs="./local-llm"


# Load environment variables from .env file temporarily
if [ -f .env ]; then
  export $(cat .env | xargs)
fi


# Function to check Docker login status
check_docker_login() {
  echo "Logging in to Docker registry as $base_name using DOCKER_PAT..."
  echo "$DOCKER_PAT" | docker login --username "$base_name" --password-stdin
}

docker buildx build --platform linux/amd64,linux/arm64 -t "nasamadi/madi-local-llm" -f ./local-llm/Dockerfile
# Define the root directories to search for Dockerfiles as a space-separated list
# root_dirs="./api ./parsers/nlm ./interfaces/web ./storage/gcp-emulator ./parsers/nlm"


# Function to build and push Docker images
build_and_push_images() {
  for root_dir in $root_dirs; do
    # Extract the directory name from the root_dir path to use as the image name
    dir_name=$(echo "$root_dir" | sed 's|^\./||; s|/$||; s|/|-|g')

    # Use find to locate Dockerfiles exactly at the root_dir level, not deeper
    find "$root_dir" -maxdepth 1 -type f -name 'Dockerfile' | while IFS= read -r dockerfile_path; do

      # Construct the full image name with the base name and the directory name
      full_image_name="${base_name}/madi-${dir_name}:latest"

      # Echo commands for building Docker images
      echo "Building Docker image ${full_image_name} from ${dockerfile_path}..."
      # Build the image with multi-platform support
      docker buildx build --platform linux/amd64,linux/arm64 -t "${full_image_name}" -f "${dockerfile_path}" "$(dirname "${dockerfile_path}")" --load

      # Check if build was successful
      if [ $? -ne 0 ]; then
        echo "Failed to build Docker image from ${dockerfile_path}"
        exit 1
      fi

      # Inspect the local image to ensure it contains the required platforms
      inspect_output=$(docker inspect "${full_image_name}")
      echo "Inspect output: $inspect_output"

      if echo "$inspect_output" | grep -q "linux/amd64" && echo "$inspect_output" | grep -q "linux/arm64"; then
        echo "Image ${full_image_name} contains the required platforms. Proceeding with push..."
        # Push the image
        docker buildx build --platform linux/amd64,linux/arm64 -t "${full_image_name}" -f "${dockerfile_path}" "$(dirname "${dockerfile_path}")" --push
      else
        echo "Image ${full_image_name} does not contain the required platforms. Skipping push..."
        exit 1
      fi

      # Update Docker Hub description if DESCRIPTION.md exists
      update_description "$(dirname "${dockerfile_path}")" "$full_image_name"

    done
  done
}



# Function to update Docker Hub repository description
update_description() {
  local dir_path=$1
  local image_name=$2

  # Use find with -iname for case-insensitive search
  meta_file=$(find "$dir_path" -maxdepth 1 -type f -iname 'docker-meta.json')

  if [ -n "$meta_file" ]; then
    echo "Found docker-meta.json in ${dir_path}. Updating Docker Hub repository..."

    # Read the JSON content
    META_DATA=$(<"$meta_file")

    # Extract repository name from image name
    REPO_NAME=$(echo "$image_name" | cut -d '/' -f 2 | cut -d ':' -f 1)

    # Use DOCKER_PAT to get a JWT token
    TOKEN=$(curl -s -H "Content-Type: application/json" -X POST -d "{\"username\": \"$base_name\", \"password\": \"$DOCKER_PAT\"}" \
      https://hub.docker.com/v2/users/login/ | jq -r .token)

    if [ -z "$TOKEN" ]; then
      echo "Failed to retrieve user token. Please check your Docker PAT."
      exit 1
    fi

    # Make the API request to update the repository using the JWT token
    UPDATE_DESCRIPTIONS=$(curl -s -o /dev/null -w "%{http_code}" -X PATCH "https://hub.docker.com/v2/repositories/$base_name/$REPO_NAME/" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json" \
      -d "$META_DATA")

    echo "Update descriptions code: $UPDATE_DESCRIPTIONS"

    if [ "$UPDATE_DESCRIPTIONS" -eq 200 ]; then
      echo "Repository updated successfully."
    else
      echo "Failed to update the repository. HTTP response code: $UPDATE_DESCRIPTIONS"
    fi

    # Extract only the category field from the META_DATA
    CATEGORY_DATA=$(jq -c '.categories' "$meta_file")

    UPDATE_CATEGORIES=$(curl -s -o /dev/null -w "%{http_code}" -X PATCH "https://hub.docker.com/v2/repositories/$base_name/$REPO_NAME/categories/" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json" \
      -d "$CATEGORY_DATA")
    
    echo "Update categories code: $UPDATE_CATEGORIES"


    if [ "$UPDATE_CATEGORIES" -eq 200 ]; then
      echo "Repository updated successfully."
    else
      echo "Failed to update the repository. HTTP response code: $UPDATE_CATEGORIES"
    fi

  else
    echo "No docker-meta.json found in ${dir_path}. Skipping update."
  fi
}



# Main execution
check_docker_login
build_and_push_images

trap 'unset $(cat .env | cut -d= -f1 | xargs)' EXIT

echo "All Docker images have been successfully built, pushed, and descriptions updated."