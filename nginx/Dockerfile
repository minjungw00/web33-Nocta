FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Nginx 기본 설정 복사
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# 정적 파일을 호스트에서 복사
COPY ./client/dist .

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]