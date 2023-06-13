package main

func main() {
	singleTry := true
	if singleTry {
		MainMax()
	} else { // All main
		Main1()
		MainSelect()
		MainMax()
	}
}

type ProductTable struct {
	ProductID string `json:"product_id"`
	Price     int    `json:"price"`
	Count     int    `json:"count"`
}
