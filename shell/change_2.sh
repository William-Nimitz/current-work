#!/bin/sh
# target file path => ../src/app/components/image-cropper/image-cropper.component.ts

LoopTimes=2
CommitDate=$1
WorkTims=("$@")
WorkTims=${WorkTims[@]:1}
# settings 
Target=./src/app/components/image-cropper/image-cropper.component.ts
Destination=./$MAINDIRECTORY/temp/change_2.bak
DestinationOriginal=./$MAINDIRECTORY/temp/change_2_original.bak
CommitMessage=("update image-cropper" "fix image-cropper" "add new function v1")

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
