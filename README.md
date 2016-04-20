# React Todo Web

A TODO Web client based on react.js framework.

See [the central repository](https://github.com/scubism/todo_center) for installation.

# Tips

## How to install npm packages?

```
# Edit package.json to insert a new package definition with version specified in "dependencies" section
vi react_todo_web/package.json
```

For production, recreate the image.

For development:

```
CONTAINER=react_todo_web
docker rm -f $CONTAINER
docker-compose -f docker-compose.yml -f docker-compose-dev.yml up -d $CONTAINER
docker exec -it $CONTAINER bash

# Install npm packages in the outer install dir and exit from the container
cd $APP_NODE_MODULES_DIR; npm install

# Run the app
cd $APP_SRC_DIR; ./docker-entrypoint.sh
```

If the package is heavy and its AMD package is provided, take the following steps.

```
# Edit package.json to insert the new package definition with its global name in "browserify-shim" section
vi react_todo_web/package.json

# Edit index template and insert a script tag to link an AMD package
vi react_todo_web/templates/index.tmpl
# The AMD package can be found in cdns such as https://cdnjs.cloudflare.com,
# or in installed node_modules/.../dist dir.
# For the latter, plase copy the dir to static/dist/ and add it to the git repo.

# Recreate the image or run the dev container as described above
```


## Roadmap

- Enable csv import and export (with API server)
- Enable checking and filter checked todos
- Enable tagging
- Search todos with autocomplete
- Tree structure for todos
- User login
