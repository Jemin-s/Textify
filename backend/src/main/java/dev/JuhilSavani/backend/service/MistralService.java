package dev.JuhilSavani.backend.service;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.util.List;
import java.util.Map;

@Service
public class MistralService {

    @Value("${mistral.api.model}")
    private String model;

    @Value("${mistral.api.url}")
    private String apiUrl;

    @Value("${mistral.api.key}")
    private String apiKey;

    @Autowired
    private WebClient.Builder webClientBuilder;

    @Autowired
    private ObjectMapper objectMapper;

    public String getResponse(String modelPersona, String userMessage) {
    try {
        Map<String, Object> requestBody = Map.of(
            "model", model,
            "messages", List.of(
                Map.of("role", "system", "content", modelPersona),
                Map.of("role", "user", "content", userMessage)
            ),
            "max_tokens", 8192
        );

        String requestJson = objectMapper.writeValueAsString(requestBody);
        System.out.println("Request JSON: " + requestJson);

        return webClientBuilder.build()
            .post()
            .uri(apiUrl)
            .header("Authorization", "Bearer " + apiKey)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(requestJson)
            .retrieve()
            .bodyToMono(String.class)
            .doOnError(WebClientResponseException.class, exc -> System.err.println("Error: " + exc.getMessage()))
            .block();

    } catch (JsonProcessingException exc) {
        System.err.println("JsonProcessingException: " +exc.getMessage());
        return null;
    }
    }
}