#!/bin/sh
# target file path => ../src/scss/components/_campaign.scss

LoopTimes=5
CommitDate=$1
WorkTims=("$@")
WorkTims=${WorkTims[@]:1}
# settings 
Target=./src/scss/components/_campaign.scss
Destination=./$MAINDIRECTORY/temp/change_5.bak
DestinationOriginal=./$MAINDIRECTORY/temp/change_5_original.bak
CommitMessage=("update campaign CM115" "campaign CM117" "campaign CM119" "fix campaign CM117" "fix campaign CM119")

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
