package main

import (
	"fmt"
	"time"

	"gopkg.in/robfig/cron.v2" // go get gopkg.in/robfig/cron.v2
)

func main() {
	schedule, _ := cron.Parse("*/5 * * * * *")
	timeZone, _ := time.LoadLocation("Asia/Tokyo")

	now := time.Now().In(timeZone)
	fmt.Println(now)

	nextTime := schedule.Next(now)
	timerUntilNextTime := time.NewTimer(nextTime.Sub(now))
	<-timerUntilNextTime.C // Wait for (nextTime - now)
	fmt.Println(nextTime)

	duration := nextTime.Sub(now)
	fmt.Println(duration.String())
}
