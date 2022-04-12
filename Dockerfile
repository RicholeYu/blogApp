FROM node
COPY ./ /blog
WORKDIR /blog
RUN yarn
RUN yarn build
EXPOSE 3000
VOLUME ["/root/richoleBlog"]
CMD yarn docker-run