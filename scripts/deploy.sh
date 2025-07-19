#!/bin/sh
echo "generate app"
npm run generate
echo "copy dist files to website"
export DEPLOYPATH=/home/eheq1939/nocolowcobill.lc-consult.fr/
/bin/cp -R dist/* $DEPLOYPATH