package main

import (
	"fmt"
	"regexp"
)

func main() {
	re := regexp.MustCompile(`[A-Za-z]+`)
	replaced := re.ReplaceAllString("123abc456def789", "--")

	fmt.Println(replaced) // => "123--456--789"
}
