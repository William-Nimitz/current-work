#!/bin/sh
# target file path => ../src/app/services/conversation.service.ts

LoopTimes=9
CommitDate=$1
WorkTims=("$@")
WorkTims=${WorkTims[@]:1}
# settings 
Target=./src/app/services/conversation.service.ts
Destination=./$MAINDIRECTORY/temp/change_9.bak
DestinationOriginal=./$MAINDIRECTORY/temp/change_9_original.bak
CommitMessage=("update conversation" "fix conversation" "add new function v1.5" "add new function CS121"
            "add new function CS145" "add new function CS147" "add new function CS150" "add new function CS155" "add new function CS157")

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