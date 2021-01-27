doctl registry login
docker tag server.production $IMAGE_REGISTRY/server:$@
docker tag web.production $IMAGE_REGISTRY/web:$@
docker tag loadbalancer $IMAGE_REGISTRY/loadbalancer:$@
docker push $IMAGE_REGISTRY/server:$@
docker push $IMAGE_REGISTRY/web:$@
docker push $IMAGE_REGISTRY/loadbalancer:$@

export TF_VAR_image_tag=$@
terraform -chdir=provider apply -auto-approve
terraform -chdir=accounter apply -auto-approve
