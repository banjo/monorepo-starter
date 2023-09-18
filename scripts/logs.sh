#!/bin/bash

# Usage: ./scripts/logs.sh <service-name>
# Example: ./scripts/logs.sh pkg-name-api

SERVICE=$1
ssh dokku "dokku logs $SERVICE -t"
