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

set -e  # Exit immediately if any command exits with a non-zero status

trap 'echo "Exiting script..."; exit' INT TERM

echo "\n\n**************************"
echo "DOCKER BUILD"
echo "**************************\n"
echo " - Starting Docker build and push script..."

# Base name for Docker images
base_name="nasamadi"
root_dirs="./api ./parsers/nlm ./interfaces/web ./storage/gcs-emulator ./local-llm"
verbose=true
log=false
log_file="./tmp/docker_build.log"

# Load environment variables from .env file temporarily
if [ -f .env ]; then
  export $(cat .env | xargs)
fi

# Function to execute Docker commands with conditional logging and output
run_docker_command() {
  local command=$1

    if [ "$log" = true ]; then
      $command >> "$log_file" 2>&1
    else
      if [ "$verbose" = true ]; then
        $command
      else
        $command 2>/dev/null 
      fi
    fi
}


# Function to check Docker login status
check_docker_login() {
  echo "\n - LOGIN"
  echo "   - Logging in to Docker registry as $base_name using personal access token..."
  LOGIN_RESULT=$(run_docker_command "docker login --username $base_name --password $DOCKER_PAT")
  echo "   - $LOGIN_RESULT"
}

# Function to build and push Docker images
build_and_push_images() {
  echo "\n - BUILD AND PUSH IMAGES"
  for root_dir in $root_dirs; do
    # Extract the directory name from the root_dir path to use as the image name
    dir_name=$(echo "$root_dir" | sed 's|^\./||; s|/$||; s|/|-|g')

    # Use find to locate Dockerfiles exactly at the root_dir level, not deeper
    find "$root_dir" -maxdepth 1 -type f -name 'Dockerfile' | while IFS= read -r dockerfile_path; do

      # Construct the full image name with the base name and the directory name
      full_image_name="${base_name}/madi-${dir_name}:latest"

      # Echo commands for building Docker images
      echo "\n   - BUILDING: ${full_image_name} from ${dockerfile_path}..."
      
      # Build the image with multi-platform support
      run_docker_command "docker buildx build --platform linux/amd64,linux/arm64 -t $full_image_name -f $dockerfile_path $(dirname $dockerfile_path) --load"

      echo "docker buildx build --platform linux/amd64,linux/arm64 -t $full_image_name -f $dockerfile_path $(dirname $dockerfile_path) --load"

      # Check if build was successful
      if [ $? -ne 0 ]; then
        echo "     - Failed to build Docker image from ${dockerfile_path}"
        exit 1
      fi

      # Inspect the local image with manifest-tool to ensure it contains the required platforms
      echo "     - Inspecting image ${full_image_name} for multi-platform support..."
      manifest_output=$(manifest-tool inspect "${full_image_name}" --raw)

      # Check the manifest output for required platforms
      if echo "$manifest_output" | grep -q "amd64" && echo "$manifest_output" | grep -q "arm64"; then
        echo "     - Image ${full_image_name} contains the required platforms. Proceeding with push..."

        # Push the image for each platform
        for platform in amd64 arm64; do
          platform_image_name="${base_name}/madi-${dir_name}:${platform}"
          echo "     - Pushing ${platform_image_name}..."
          run_docker_command "docker buildx build --platform linux/${platform} -t $platform_image_name -f $dockerfile_path $(dirname $dockerfile_path) --push"
        done

        # Push the multi-platform image
        run_docker_command "docker buildx build --platform linux/amd64,linux/arm64 -t $full_image_name -f $dockerfile_path $(dirname $dockerfile_path) --push"
      
      else
        echo "     - Image ${full_image_name} does not contain the required platforms. Skipping push..."
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

  echo "\n   - UPDATE DESCRIPTIONS"
  # Use find with -iname for case-insensitive search
  meta_file=$(find "$dir_path" -maxdepth 1 -type f -iname 'docker-meta.json')

  if [ -n "$meta_file" ]; then
    echo "     - Found docker-meta.json in ${dir_path}. Updating Docker Hub repository..."

    # Read the JSON content
    META_DATA=$(<"$meta_file")

    # Extract repository name from image name
    REPO_NAME=$(echo "$image_name" | cut -d '/' -f 2 | cut -d ':' -f 1)

    echo "     - Repository name: $REPO_NAME"

    # Use DOCKER_PAT to get a JWT token
    TOKEN=$(curl -s -H "Content-Type: application/json" -X POST -d "{\"username\": \"$base_name\", \"password\": \"$DOCKER_PAT\"}" \
      https://hub.docker.com/v2/users/login/ | jq -r .token)

    if [ -z "$TOKEN" ]; then
      echo "     - Failed to retrieve user token. Please check your Docker PAT."
      exit 1
    fi

    echo "     - User token retrieved successfully"

    # Make the API request to update the repository using the JWT token
    UPDATE_DESCRIPTIONS=$(curl -s -o /dev/null -w "%{http_code}" -X PATCH "https://hub.docker.com/v2/repositories/$base_name/$REPO_NAME/" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json" \
      -d "$META_DATA")

    echo "     - Update descriptions code: $UPDATE_DESCRIPTIONS"

    if [ "$UPDATE_DESCRIPTIONS" -eq 200 ]; then
      echo "     - Repository updated successfully."
    else
      echo "     - Failed to update the repository. HTTP response code: $UPDATE_DESCRIPTIONS"
    fi

    # Extract only the category field from the META_DATA
    CATEGORY_DATA=$(jq -c '.categories' "$meta_file")

    UPDATE_CATEGORIES=$(curl -s -o /dev/null -w "%{http_code}" -X PATCH "https://hub.docker.com/v2/repositories/$base_name/$REPO_NAME/categories/" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json" \
      -d "$CATEGORY_DATA")
    
    echo "     - Update categories code: $UPDATE_CATEGORIES"

    if [ "$UPDATE_CATEGORIES" -eq 200 ]; then
      echo "     - Repository $REPO_NAME updated successfully."
    else
      echo "     - Failed to update the repository. HTTP response code: $UPDATE_CATEGORIES"
    fi

  else
    echo "     - No docker-meta.json found in ${dir_path}. Skipping update."
  fi
}


install_manifest_tool() {
  
    # Define the installation path
    local install_path="/usr/local/bin/manifest-tool"

    # Check if manifest-tool is already installed
    if [ -f "$install_path" ]; then
        echo " - Manifest-tool is already installed at $install_path."
        return 0
    fi

    # Determine the platform architecture
    local arch
    arch=$(uname -m)

    # Map architecture to download URL format
    case $arch in
        x86_64) arch="amd64" ;;
        aarch64) arch="arm64" ;;
        armv7l) arch="arm" ;;
        *) echo "   - Unsupported architecture: $arch"; return 1 ;;
    esac

    # Define the URL for the manifest-tool
    local version="v1.0.3"
    local url="https://github.com/estesp/manifest-tool/releases/download/${version}/manifest-tool-linux-${arch}"

    # Download the manifest-tool
    echo "   - Downloading manifest-tool from $url..."
    curl -L -o "$install_path" "$url"

    # Check if the download was successful
    if [[ $? -ne 0 ]]; then
        echo "   - Failed to download manifest-tool."
        return 1
    fi

    # Make the manifest-tool executable
    chmod +x "$install_path"

    # Verify the installation
    if command -v manifest-tool >/dev/null 2>&1; then
        echo "   - Manifest-tool successfully installed at $install_path."
    else
        echo "   - Failed to install manifest-tool."
        return 1
    fi
}

# Call the function to install manifest-tool
install_manifest_tool


# Main execution
check_docker_login
build_and_push_images

trap 'unset $(cat .env | cut -d= -f1 | xargs)' EXIT

echo "\n - All Docker images have been successfully built, pushed, and descriptions updated."
echo "\n**************************\n\n"