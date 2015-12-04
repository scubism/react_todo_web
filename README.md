# React Todo Web

A TODO Web client based on react.js framework.

See [the central repository](https://github.com/scubism/todo_center) for installation.

# Tips

## How to install a new npm package?

```
# Edit package.json to insert the new package definition with version specified in dependencies section
cd /path/to/todo_center
vi react_todo_web/package.json

# Run and login to the container without --rm option
docker-compose --x-networking -f docker-compose.yml -f docker-compose.dev.yml run -p $REACT_TODO_WEB_PORT:3000 react_todo_web bash

# Install npm packages on an outer dir and exit from the container
cd $APP_NO_LINKS_SRC_DIR; npm install
exit

# Rename the old image
docker tag vagrant_react_todo_web vagrant_react_todo_web_123
docker rmi vagrant_react_todo_web
# (Note that the prefix "vagrant_" will be changed to the top directory name)

# Commit the new image
docker commit xxx vagrant_react_todo_web
# where xxx is the container name or hash shown by "docker ps -a" command
```

If the package is heavy and its AMD package is provided, take the following steps.

```
# Edit package.json to insert the new package definition with its global variable name in browserify-shim section
vi react_todo_web/package.json

# Edit index template and insert a script tag to link the AMD module
vi react_todo_web/templates/index.tmpl

# Save the container image as described above
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
