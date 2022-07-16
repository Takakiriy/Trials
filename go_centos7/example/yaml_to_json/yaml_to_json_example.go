package main

import (
	"encoding/json"
	"fmt"
	"strings"

	"github.com/ghodss/yaml"
)

func main() {
	yamlDocument := strings.Replace(`
		Person:
			FullName: Grace
			Group:
				- Friends
				- Squash
			Mail:
	`, "\t", "  ", -1)
	yamlObjects := make(map[string]interface{})

	err := yaml.Unmarshal([]byte(yamlDocument), &yamlObjects)
	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println(yamlObjects) // map[Person:map[FullName:Grace Group:[Friends Squash] Mail:<nil>]]

	json, err := json.Marshal(yamlObjects)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Printf("%v", string(json))
}
