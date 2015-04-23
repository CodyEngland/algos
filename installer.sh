#!/bin/bash

# install basic components for Ubuntu
sudo apt-get update -q
DEBIAN_FRONTEND=noninteractive sudo apt-get install -y -q python-dev liblzma-dev libevent1-dev libldap2-dev libsasl2-dev libev-dev libssl-dev libyaml-0-2 libyaml-dev

curl -sSL https://get.docker.com/ubuntu/ | sudo sh

# Enable sudo-less Docker
sudo gpasswd -a vagrant docker
sudo service docker restart
sudo sleep 1

docker pull ubuntu:14.04

# Install pip and virtualenv
curl -sSL https://bootstrap.pypa.io/get-pip.py | sudo python
pip install virtualenv

# setup our virtualenv
virtualenv venv
chown -R vagrant:vagrant venv

cd /home/vagrant/algos-index
docker build -t docker.algos.com/algos-index .

cd /home/vagrant/algos-ui
docker build -t docker.algos.com/algos-ui .

cd /home/vagrant/venv
source bin/activate
pip install fig
