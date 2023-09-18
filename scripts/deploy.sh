#!/bin/bash
# Usage: ./scripts/deploy.sh <service-name>
# Example: ./scripts/deploy.sh pkg-name-api

function warn {
  echo -e "\033[0;31m$1\033[0m"
}

warn "Remember to add all files to git before deploying!"
read -p "Press enter to continue"

SERVICE=$1
GIT_TAG="deploy-$SERVICE"


git push pkg-name-api main 
git tag -d "$GIT_TAG"
git tag "$GIT_TAG"