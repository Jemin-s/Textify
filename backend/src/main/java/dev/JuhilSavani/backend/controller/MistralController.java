package dev.JuhilSavani.backend.controller;

import dev.JuhilSavani.backend.service.MistralService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class MistralController {

    @Autowired
    private MistralService mistralService;

    @GetMapping("/health-check")
    public String healthCheck(){
        return "200: Ok";
    }

    @PostMapping("/ask")
    public String askMistral(@RequestBody Map<String, String> reqBody) {
//        System.out.println(" ");
//        System.out.println(reqBody.get("persona"));
//        System.out.println(" ");
//        System.out.println(reqBody.get("prompt"));
//        System.out.println(" ");
        return mistralService.getResponse(reqBody.get("persona"), reqBody.get("prompt"));
    }
    
}
