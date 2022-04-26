#!/bin/sh
# target file path => ../src/app/components/new-conversation/new-conversation.component.ts

LoopTimes=15
CommitDate=$1
WorkTims=("$@")
WorkTims=${WorkTims[@]:1}
# settings 
Target=./src/app/components/new-conversation/new-conversation.component.ts
Destination=./$MAINDIRECTORY/temp/change_15.bak
DestinationOriginal=./$MAINDIRECTORY/temp/change_15_original.bak
CommitMessage=("update new-conversation-1" "fix new-conversation-1" "add new function v1.9" "add new function NC500" "add new function NC500"
                "add new function NC501" "add new function NC502" "add new function NC505" "add new function NC507" "add new function NC515"
                "add new function NC517" "add new function NC519" "add new function NC520" "add new function NC555" "add new function NC557")

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