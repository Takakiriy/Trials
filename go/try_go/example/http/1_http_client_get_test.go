package main

import (
	"fmt"
	"io"
	"net/http" // https://pkg.go.dev/net/http
	"testing"
)

func TestHTTPClientGet(t *testing.T) {

	response, err := http.Get("http://example.com")
	// 		response: *http.Response
	_ = err

	bodyBinary, err := io.ReadAll(response.Body)
	// 		response.Body: io.ReadCloser
	// 		bodyBinary: []byte

	bodyString := string(bodyBinary)
	fmt.Println(bodyString)
}
