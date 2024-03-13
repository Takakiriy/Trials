package main

import (
	"flag"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var port = flag.String("port", "8080", "WebSocket server port")
var endPoint = flag.String("end-point", "/echo", "WebSocket server end point")

func main() {
	flag.Parse()
	log.Printf("Listen at ws://localhost:%s%s", *port, *endPoint)

	http.HandleFunc(*endPoint, echoHandler)
	log.Fatal(http.ListenAndServe(":"+*port, nil))
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true // 本番環境ではより安全なチェックを行う
	},
}

func echoHandler(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	defer conn.Close()

	for {
		messageType, message, err := conn.ReadMessage()
		if err != nil {
			log.Println(err)
			break
		}
		log.Printf("Received message: %s", message)
		if err := conn.WriteMessage(messageType, message); err != nil {
			log.Println(err)
			break
		}
	}
}
