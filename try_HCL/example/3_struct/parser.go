package main

// https://stackoverflow.com/questions/66460117/parse-simple-terraform-file-using-go

import (
	"log"

	"github.com/hashicorp/hcl/v2/hclsimple"
)

type Config struct {
	LogLevel string   `hcl:"log_level"`
	Cloud    []*Cloud `hcl:"cloud,block"`
}

type Cloud struct {
	Name   string `hcl:",label"`
	Server string `hcl:"server"`
}

func main() {
	var config Config
	err := hclsimple.DecodeFile("config.hcl", nil, &config)
	if err != nil {
		log.Fatalf("Failed to load configuration: %s", err)
	}
	log.Printf("Configuration is %#v", config) // main.Config{LogLevel:"INFO", Cloud:[]*main.Cloud{(*main.Cloud)(0xc00005e180)}}
}
