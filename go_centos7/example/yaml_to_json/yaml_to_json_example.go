package main

import (
	"encoding/json"
	"fmt"
	"strings"

	"github.com/ghodss/yaml"
)

func main() {
	main1()
	navigateMain()
}

func main1() {
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
	fmt.Printf("%v\n", string(json))
}

func navigateMain() {
	yamlDocument := strings.Replace(`
		Person:
			Group:
				- #
					Friends:
						Name: "Tom"
						Enabled: false
						Level: 12
				- #
					Friends:
						Name: "Taro"
						Enabled: true
						Level: 36
	`, "\t", "  ", -1)
	yamlObjects := make(map[string]interface{})

	err := yaml.Unmarshal([]byte(yamlDocument), &yamlObjects)
	if err != nil {
		fmt.Println(err)
		return
	}

	for i, group := range arrayField(yamlObjects, "Person.Group") {
		assert(stringField(group, "Friends.Name", "") == []string{"Tom", "Taro"}[i])
		assert(boolField(group, "Friends.Enabled", false) == []bool{false, true}[i])
		assert(float64Field(group, "Friends.Level", 0) == []float64{12, 36}[i])
	}
	for _, group := range arrayField(yamlObjects, "NotFound") {
		panic(group)
	}

	person := mappingField(yamlObjects, "Person")
	group0 := arrayField(person, "Group")[0]
	assert(stringField(group0, "Friends.Name", "") == "Tom")

	assert(len(arrayField(yamlObjects, "Person.Group")) != 0)
	assert(stringField(group0, "NotFound", "(not found)") == "(not found)")
	assert(!boolField(group0, "NotFound", false))
	assert(float64Field(group0, "NotFound", 64) == 64)
	assert(stringField(group0, "Friends.NotFound", "(not found)") == "(not found)")

	assert(len(arrayField(nil, "NotFound")) == 0)
	assert(stringField(nil, "NotFound", "(not found)") == "(not found)")
	assert(!boolField(nil, "NotFound", false))
	assert(float64Field(nil, "NotFound", 64) == 64)
	fmt.Println("OK")
}

func assert(condition bool) {
	if !condition {
		panic("assertion failed")
	}
}

func boolField(mapping map[string]interface{}, fieldNames string, defaultValue bool) bool {
	return leafField(mapping, fieldNames, defaultValue).(bool)
}

func stringField(mapping map[string]interface{}, fieldNames string, defaultValue string) string {
	return leafField(mapping, fieldNames, defaultValue).(string)
}

func float64Field(mapping map[string]interface{}, fieldNames string, defaultValue float64) float64 {
	return leafField(mapping, fieldNames, defaultValue).(float64)
}

func mappingField(mapping map[string]interface{}, fieldNames string) map[string]interface{} {
	return leafField(mapping, fieldNames, map[string]interface{}{}).(map[string]interface{})
}

func arrayField(mapping map[string]interface{}, fieldNames string) []map[string]interface{} {
	array := leafField(mapping, fieldNames, []interface{}{}).([]interface{})
	returnValue := []map[string]interface{}{}
	for _, item := range array {
		returnValue = append(returnValue, item.(map[string]interface{}))
	}
	return returnValue
}

func leafField(mapping map[string]interface{}, fieldNames string, defaultValue interface{}) interface{} {
	notFound := -1
	fieldName := ""
	for {
		period := strings.Index(fieldNames, ".")
		if period == notFound {
			fieldName = fieldNames
		} else {
			fieldName = fieldNames[0:period]
		}
		if fieldName == "" {
			panic("bad field name")
		}

		if mapping[fieldName] == nil {
			return defaultValue
		} else if period == notFound {
			return mapping[fieldName]
		} else {
			mapping = mapping[fieldName].(map[string]interface{})
		}
		fieldNames = fieldNames[period+1:]
	}
}
