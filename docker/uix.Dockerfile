ARG NODE_VERSION=20.18.0

FROM node:${NODE_VERSION}-alpine

ENV PORT=3000
ENV NODE_ENV=production

COPY /app/uix/.output /.output
RUN chmod -R a+rwX /.output

EXPOSE 3000

CMD [ "node",".output/server/index.mjs" ]