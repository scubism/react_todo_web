#!/bin/bash

# Install go packages with Vektah/gin
gom install github.com/Vektah/gin

# Install node packages
cd $APP_SRC_DIR/scripts; npm install

# Build scripts and styles
cd $APP_SRC_DIR; gulp build

# go back to the root dir
cd $APP_SRC_DIR
