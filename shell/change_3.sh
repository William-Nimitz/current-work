#!/bin/sh
# target file path => ../src/app/components/image-cropper/image-cropper.component.html

LoopTimes=3
CommitDate=$1
WorkTims=("$@")
WorkTims=${WorkTims[@]:1}
# settings 
Target=./src/app/components/image-cropper/image-cropper.component.html
Destination=./$MAINDIRECTORY/temp/change_3.bak
DestinationOriginal=./$MAINDIRECTORY/temp/change_3_original.bak
CommitMessage=("update image-cropper.html" "fix image-cropper.html" "add new function v2")

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