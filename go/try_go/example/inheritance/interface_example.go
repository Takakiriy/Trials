package main

import (
	"fmt"
)

// #focus: MyInterface, XPlusY, Vertex

type MyInterface interface { // インターフェース
	XPlusY() int
}

type Vertex struct { // クラスの属性
	X int
	Y int
}

func (v *Vertex) XPlusY() int { // 構造体のメソッド（クラスのメソッド）
	return v.X + v.Y
}

func InterfaceMain() {
	anObject := Vertex{X: 1, Y: 2} // オブジェクトの生成
	anObjectPointer := MyInterface(&anObject)
	fmt.Println(anObjectPointer.XPlusY()) // 3

	InterfaceFunction(&anObject)
}

func InterfaceFunction(object MyInterface) {
	fmt.Println(object.XPlusY()) // 3
}
