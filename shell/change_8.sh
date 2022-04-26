#!/bin/sh
# target file path => ../src/app/components/edit-campaigns/edit-campaigns.component.ts

LoopTimes=8
CommitDate=$1
WorkTims=("$@")
WorkTims=${WorkTims[@]:1}
# settings 
Target=./src/app/components/edit-campaigns/edit-campaigns.component.ts
Destination=./$MAINDIRECTORY/temp/change_8.bak
DestinationOriginal=./$MAINDIRECTORY/temp/change_8_original.bak
CommitMessage=("update edit-campaigns" "fix edit-campaigns" "add new function v2.2" "add new function EC120" 
              "add new function EC121" "add new function EC122" "add new function EC125" "add new function EC125")

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