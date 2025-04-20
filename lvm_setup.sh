#!/bin/bash

set -e

DISK="/dev/sda"
VG_NAME="volGroup"
LV_NAME="linuxProject"
MOUNT_DIR="/mnt/lvm_dir"
DOCKER_VOLUME_NAME="LVM_volume"

echo "🔧 Installing required packages..."
sudo apt update
sudo apt install -y lvm2 docker.io docker-compose

echo "Setting up LVM on $DISK..."

# Create LVM structure
sudo pvcreate $DISK
sudo vgcreate $VG_NAME $DISK
sudo lvcreate -n $LV_NAME -L 5G $VG_NAME
sudo mkfs.ext4 /dev/${VG_NAME}/${LV_NAME}

echo "Mounting LVM volume..."
sudo mkdir -p $MOUNT_DIR
sudo mount /dev/${VG_NAME}/${LV_NAME} $MOUNT_DIR

sudo mkdir $MOUNT_DIR/posgresql_data

# automatic mounts if containers fail
UUID=$(sudo blkid -s UUID -o value /dev/${VG_NAME}/${LV_NAME})
echo "UUID=$UUID $MOUNT_DIR ext4 defaults 0 2" | sudo tee -a /etc/fstab

echo "Creating Docker bind mount volume..."
docker volume create \
  --driver local \
  --opt type=none \
  --opt device=$MOUNT_DIR \
  --opt o=bind \
  $DOCKER_VOLUME_NAME

echo "starting Docker Compose services..."
docker-compose up -d --build

echo "Setup complete. Containers running with persistent storage via LVM."
