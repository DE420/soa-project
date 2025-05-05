FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY ./frontend /usr/share/nginx/html

RUN sed -i 's/80/3000/g' /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
