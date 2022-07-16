package main

import (
	"fmt"

	"github.com/hashicorp/go-version"
)

func main() {
	v12, _ := version.NewVersion("1.2")
	v15, _ := version.NewVersion("1.5+metadata")

	if v12.LessThan(v15) {
		fmt.Printf("%s is less than %s", v12, v15)
	}
}
