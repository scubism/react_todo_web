FROM golang:1.5.1

MAINTAINER scubism

# set main app directory
ENV APP_SRC_DIR="/usr/src/app"
WORKDIR ${APP_SRC_DIR}
VOLUME [${APP_SRC_DIR}]

# set go path settings
# TODO ENV GO15VENDOREXPERIMENT 1
ENV GOPATH $GOPATH:${APP_SRC_DIR}/_vendor
ENV PATH $PATH:${APP_SRC_DIR}/_vendor/bin

# set common go settings
RUN go get github.com/mattn/gom
ENV GIN_MODE "release"

# === install node.js ===

# verify gpg and sha256: http://nodejs.org/dist/v0.10.31/SHASUMS256.txt.asc
# gpg: aka "Timothy J Fontaine (Work) <tj.fontaine@joyent.com>"
# gpg: aka "Julien Gilli <jgilli@fastmail.fm>"
RUN set -ex \
	&& for key in \
		7937DFD2AB06298B2293C3187D33FF9D0246406D \
		114F43EE0176B71C7BC219DD50A3051F888C628D \
	; do \
		gpg --keyserver ha.pool.sks-keyservers.net --recv-keys "$key"; \
	done
ENV NODE_VERSION 0.10.40
ENV NPM_VERSION 2.14.1
RUN curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz" \
	&& curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc" \
	&& gpg --verify SHASUMS256.txt.asc \
	&& grep " node-v$NODE_VERSION-linux-x64.tar.gz\$" SHASUMS256.txt.asc | sha256sum -c - \
	&& tar -xzf "node-v$NODE_VERSION-linux-x64.tar.gz" -C /usr/local --strip-components=1 \
	&& rm "node-v$NODE_VERSION-linux-x64.tar.gz" SHASUMS256.txt.asc \
	&& npm install -g npm@"$NPM_VERSION" \
	&& npm cache clear

# patch for windows sync folder problem on building gulp
ENV APP_NO_LINKS_SRC_DIR "/usr/src/app-no-links"
RUN mkdir $APP_NO_LINKS_SRC_DIR

# node settings
ENV NODE_PATH $NODE_PATH:"${APP_SRC_DIR}/js/node_modules:${APP_NO_LINKS_SRC_DIR}/node_modules"
RUN npm install -g gulp

# === app specific settings ===

COPY . ${APP_SRC_DIR}
RUN gom install

RUN ln -s $APP_SRC_DIR/package.json $APP_NO_LINKS_SRC_DIR/package.json
RUN ln -s $APP_SRC_DIR/gulpfile.js $APP_NO_LINKS_SRC_DIR/gulpfile.js

# bin-links should be disabled for windows sync folder problem
RUN npm config set bin-links=false
RUN cd $APP_NO_LINKS_SRC_DIR; npm install
RUN cd $APP_SRC_DIR/js; npm install
RUN npm config set bin-links=true

RUN cd $APP_SRC_DIR; gulp dist
RUN cd $APP_SRC_DIR

EXPOSE 3000

ENTRYPOINT ["./docker-entrypoint.sh"]
