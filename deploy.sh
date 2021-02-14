doctl registry login
docker tag server.production $IMAGE_REGISTRY/server:$@
docker tag web.production $IMAGE_REGISTRY/web:$@
docker tag loadbalancer $IMAGE_REGISTRY/loadbalancer:$@
docker tag connector.development $IMAGE_REGISTRY/connector:$@
docker push $IMAGE_REGISTRY/server:$@
docker push $IMAGE_REGISTRY/web:$@
docker push $IMAGE_REGISTRY/loadbalancer:$@
docker push $IMAGE_REGISTRY/connector:$@

export TF_VAR_app_version=$@
terraform -chdir=provider apply -auto-approve
terraform -chdir=accounter apply -auto-approve
