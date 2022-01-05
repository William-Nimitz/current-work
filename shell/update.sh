#!/bin/sh
## custom settings 
MAINDIRECTORY=shell ## shell file directory
FROMMONTH=1 ## optional  if > 1, Must START_YEAR == END_YEAR
CurrentLastMonth=4 ## set last month for current Year
LASTMONTHFROMDATE=1
LASTMONTHENDDATE=26
WorkTims=(":T00:30:12" ":T01:10:32" ":T01:30:15" ":T02:10:15" ":T02:37:10" ":T03:12:15" ":T03:45:17" ":T04:00:21"
           ":T04:29:17" ":T05:17:05" ":T05:37:02" ":T06:35:10" ":T07:00:12" ":T08:05:15" ":T08:45:12" ":T09:07:20"
          ":T15:12:19" ":T15:55:21" ":T17:30:20" ":T18:30:17" ":T19:30:50" ":T20:30:21" ":T23:30:19" ":T23:50:19") ##commit time list
CommitProduct=1 ## set Commit times array if 1, use CommitTimes, else TESTCommitTimes
CommitTimes=(2 5 7 9 15) ## commit times  // please refer CommitTimesEveryDay variable
TESTCommitTimes=(2 5) # test version (optional) // please refer CommitTimesEveryDay variable
START_YEAR=2022 # Start Year
END_YEAR=2022   # End Year
HolidayList=("01/01" "01/02" "01/03" "01/17" "01/25"
              "02/21"
              "03/08"
              "04/17"
              "05/08" "05/30"
              "06/04" "06/19" "06/20"
              "07/12"
              "08/10"
              "09/04" "09/05"
              "10/10"
              "11/11" "11/24"  "11/25"
              "12/25" "12/26" "12/28" "12/30" "12/31")
RestDayPerMonth=4 ## rest 4 for month
WorkDayWhenWeekend=3 ## work 1 /3 for weekend

## Const Section 
MonthEndDate=31 # must 31
Months=12
YEAR=$START_YEAR

## Git section
PullCommitRate=4 ## means pull 1 while commit 4
FileListToChanged=( "./src/app/components/image-cropper/image-cropper.component.ts"
                    "./src/scss/components/_campaign.scss"
                    "./src/app/components/new-campaign/new-campaign.component.ts"
                    "./src/app/services/conversation.service.ts"
                    "./src/app/components/new-conversation/new-conversation.component.ts") ## product

TestFileListToChanged=( "./src/app/components/image-cropper/image-cropper.component.ts"
                    "./src/scss/components/_campaign.scss") ## test

COMMITMESSAGELIST=("[Fix] Stripe save"
                    "[Update] feedback for driver manager"
                    "[Update] category reset"
                    "[Fix] validation error"
                    "[Update] get drivers for driver manager"
                    "[Update] category reset"
                    "[Add] EM-112 EM-115"
                    "[Add] EM-117 EM-119"
                    "[Add] EM-201 EM-205"
                    "[Add] EM-405 EM-425"
                    "[Add] EM-501 EM-502"
                    "[Add] EM-101 EM-102"
                    "[Add] EM-105 EM-107"
                    "[Add] XI-271 XI-205 XI-272"
                    "[Add] XI-405 XI-425 XI-427"
                    "[Add] XI-501 XI-502 XI-505"
                    "[Add] XI-101 XI-102 XI-105"
                    "[Add] XI-105 XI-107 XI-110"
                    "[Add] XI-211 XI-212 XI-217"
                    "[Add] XI-257 XI-259 XI-252"
                    "[Add] XI-512 XI-515 XI-517"
                    "[Add] EM-211 EM-212"
                    "[Add] EM-257 EM-259"
                    "[Add] EM-512 EM-515"
                    "[Add] EM-50 EM-51"
                    "[Fix] validation error"
                    "[Update] category reset"
                    "[Feat] Business Wallet Setting"
                    "[Add] EM-71 EM-72"
                    "[Add] EM-80 EM-85"
                    "[Add] EM-99 EM-100"
                    "[Add] DA-112 DA-115"
                    "[Add] DA-117 DA-119"
                    "[Add] DA-271 DA-205"
                    "[Add] DA-405 DA-425"
                    "[Add] DA-501 DA-502"
                    "[Add] DA-101 DA-102"
                    "[Add] DA-105 DA-107"
                    "[Add] DA-211 DA-212"
                    "[Add] DA-257 DA-259"
                    "[Add] DA-512 DA-515"
                    "[Add] DA-50 DA-51"
                    "[Add] DA-71 DA-72"
                    "[Add] DA-80 DA-85"
                    "[Add] DA-99 DA-100"
                    "[Fix] payment error"
                    "[Update] cart reset"
                    "[Feat] Business Wallet Setting"
                    "[Add] CA-105 CA-107 CA-102"
                    "[Add] CA-211 CA-212 CA-215"
                    "[Add] CA-257 CA-259 CA-260"
                    "[Add] CA-512 CA-515 CA-517"
                    "[Add] CA-50 CA-51 CA-52"
                    "[Add] CA-71 CA-72 CA-75"
                    "[Add] CA-80 CA-85 CA-87"
                    "[Add] CA-99 CA-100 CA-101"
                    "[Add] CA-112 CA-115 CA-119"
                    "[Add] CA-117 CA-120 CA-121"
                    "[Add] CA-271 CA-205 CA-272"
                    "[Add] CA-405 CA-425 CA-427"
                    "[Add] CA-501 CA-502 CA-505"
                    "[Add] CA-101 CA-102 CA-105"
                    "[Add] CA-105 CA-107 CA-110"
                    "[Add] CA-211 CA-212 CA-217"
                    "[Add] CA-257 CA-259 CA-252"
                    "[Add] CA-512 CA-515 CA-517"
                    "[Add] CA-50 CA-51"
                    "[Add] CA-71 CA-72"
                    "[Add] CA-80 CA-85 CA-87"
                    "[Add] CA-99 CA-100 CA-107")

GLOBAL_COMMIT_TIMES=0
GGG_Call()
{
    let GLOBAL_COMMIT_TIMES+=1
    GGGCommitDate=$1
    GGGCommitTime=$2

    # Commit section
    MessageNum=$(( $GLOBAL_COMMIT_TIMES % ${#COMMITMESSAGELIST[@]}))
    git add .
    git commit -m "${COMMITMESSAGELIST[$MessageNum]}" --date="$GGGCommitDate$GGGCommitTime"
    git push origin

    # pull request 
    if [ $(($MessageNum % $PullCommitRate)) -eq 0 ]; 
        then
        git push origin
    fi
}

ChangeFile()
{
    CommitDate=$1
    CommitTimesIndex=$2

    Target=${FileListToChanged[$CommitTimesIndex]}   ## product
    # Target=${TestFileListToChanged[$CommitTimesIndex]} ## test

    LoopTimes=${CommitTimes[$CommitTimesIndex]}      ## product
    # LoopTimes=${TESTCommitTimes[$CommitTimesIndex]}    ## test

    Time=1
    while [ $Time -le $LoopTimes ]
    do
        echo ____________$Time times____________

        if [ `expr $Time % 2` != 0 ]; 
            then
            Destination="./$MAINDIRECTORY/temp/change_$LoopTimes.bak"
            else
            Destination="./$MAINDIRECTORY/temp/change_$LoopTimes-original.bak"
        fi

        echo -n "" > $Target
        echo "$Target //$RANDOM" >> $Target
        while read line
        do
            echo $line >> $Target
        done < $Destination
        
        CommitTimeRand=${WorkTims[ $RANDOM % ${#WorkTims[@]} ]}
        #call git commit commands
        GGG_Call "$CommitDate" "$CommitTimeRand"

        let Time+=1
    done
}

if [ $FROMMONTH -gt 1 ] && [ $START_YEAR -ne $END_YEAR ]; 
    then
    echo If FROMMONTH=0, START_YEAR must same END_YEAR
    exit;
fi

AllWeekendRest=0
# year loop
while [ $YEAR -le $END_YEAR ]
do
    echo ---------------------------------------- $YEAR ----------------------------------------
    # check current year and apply first and last month
    if [ $YEAR -lt $END_YEAR ]; 
        then
        MONTH=1
        LastMonth=12
        else
        MONTH=$FROMMONTH
        LastMonth=$CurrentLastMonth
    fi
    #month loop
    while [ $MONTH -le $LastMonth ]
    do
        StandardMonth=0$MONTH
        StandardMonth=${StandardMonth: -2}

        echo -------------------- $YEAR-$StandardMonth --------------------
        # check current year and last month and apply first date and last date
        if [ $YEAR -eq $END_YEAR ] && [ $MONTH -eq $LastMonth ]; 
            then
            FROMDATE=$LASTMONTHFROMDATE
            LASTDATE=$LASTMONTHENDDATE
            else
            FROMDATE=1
            LASTDATE=$(date -d "$YEAR/$StandardMonth/01 + 1 month - 1 day" "+%d")
        fi

        #get random rest days per month
        RandomRESTDAYS=()
        for ii in $( eval echo {1..$RestDayPerMonth} )
        do
            RESTDAY=0$(( $FROMDATE + $RANDOM % ($LASTDATE - $FROMDATE + 1) ))
            RESTDAY=${RESTDAY: -2}
            RandomRESTDAYS+=("$RESTDAY")
        done

        #date loop
        while [ $FROMDATE -le $LASTDATE ]
        do
            StandardDate=0$FROMDATE
            StandardDate=${StandardDate: -2}
            
            let FROMDATE+=1 # increase date
            # remove holidays
            if [[ " ${HolidayList[@]} " =~ " $StandardMonth/$StandardDate " ]]; 
                then
                continue
            fi
            # remove random rest days
            if [[ " ${RandomRESTDAYS[@]} " =~ " $StandardDate " ]]; 
                then
                continue
            fi

            # get weekday and remove
            YYYYMMDD=$YEAR/$StandardMonth/$StandardDate
            WEEKDAY=$(date -d "$YYYYMMDD" '+%u')
            if [ $WEEKDAY -ge 6 ]; 
                then
                    let AllWeekendRest+=1
                    if [ $(($AllWeekendRest % $WorkDayWhenWeekend)) -ne 0 ]; 
                        then
                        continue
                    fi
            fi
            echo ______________________________________________ $YEAR-$StandardMonth-$StandardDate ___________________________________________

            # timeloop
            # set times every day CommitTimes
            # if [ $CommitProduct -eq 1 ]; 
            #     then
            #     CommitTimesRand=$(($RANDOM % ${#CommitTimes[@]}))
            #     else
            #     CommitTimesRand=$(($RANDOM % ${#TESTCommitTimes[@]}))
            # fi
            CommitTimesRand=$(($RANDOM % ${#CommitTimes[@]})) ## product
            # CommitTimesRand=$(($RANDOM % ${#TESTCommitTimes[@]})) ## test
            ChangeFile "$YEAR-$StandardMonth-$StandardDate" "$CommitTimesRand"
            # sleep 1

        done
        let MONTH+=1 # increase month
    done
    let YEAR+=1 #increase year
done
