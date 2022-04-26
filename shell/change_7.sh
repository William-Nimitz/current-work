#!/bin/sh
# target file path => ../src/app/components/new-campaign/new-campaign.component.ts

LoopTimes=7
CommitDate=$1
WorkTims=("$@")
WorkTims=${WorkTims[@]:1}
# settings 
Target=./src/app/components/new-campaign/new-campaign.component.ts
Destination=./$MAINDIRECTORY/temp/change_7.bak
DestinationOriginal=./$MAINDIRECTORY/temp/change_7_original.bak
CommitMessage=("update new-campaign" "fix new-campaign" "add new function v2" "add new function NC120" "add new function NC121" "add new function NC122" "add new function NC125")

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