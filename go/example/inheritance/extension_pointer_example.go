package main

import (
	"fmt"
	"regexp"
)

func ExtensionPointerMain() {
	re := regexp.MustCompile(`[A-Za-z]+`)
	replaced := RegExpEx{re}.ReplaceToHyphen("123abc456def789")
	fmt.Println(replaced) // => "123--456--789"

	replaced = re.ReplaceAllString("123abc456def789", "--")
	fmt.Println(replaced) // => "123--456--789"

	replaced = RegExpEx{re}.ReplaceAllString("123abc456def789", "--")
	fmt.Println(replaced) // => "123--456--789"
}

type RegExpEx struct {
	*regexp.Regexp
}

func (s RegExpEx) ReplaceToHyphen(source string) string {
	return s.ReplaceAllString(source, "--")
}

// func (s *regexp.Regexp) ReplaceToHyphen(source string) string { // error
// 	return s.ReplaceAllString(source, "--")
// }
