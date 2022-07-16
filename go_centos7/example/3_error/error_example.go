package main

import (
	"errors"
	"fmt"
	"log"
	"path/filepath"
	"runtime"
)

func main() {
	err := errorWithStack()
	if err != nil {
		log.Println(err)
	}
	err = errorNew()
	if err != nil {
		log.Println(err)
	}
	err = errorF()
	if err != nil {
		log.Println(err)
	}
	err = errorWrap()
	if err != nil {
		log.Println(err)
	}
	err = errorUserDefined()
	if err != nil {
		err_ := err.(*UserDefinedError)
		log.Println(err)
		log.Println(err_.parameterA)
	}
}

func errorWithStack() error {
	return WithStack(errors.New("in errorWithStack"))
	// errors.WithStack は廃止されたようです
	// 以前の仕様: https://pkg.go.dev/github.com/pkg/errors#WithStack
	// zap は WithStack と同じ機能があります  #search: Go zap logger
}

func errorNew() error {
	err := errors.New("in errorNew")
	return err
}

func errorF() error {
	err := fmt.Errorf("in errorF %d", 11)
	return err
}

func errorWrap() error {
	err := errors.New("in errorWrap")
	err = fmt.Errorf("message >> %w", err) // Wrap
	// errors.Wrap は廃止されたようです
	return err
}

func errorUserDefined() error {
	err := &UserDefinedError{parameterA: 2}
	return err
}

func WithStack(err error) error {
	if err != nil {
		_, filePath, line, _ := runtime.Caller(1)
		fileName := filepath.Base(filePath)
		// functionName := runtime.FuncForPC(_).Name()

		err = fmt.Errorf("ERROR %s:%d %w", fileName, line, err)
	}
	return err
}

type UserDefinedError struct {
	parameterA int
}

func (e *UserDefinedError) Error() string {
	return fmt.Sprintf("UserDefinedError {parameterA: %v}", e.parameterA)
}
