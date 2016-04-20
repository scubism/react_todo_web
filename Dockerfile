FROM scubism/go_node_base:latest

RUN npm install -g gulp
RUN go get github.com/gin-gonic/gin

# === Set app specific settings ===

ENV IMPORT_PATH="todo_center/react_todo_web"

WORKDIR $GOPATH/src/$IMPORT_PATH

COPY . $GOPATH/src/$IMPORT_PATH

# For Node

ENV APP_SRC_DIR=$GOPATH/src/$IMPORT_PATH
ENV APP_NODE_MODULES_DIR /app_node_modules
ENV NODE_PATH $NODE_PATH:"${APP_SRC_DIR}/js/node_modules:${APP_NODE_MODULES_DIR}/node_modules"

RUN mkdir $APP_NODE_MODULES_DIR \
  && ln -s $APP_SRC_DIR/package.json $APP_NODE_MODULES_DIR/package.json \
  && ln -s $APP_SRC_DIR/gulpfile.js $APP_NODE_MODULES_DIR/gulpfile.js \
  && cd $APP_NODE_MODULES_DIR \
  && npm config set bin-links=false \
  && npm install \
  && npm config set bin-links=true
RUN cd $APP_SRC_DIR/js \
  && npm install \
  && cd $APP_SRC_DIR \
  && gulp build \
  && gulp dist

VOLUME $GOPATH/src/$IMPORT_PATH

EXPOSE 3000

ENTRYPOINT ["./docker-entrypoint.sh"]
