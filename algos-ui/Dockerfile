# Nginx Using "Official" Nginx from Docker

FROM nginx

# Define working directory.
RUN rm -v /etc/nginx/nginx.conf
COPY nginx/nginx.conf /etc/nginx/nginx.conf

WORKDIR /etc/nginx

# Remove default config
RUN rm -v /etc/nginx/nginx.conf

# Define default command.
CMD ["nginx"]

# Expose ports.
EXPOSE 80
