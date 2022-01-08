package main

import (
	"encoding/json"
	"fmt"

	"github.com/SherClockHolmes/webpush-go"
)

const (
	subscription    = ``
	vapidPublicKey  = ""
	vapidPrivateKey = ""
)

func main() {
	// Decode subscription
	s := &webpush.Subscription{}
	json.Unmarshal([]byte(subscription), s)

	// Send Notification
	resp, err := webpush.SendNotification([]byte("Test2"), s, &webpush.Options{
		Subscriber:      "swmeng@wmtech.cc", // Do not include "mailto:"
		VAPIDPublicKey:  vapidPublicKey,
		VAPIDPrivateKey: vapidPrivateKey,
		TTL:             30,
	})
	if err != nil {
		fmt.Println(err)
	}
	defer resp.Body.Close()
}
