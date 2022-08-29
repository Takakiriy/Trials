package main

import (
	"fmt"
	"strings"

	"gopkg.in/yaml.v2"
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
	yamlObjects := make(map[interface{}]interface{})

	err := yaml.Unmarshal([]byte(yamlDocument), &yamlObjects)
	if err != nil {
		fmt.Printf("error: %v", err)
		return
	}

	fmt.Println(yamlObjects) // map[Person:map[FullName:Grace Group:[Friends Squash] Mail:<nil>]]

	person := yamlObjects["Person"].(map[interface{}]interface{})
	fmt.Println(person) // map[FullName:Grace Group:[Friends Squash] Mail:<nil>]
	// personI := yamlObjects["Person"] // interface{} type
	// personS := yamlObjects["Person"].(map[string]interface{})  // panic
	// typeName := fmt.Sprintln(reflect.TypeOf(person)) // "map[string]interface {}\n"

	fullName := person[interface{}("FullName")].(string)
	fmt.Println(fullName) // Grace

	group := person[interface{}("Group")].([]interface{})
	group_0 := group[0].(string)
	fmt.Println(group)   // [Friends Squash]
	fmt.Println(group_0) // Friends
}
