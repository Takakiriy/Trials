package main

import (
	"fmt"
	"time"

	"gopkg.in/robfig/cron.v2"
)

// Go language is not supported extension
// #focus: Next, ExtraMethod, ScheduleEx

func ExtensionMain() {
	schedule, _ := cron.Parse("*/5 * * * * *")
	nextTime := schedule.Next(time.Now())
	fmt.Println(nextTime)

	nextTime = ScheduleEx{schedule}.Next(time.Now()) // same as schedule.Next
	fmt.Println(nextTime)
	ScheduleEx{schedule}.ExtraMethod()
}

// ScheduleEx is embedded an interface
type ScheduleEx struct {
	cron.Schedule
}

// Next func is not necessary to define

func (s ScheduleEx) ExtraMethod() { // interface receiver should not be pointer receiver
	timeZone, _ := time.LoadLocation("Asia/Tokyo")

	fmt.Printf("(ScheduleEx) ExtraMethod %v\n", s.Next(time.Now()).In(timeZone))
}
