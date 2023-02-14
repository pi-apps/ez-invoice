git restore .
git checkout dev
git pull

sudo docker-compose down
sudo docker-compose up -d --no-deps --build