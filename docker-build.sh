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



# Attempt to pull a known private image to check if logged in
echo "Checking if already logged in to Docker registry as $base_name..."
pull_output=$(docker pull $base_name/check-login:latest 2>&1)

if echo "$pull_output" | grep -q "not found"; then
  echo "Already logged in to Docker registry as $base_name."
elif echo "$pull_output" | grep -q "pull access denied"; then
  echo "Not logged in or do not have access to the image."
  echo "Logging in to Docker registry as $base_name..."
  docker login --username "$base_name"
  if [ $? -ne 0 ]; then
    echo "Docker login failed"
    exit 1
  fi
else
  echo "Unexpected error or already logged in and image exists."
fi



# Define the root directories to search for Dockerfiles as a space-separated list
root_dirs="./api ./storage ./parsers/nlm ./interfaces/web ./storage/gcp-emulator"

# Convert the space-separated list into a loop
for root_dir in $root_dirs; do
  # Extract the directory name from the root_dir path to use as the image name
  dir_name=$(echo "$root_dir" | sed 's|^\./||; s|/$||; s|/|-|g')

  # Use find to locate Dockerfiles exactly at the root_dir level, not deeper
  find "$root_dir" -maxdepth 1 -type f -name 'Dockerfile' | while IFS= read -r dockerfile_path; do
    
    # Construct the full image name with the base name and the directory name
    full_image_name="${base_name}/madi-${dir_name}:latest"
    
    # Echo commands for building and pushing Docker images
    echo "Building Docker image ${full_image_name} from ${dockerfile_path}..."
    # Uncomment and modify these commands as needed for your actual build and push process
    docker build -t "${full_image_name}" -f "${dockerfile_path}" "$(dirname ${dockerfile_path})"
  
    # Check if build was successful
    if [ $? -ne 0 ]; then
      echo "Failed to build Docker image from ${dockerfile_path}"
      exit 1
    fi
    
    # Push the Docker image
    echo "Pushing Docker image ${full_image_name}..."
    docker push "${full_image_name}"
    
    # Check if push was successful
    if [ $? -ne 0 ]; then
      echo "Failed to push Docker image ${full_image_name}"
      exit 1
    fi

  done 
done

echo "All Docker images have been successfully built and pushed."