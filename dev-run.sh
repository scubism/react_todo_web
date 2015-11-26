#!/bin/bash

# Execute "gin" command with excluding un-watch directory paths
# since wathing large number of files causes high CPU usage
# https://github.com/codegangsta/gin/issues/53
gulp watch  & gin -x _vendor -x static -x js -x scss -x docs &
