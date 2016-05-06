FROM node:6-onbuild

# === Set app specific settings ===

COPY . .

RUN npm install && npm run build

EXPOSE 8080 9090

ENTRYPOINT ["./docker-entrypoint.sh"]
