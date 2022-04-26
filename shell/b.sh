#!/bin/bash
FROMDATE=5
StandardDate=0$FROMDATE
# StandardDate+=$FROMDATE
StandardDate=${StandardDate: -2}

echo $StandardDate