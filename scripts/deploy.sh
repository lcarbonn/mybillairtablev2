#!/bin/sh
cd /home/eheq1939/repositories/nocolowcobill
echo "Git Pull"
git pull
echo "Generate App"
npm run generate
echo "Copy dist files to website"
cd dist
cp -r * /home/eheq1939/nocolowcobill.lc-consult.fr/