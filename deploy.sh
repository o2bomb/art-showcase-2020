#!/bin/sh
echo "folder to deploy from (dist): "
read DIR_NAME
echo "branch to deploy to (prod): "
read BRANCH_NAME

DIR_NAME="${DIR_NAME:=dist}"
BRANCH_NAME="${BRANCH_NAME:=prod}"

echo "Deploying folder $DIR_NAME to branch $BRANCH_NAME on GitHub"

git subtree push --prefix $DIR_NAME origin $BRANCH_NAME