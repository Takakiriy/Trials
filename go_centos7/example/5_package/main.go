package main

import (
	"example.com/try_go/example/5_package/sub"
)

func main() {
	Main1()
	sub.Sub1()
	sub.Sub2()
	// sub.sub0() // sub0 not exported by package sub compiler UnexportedName
}
