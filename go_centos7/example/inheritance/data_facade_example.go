package main

import (
	"fmt"
	"time"

	"gopkg.in/robfig/cron.v2"
)

// Go language is not supported extension
// #focus: NextTime, ExtraMethod, ScheduleFacade, CronScheduleEx

func DataFacadeMain() {
	schedule, _ := cron.Parse("*/5 * * * * *")
	nextTime := schedule.Next(time.Now())
	fmt.Println(nextTime)

	callWithFacade(CastToScheduleFacade(schedule))

	mySchedule := &ScheduleFacade{NextTime: time.Now()}
	callWithFacade(mySchedule)
}

func callWithFacade(schedule *ScheduleFacade) {
	fmt.Println(schedule.NextTime)
	schedule.ExtraMethod()
}

// ScheduleFacade has usable variables for the application
type ScheduleFacade struct {
	NextTime time.Time
	cron     cron.Schedule // object or nils
}

func CastToScheduleFacade(cron cron.Schedule) *ScheduleFacade {
	schedule := CronScheduleEx{cron}

	return &ScheduleFacade{
		NextTime: schedule.NextTime(),
		cron:     cron,
	}
}

func (s *ScheduleFacade) ExtraMethod() {
	timeZone, _ := time.LoadLocation("Asia/Tokyo")

	fmt.Printf("(ScheduleFacade) ExtraMethod %v\n", s.NextTime.In(timeZone))
}

// CronScheduleEx is embedded an interface
type CronScheduleEx struct {
	cron.Schedule
}

func (s CronScheduleEx) NextTime() time.Time { // interface receiver should not be pointer receiver
	return s.Next(time.Now())
}
