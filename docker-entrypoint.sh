#!/bin/bash

set -e

if [ "$1" = '' ]; then
  set -- go run main.go
fi

if [[ "$1" == -* ]]; then
	set -- go run main.go "$@"
fi

if [ "$1" = 'dev' ]; then
  if [ "$2" = '--init' -o ! -d "_vendor" ]; then
    # Install go packages with Vektah/gin
    gom install github.com/Vektah/gin
  fi

  if [ "$2" = '--init' -o ! -d "static/build" ]; then
    # Install go packages with Vektah/gin
    gom install github.com/Vektah/gin

    # Install node packages
    cd $APP_SRC_DIR/js; npm install

    # Build scripts and styles
    cd $APP_SRC_DIR; gulp build

    # go back to the root dir
    cd $APP_SRC_DIR
  fi

  # Execute "gin" command with excluding un-watch directory paths
  # since wathing large number of files causes high CPU usage
  # https://github.com/codegangsta/gin/issues/53
  echo "gulp watch & gin -x _vendor -x static -x js -x scss -x docs"
  exec gulp watch & gin -x _vendor -x static -x js -x scss -x docs
else
  echo "$@"
  exec "$@"
fi
