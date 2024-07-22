  # Extract the directory name from the root_dir path to use as the image name
#!/bin/sh

# Base name for Docker images
base_name="nasamadi"

# Docker registry login
echo "Logging in to Docker registry as $base_name..."
docker login --username "$base_name"
if [ $? -ne 0 ]; then
  echo "Docker login failed"
  exit 1
fi

# Define the root directories to search for Dockerfiles as a space-separated list
root_dirs="./api ./storage ./parsers ./interfaces/web"

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
    docker build -t "${full_image_name}" -f "${dockerfile_path}" "$(dirname "${dockerfile_path}")"
  
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