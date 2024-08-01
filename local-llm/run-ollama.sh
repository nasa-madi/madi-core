#!/usr/bin/env bash

# Default model version
MODEL_VERSION="llama3.1"

# If an argument is provided, use it as the model version
if [ ! -z "$1" ]; then
  MODEL_VERSION="$1"
fi

ollama serve &
ollama list
ollama pull $MODEL_VERSION
ollama run $MODEL_VERSION