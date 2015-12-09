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
# Run and login to the container
docker-compose --x-networking -f docker-compose.yml -f docker-compose.dev.yml run -p $REACT_TODO_WEB_PORT:3000 --rm react_todo_web bash

# Install npm packages in the outer install dir and exit from the container
cd $APP_NO_LINKS_SRC_DIR; npm install

# Run the app
cd $APP_SRC_DIR; ./docker-entrypoint.sh dev
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

- Show a fancy loader on loading
- Error handling with modal dialog
- Enable color setting with a color picker
- Enable csv import and export (with API server)
- Enable due date setting
- Enable checking and filter checked todos
- Enable tagging
- Search todos with autocomplete
- Tree structure for todos
- User login
