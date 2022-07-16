package main

import "fmt"

func main() {
	f := true
	if f {
		fmt.Println("\nInterfaceMain:")
		InterfaceMain()
	}
	if f {
		fmt.Println("\nExtensionStringMain:")
		ExtensionStringMain()
	}
	if f {
		fmt.Println("\nExtensionMain:")
		ExtensionMain()
	}
	if f {
		fmt.Println("\nExtensionInterfaceMain:")
		ExtensionInterfaceMain()
	}
	if f {
		fmt.Println("\nDataFacadeMain:")
		DataFacadeMain()
	}
}
