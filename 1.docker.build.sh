#!/bin/bash
echo -e "\nBase Directory and Filename..."
BASEDIR00="$( cd "$( dirname "$0" )" && pwd )"
CURRDIR00=${BASEDIR00##*/}
FILENAME0=`basename $0`; FILE=$(echo $FILENAME0 | cut -d '.' -f 1)
echo [$BASEDIR00] [$CURRDIR00] [$FILENAME0] [$FILE]
echo "......."
rm .env
cp .env.development .env
docker build . --progress=plain --tag $CURRDIR00
docker rmi -f $(docker images | grep "<none>" | awk "{print \$3}")
docker images
exit 0
