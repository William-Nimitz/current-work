#!/bin/sh
# target file path => ../src/app/components/new-campaign/new-campaign.component.html

LoopTimes=4
CommitDate=$1
WorkTims=("$@")
WorkTims=${WorkTims[@]:1}
# settings 
Target=./src/app/components/new-campaign/new-campaign.component.html
Destination=./$MAINDIRECTORY/temp/change_4.bak
DestinationOriginal=./$MAINDIRECTORY/temp/change_4_original.bak
CommitMessage=("update new-campaign" "fix new-campaign" "add new-campaign v1" "add new-campaign v10")

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
        echo $CommitTime
        #call git commit commands
        ./$MAINDIRECTORY/git-commands.sh "${CommitMessage[${Time} - 1]}" "$CommitDate" "$CommitTime"

        let Time+=1
    done


