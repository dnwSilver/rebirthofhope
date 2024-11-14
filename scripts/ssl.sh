#https://firstvds.ru/technology/ustanovka-ssl-sertifikata-lets-encrypt-na-server-bez-paneli-upravleniya#debianubuntu
apt install certbot python3-certbot-nginx
# certbot --nginx -d rebirthofhope.ru -d www.rebirthofhope.ru


crontab -e
# 30 4 * * * /usr/bin/certbot renew --quiet

certbot --manual --agree-tos --manual-public-ip-logging-ok --preferred-challenges dns certonly --server https://acme-v02.api.letsencrypt.org/directory -d *.rebirthofhope.ru -d rebirthofhope.ru
