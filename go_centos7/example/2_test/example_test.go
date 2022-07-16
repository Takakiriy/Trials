package main

import (
	"testing"
)

func TestExample(t *testing.T) {

	result := sub(2)
	t.Logf("Log %v", "test")
	t.Errorf("Error %v", "test")
	if result != 3 {
		t.Fatalf("Fatal %v", "test")
	}
}
