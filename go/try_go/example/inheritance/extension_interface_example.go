package main

import (
	"fmt"
	"time"

	"gopkg.in/robfig/cron.v2"
)

// Go language is not supported extension
// #focus: Next, ExtraMethod, ScheduleInrerface, CronSchedule, MySchedule

func ExtensionInterfaceMain() {
	schedule, _ := cron.Parse("*/5 * * * * *")
	nextTime := schedule.Next(time.Now())
	fmt.Println(nextTime)

	call(CronSchedule{schedule})

	mySchedule := &MySchedule{time: time.Now()}
	call(mySchedule)

	sc := cron.Schedule(CronSchedule{schedule})
	fmt.Println(sc.Next(time.Now()))
}

func call(schedule ScheduleInrerface) {
	nextTime := schedule.Next(time.Now())
	fmt.Println(nextTime)
	schedule.ExtraMethod()
}

// CronSchedule is embedded an interface
type CronSchedule struct {
	cron.Schedule
}

// Next func is not necessary to define

func (s CronSchedule) ExtraMethod() { // interface receiver should not be pointer receiver
	timeZone, _ := time.LoadLocation("Asia/Tokyo")

	fmt.Printf("(CronSchedule) ExtraMethod %v\n", s.Next(time.Now()).In(timeZone))
}

type ScheduleInrerface interface { // or simply Schedule
	Next(now time.Time) time.Time
	ExtraMethod()
}

type MySchedule struct {
	time time.Time
}

func (s *MySchedule) Next(now time.Time) time.Time {
	return s.time
}

func (s *MySchedule) ExtraMethod() {
	fmt.Println("(MySchedule) ExtraMethod")
}
