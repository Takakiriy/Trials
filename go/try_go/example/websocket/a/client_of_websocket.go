package main

import (
	"flag"
	"log"
	"time"

	"github.com/gorilla/websocket"
)

var serverOption = flag.String("server", "ws://localhost:8080/echo", "WebSocket server URL")

func main() {
	flag.Parse()
	log.SetFlags(0)
	log.Printf("Request to %s", *serverOption)

	// Dialerを作成してWebSocketサーバーに接続
	c, _, err := websocket.DefaultDialer.Dial(*serverOption, nil)
	if err != nil {
		log.Fatal("dial:", err)
	}
	defer c.Close()

	done := make(chan struct{})

	// サーバーからのメッセージを受け取るゴルーチン
	go func() {
		defer close(done)
		for {
			_, message, err := c.ReadMessage()
			if err != nil {
				log.Println("read:", err)
				return
			}
			log.Printf("receive: %s", message)
		}
	}()

	// サーバーにメッセージを送信
	err = c.WriteMessage(websocket.TextMessage, []byte("Helo! WebSocket"))
	if err != nil {
		log.Println("write:", err)
		return
	}

	// サーバーからの応答を待つために一時停止
	time.Sleep(time.Second * 1)

	// 通信を終了するためにWebSocketクローズメッセージを送信
	err = c.WriteMessage(websocket.CloseMessage, websocket.FormatCloseMessage(websocket.CloseNormalClosure, ""))
	if err != nil {
		log.Println("write close:", err)
		return
	}
	select {
	case <-done:
	case <-time.After(time.Second):
	}
}
