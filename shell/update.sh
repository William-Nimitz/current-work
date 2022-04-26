#!/bin/sh
## custom settings 
MAINDIRECTORY=shell ## shell file directory
FROMMONTH=1 ## optional  if > 1, Must START_YEAR == END_YEAR
CurrentLastMonth=3 ## set last month for current Year
LASTMONTHFROMDATE=1
LASTMONTHENDDATE=31
WorkTims=(":T00:30:12" ":T01:10:32" ":T01:30:15" ":T02:10:15" ":T02:37:10" ":T03:12:15" ":T03:45:17" ":T04:00:21"
           ":T04:29:17" ":T05:17:05" ":T05:37:02" ":T06:35:10" ":T07:00:12" ":T08:05:15" ":T08:45:12" ":T09:07:20"
          ":T15:12:19" ":T15:55:21" ":T17:30:20" ":T18:30:17" ":T19:30:50" ":T20:30:21" ":T23:30:19" ":T23:50:19") ##commit time list
CommitProduct=1 ## set Commit times array if 1, use CommitTimes, else TESTCommitTimes
CommitTimes=(2 5 7 9 15) ## commit times  // please refer CommitTimesEveryDay variable
TESTCommitTimes=(2 5) # test version (optional) // please refer CommitTimesEveryDay variable
START_YEAR=2020 # Start Year
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
RestDayPerMonth=4 ## rest 5 for month
WorkDayWhenWeekend=3 ## work 1 /3 for weekend
## Const Section 
MonthEndDate=31 # must 31
Months=12
YEAR=$START_YEAR

FileListToChanged=( "./src/app/components/image-cropper/image-cropper.component.ts"
                    "./src/scss/components/_campaign.scss"
                    "./src/app/components/new-campaign/new-campaign.component.ts"
                    "./src/app/services/conversation.service.ts"
                    "./src/app/components/new-conversation/new-conversation.component.ts")

TestFileListToChanged=( "./src/app/components/image-cropper/image-cropper.component.ts"
                    "./src/scss/components/_campaign.scss")

ChangeFile()
{
    CommitDate=$1
    LoopTimes=$2
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
            # set times every day TESTCommitTimes
            # if [ $CommitProduct -eq 1 ]; 
            #     then
            #     CommitTimesEveryDay=${CommitTimes[ $RANDOM % ${#CommitTimes[@]} ]}
            #     else
            #     CommitTimesEveryDay=${TESTCommitTimes[ $RANDOM % ${#TESTCommitTimes[@]} ]}
            # fi
            CommitTimesEveryDay=${CommitTimes[ $RANDOM % ${#CommitTimes[@]} ]}
            ChangeFile "$YEAR-$StandardMonth-$StandardDate" "$CommitTimesEveryDay"
            # sleep 1

        done
        let MONTH+=1 # increase month
    done
    let YEAR+=1 #increase year
done
