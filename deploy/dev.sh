cd ~/ez-invoice

git restore .
git checkout dev
git pull

docker-compose build
docker-compose up -d