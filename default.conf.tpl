upstream backend {
    server backend:5000;
}

upstream frontend {
    server frontend:4173;
}

server {
    listen 80;
    location / {
        proxy_pass http://frontend;
    }
    location /sockjs-node {
        proxy_pass http://frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
    }
    location /api {
        rewrite /back-end/(.*) /$1 break;
        proxy_pass http://backend;
    }
}
