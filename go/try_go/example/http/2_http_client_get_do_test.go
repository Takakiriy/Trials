package main

import (
	"fmt"
	"io"
	"net/http" // https://pkg.go.dev/net/http
	"testing"
)

func TestHTTPClientGetDo(t *testing.T) {

	client := &http.Client{}

	request, err := http.NewRequest("GET", "http://example.com", nil)
	// 		request: *http.Request

	response, err := client.Do(request)
	// 		response: *http.Response
	_ = err

	bodyBinary, err := io.ReadAll(response.Body)
	// 		response.Body: io.ReadCloser
	// 		bodyBinary: []byte

	bodyString := string(bodyBinary)
	fmt.Println(bodyString)
}
