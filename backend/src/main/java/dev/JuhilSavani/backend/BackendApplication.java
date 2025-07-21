package dev.JuhilSavani.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@GetMapping
	public String sayHello(){
		return "<h1>Hello, Dev!</h1>";
	}

	@Bean
	public CommandLineRunner commandLineRunner(){
		return (args)->{
			System.out.println("Server is running at http://localhost:8080");
		};
	}
}
