#!/bin/sh
echo "Git Pull"
git pull
echo "Generate App"
npm run generate
echo "Copy dist files to website"
export DEPLOYPATH=/home/eheq1939/nocolowcobill.lc-consult.fr/
/bin/cp -R dist/* $DEPLOYPATH