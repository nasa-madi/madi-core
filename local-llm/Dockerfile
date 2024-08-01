FROM ollama/ollama:latest

COPY ./run-ollama.sh /tmp/run-ollama.sh

WORKDIR /tmp

RUN chmod +x run-ollama.sh

EXPOSE 11434

ENTRYPOINT ["/bin/bash", "/tmp/run-ollama.sh"]