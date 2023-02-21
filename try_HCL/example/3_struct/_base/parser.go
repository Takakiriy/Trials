package main

// https://pkg.go.dev/github.com/hashicorp/hcl/v2

import (
	"log"

	"github.com/hashicorp/hcl/v2/hclsimple"
)

type Config struct {
	LogLevel string `hcl:"log_level"`
}

func main() {
	var config Config
	err := hclsimple.DecodeFile("config.hcl", nil, &config)
	if err != nil {
		log.Fatalf("Failed to load configuration: %s", err)
	}
	log.Printf("Configuration is %#v", config) // main.Config{LogLevel:"INFO"}
}
