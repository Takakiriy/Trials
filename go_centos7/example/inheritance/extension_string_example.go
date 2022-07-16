package main

import (
	"fmt"
)

// Go language is not supported extension
// #focus: ExtraMethod, MyString

func ExtensionStringMain() {
	s := MyString("str")
	s.ExtraMethod()
}

type MyString string

func (m MyString) ExtraMethod() {
	fmt.Println(m)
}
