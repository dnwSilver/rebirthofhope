package main

import (
	"log"
	"os"
	"strings"
	"time"

	"math/rand/v2"

	"github.com/jaswdr/faker/v2"
)

func randRange(min, max int) time.Duration {
	return time.Duration(rand.IntN(max-min) + min)
}

func UserSetStatus() {
	if GetAppStatus() != SUCCESS {
		return
	}

	fake := faker.New()
	for {
		time.Sleep(randRange(1, 5) * time.Second)
		user := fake.Person().Name()
		action := fake.Emoji().Emoji()

		userLog := log.New(os.Stdout, "[USR] ", log.LstdFlags)
		userLog.Println(fake.Lorem(), strings.ToLower(user)+" set status "+action)
		http200Count++
	}
}

func UserActions() {
	if GetAppStatus() != SUCCESS {
		return
	}

	actions := []string{
		"logout",
		"login",
		"admires",
		"is going crazy",
		"goes crazy",
		"in a rage",
		"on a drinking binge",
		"make dinner",
	}

	fake := faker.New()
	userLog := log.New(os.Stdout, "[USR] ", log.LstdFlags)

	for {
		time.Sleep(randRange(1, 5) * time.Second)
		user := fake.Person().Name()
		userLog.Println(fake.Lorem(), user+" "+actions[randRange(0, len(actions)-1)])
		http200Count++
	}
}

func TrashLogger() {
	fake := faker.New()

	if os.Getenv("LOG_LEVEL") != "info" {
		types := []string{
			"[TRC] ",
			"[DBG] ",
		}
		ormLog := log.New(os.Stdout, types[0], log.LstdFlags)

		for {
			time.Sleep(randRange(100, 200) * time.Millisecond)
			ormLog.SetPrefix("[" +
				strings.ToUpper(fake.Lorem().Faker.Letter()+
					fake.Lorem().Faker.Letter()+
					fake.Lorem().Faker.Letter()+"] "))
			ormLog.Println(fake.Lorem(), strings.Join(fake.Lorem().Words(4), " "))
		}
	}
}

func MemoryVerify() {
	if GetAppStatus() == LOW_MEMORY {
		fake := faker.New()
		ormLog := log.New(os.Stdout, "[BLG] ", log.LstdFlags)

		for {
			time.Sleep(randRange(1, 5) * time.Second)
			ormLog.Println(fake.Lorem(), "out of memory")
		}
	}
}

func DatabaseVerify() {
	fake := faker.New()

	if GetAppStatus() == EMPTY_ENVS {
		ormLog := log.New(os.Stdout, "[ORM] ", log.LstdFlags)

		for {
			time.Sleep(randRange(1, 5) * time.Second)
			ormLog.Println(fake.Lorem(), "not found env DB")
			http500Count++
		}
	}

	if GetAppStatus() == CORRUPTED_ENVS {
		ormLog := log.New(os.Stdout, "[ORM] ", log.LstdFlags)

		for {
			time.Sleep(randRange(1, 5) * time.Second)
			ormLog.Println(fake.Lorem(), "corrupted env variable DB")
			http500Count++
		}
	}
}
