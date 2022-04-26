#!/bin/sh
# target file path => ../src/app/components/new-conversation/new-conversation.component.html

LoopTimes=10
CommitDate=$1
WorkTims=("$@")
WorkTims=${WorkTims[@]:1}
# settings 
Target=./src/app/components/new-conversation/new-conversation.component.html
Destination=./$MAINDIRECTORY/temp/change_10.bak
DestinationOriginal=./$MAINDIRECTORY/temp/change_10_original.bak
CommitMessage=("update new-conversation" "fix new-conversation" "add new function v1.7" "add new function NC200" "add new function NC201"
                "add new function NC202" "add new function NC203" "add new function NC205" "add new function NC207" "add new function NC210")

Time=1
while [ $Time -le $LoopTimes ]
do
    echo ____________$Time times____________

    if [ `expr $Time % 2` != 0 ]; 
        then
        Destination=$Destination
        else
        Destination=$DestinationOriginal
    fi

    echo -n "" > $Target
    while read line
        do
            echo $line >> $Target
        done < $Destination
    
    CommitTime=${WorkTims[ $RANDOM % ${#WorkTims[@]} ]}
    #call git commit commands
    ./$MAINDIRECTORY/git-commands.sh "${CommitMessage[${Time} - 1]}" "$CommitDate" "$CommitTime"

    let Time+=1
done