package com.cravely;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class CravelyApplication {

    public static void main(String[] args) {
        SpringApplication.run(CravelyApplication.class, args);
    }
}
