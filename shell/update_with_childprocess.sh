#!/bin/sh
# custom settings 
export MAINDIRECTORY=shell ## shell file directory
CurrentTillLastMonths=(1 2 3 4) ## example (1 2 3 4 ...)
WorkTims=("T00:30:12" "T01:10:32" "T01:30:15" "T02:10:15" "T02:37:10" "T03:12:15" "T03:45:17" "T04:00:21"
           "T04:29:17" "T05:17:05" "T05:37:02" "T06:35:10" "T07:00:12" "T08:05:15" "T08:45:12" "T09:07:20"
          "T15:12:19" "T15:55:21" "T17:30:20" "T18:30:17" "T19:30:50" "T20:30:21" "T23:30:19" "T23:50:19") ##commit time list
CommitProduct=1 ## set Commit times array if 1, use CommitTimes, else TESTCommitTimes
CommitTimes=(4 5 7 8 9 10 15 ) ## commit times  // please refer CommitTimesEveryDay variable
TESTCommitTimes=(2) # test version (optional) // please refer CommitTimesEveryDay variable
START_YEAR=2020 # Start Year
END_YEAR=2022   # End Year

MonthEndDate=31 # must 31
Months=(1 2 3 4 5 6 7 8 9 10 11 12)
YEAR=$START_YEAR

while [ $YEAR -le $END_YEAR ]
do
  # year loop
  echo ----------------- $YEAR Year -----------------

  #month loop
  # check current year and apply last month
  if [ $YEAR -lt $END_YEAR ]; 
    then
      MonthArr=${Months[@]}
    else
      MonthArr=${CurrentTillLastMonths[@]}
  fi

  for MONTH in ${MonthArr[@]}
    do
      echo
      echo ---------- $MONTH Month ----------
      
      StandardMonth=0
      StandardMonth+=$MONTH
      StandardMonth=${StandardMonth: -2}
      #day loop
      # check month end date 
      case $MONTH in
        1) RealMonthDate=$MonthEndDate ;;
        2) RealMonthDate=28 ;;
        3) RealMonthDate=$MonthEndDate ;;
        4) RealMonthDate=$(($MonthEndDate - 1 )) ;;
        5) RealMonthDate=$MonthEndDate ;;
        6) RealMonthDate=$(($MonthEndDate - 1 )) ;;
        7) RealMonthDate=$MonthEndDate ;;
        8) RealMonthDate=$MonthEndDate ;;
        9) RealMonthDate=$(($MonthEndDate - 1 )) ;;
        10) RealMonthDate=$MonthEndDate ;;
        11) RealMonthDate=$(($MonthEndDate - 1 )) ;;
        12) RealMonthDate=$MonthEndDate ;;
        *) RealMonthDate=$(($MonthEndDate - 1 )) ;;
      esac

      dd=1
      while [ $dd -le $RealMonthDate ]
        do
          echo --$dd date ---
          StandardDate=0
          StandardDate+=$dd
          StandardDate=${StandardDate: -2}
          #timeloop
          # set times every day TESTCommitTimes
          if [ $CommitProduct -eq 1 ]; 
            then
              CommitTimesEveryDay=${CommitTimes[ $RANDOM % ${#CommitTimes[@]} ]}
            else
              CommitTimesEveryDay=${TESTCommitTimes[ $RANDOM % ${#TESTCommitTimes[@]} ]}
          fi
          # everyTime=1
          # while [ $everyTime -le $CommitTimesEveryDay ]
          #   do
          #     echo $everyTime times
          #     let "everyTime+=1"
          #   done
          case $CommitTimesEveryDay in
            2) ./$MAINDIRECTORY/change_2.sh "$YEAR-$StandardMonth-$StandardDate" "${WorkTims[@]}";;
            3) ./$MAINDIRECTORY/change_3.sh "$YEAR-$StandardMonth-$StandardDate" "${WorkTims[@]}";;
            4) ./$MAINDIRECTORY/change_4.sh "$YEAR-$StandardMonth-$StandardDate" "${WorkTims[@]}";;
            5) ./$MAINDIRECTORY/change_5.sh "$YEAR-$StandardMonth-$StandardDate" "${WorkTims[@]}";;
            7) ./$MAINDIRECTORY/change_7.sh "$YEAR-$StandardMonth-$StandardDate" "${WorkTims[@]}";;
            8) ./$MAINDIRECTORY/change_8.sh "$YEAR-$StandardMonth-$StandardDate" "${WorkTims[@]}";;
            9) ./$MAINDIRECTORY/change_9.sh "$YEAR-$StandardMonth-$StandardDate" "${WorkTims[@]}";;
            10) ./$MAINDIRECTORY/change_10.sh "$YEAR-$StandardMonth-$StandardDate" "${WorkTims[@]}";;
            15) ./$MAINDIRECTORY/change_15.sh "$YEAR-$StandardMonth-$StandardDate" "${WorkTims[@]}";;
            *) ./$MAINDIRECTORY/change_5.sh "$YEAR-$StandardMonth-$StandardDate" "${WorkTims[@]}";;
          esac
          sleep 1
          let "dd+=1"
        done
    done
  let YEAR+=1 #increase year
done

# git push origin
