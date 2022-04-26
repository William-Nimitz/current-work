#!/bin/sh
Message=$1
CommitDate=$2
CommitTime=$3

git add .
git commit -m "$Message" --date="$CommitDate$CommitTime"
git push origin