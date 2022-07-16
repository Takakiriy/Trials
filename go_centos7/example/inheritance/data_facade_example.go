package main

import (
	"fmt"
	"time"

	"gopkg.in/robfig/cron.v2"
)

// Go language is not supported extension
// #focus: NextTime_, ScheduleFacade, NextTime, ExtraMethod

func DataFacadeMain() {
	schedule, _ := cron.Parse("*/5 * * * * *")
	nextTime := schedule.Next(time.Now())
	fmt.Println(nextTime)

	callWithFacade(CastToScheduleFacade(schedule))

	mySchedule := &ScheduleFacade{NextTime_: time.Now()}
	callWithFacade(mySchedule)
}

func callWithFacade(schedule *ScheduleFacade) {
	fmt.Println(schedule.NextTime_)
	schedule.ExtraMethod()
}

// ScheduleFacade has usable variables for the application
type ScheduleFacade struct {
	NextTime_ time.Time
	cron.Schedule
}

func CastToScheduleFacade(cron cron.Schedule) *ScheduleFacade {
	s := &ScheduleFacade{
		Schedule: cron,
	}
	s.NextTime_ = s.NextTime()
	return s
}

func (s ScheduleFacade) NextTime() time.Time { // interface receiver should not be pointer receiver
	return s.Next(time.Now())
}

func (s *ScheduleFacade) ExtraMethod() {
	timeZone, _ := time.LoadLocation("Asia/Tokyo")

	fmt.Printf("(ScheduleFacade) ExtraMethod %v\n", s.NextTime_.In(timeZone))
}
