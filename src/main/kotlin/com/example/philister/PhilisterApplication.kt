package com.example.philister

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class PhilisterApplication

fun main(args: Array<String>) {
	runApplication<PhilisterApplication>(*args)
}
