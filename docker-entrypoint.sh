#!/bin/bash
set -e

if [ "$1" = '' ]; then
  set -- go run main.go
fi

if [[ "$1" == -* ]]; then
	set -- go run main.go "$@"
fi

echo "$@"
exec "$@"
