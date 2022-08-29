package main

import (
	"fmt"
	"time"

	"gopkg.in/robfig/cron.v2"
)

// Go language is not supported extension
// #focus: NextTime_, ScheduleMemo, NextTime, ExtraMethod

func ExtensionMemoMain() {
	schedule_, _ := cron.Parse("*/5 * * * * *")
	nextTime := schedule_.Next(time.Now())
	fmt.Println(nextTime)

	schedule := CastToScheduleMemo(schedule_)
	fmt.Println(schedule.NextTime_)
	fmt.Println(schedule.NextTime())
	schedule.ExtraMethod()
}

// ScheduleMemo has usable variables for the application
type ScheduleMemo struct {
	NextTime_ time.Time
	cron.Schedule
}

func CastToScheduleMemo(cron cron.Schedule) *ScheduleMemo {
	s := &ScheduleMemo{
		Schedule: cron,
	}
	s.NextTime_ = s.NextTime()
	return s
}

func (s ScheduleMemo) NextTime() time.Time { // interface receiver should not be pointer receiver
	return s.Next(time.Now())
}

func (s *ScheduleMemo) ExtraMethod() {
	timeZone, _ := time.LoadLocation("Asia/Tokyo")

	fmt.Printf("(ScheduleMemo) ExtraMethod %v\n", s.NextTime_.In(timeZone))
}
