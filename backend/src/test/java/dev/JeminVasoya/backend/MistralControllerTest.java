package dev.JeminVasoya.backend;

import dev.JeminVasoya.backend.controller.MistralController;
import dev.JeminVasoya.backend.service.MistralService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(MistralController.class)
class MistralControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MistralService mistralService;

    @Test
    void healthCheckReturnsOk() throws Exception {
        mockMvc.perform(get("/health-check"))
                .andExpect(status().isOk())
                .andExpect(content().string("200: Ok"));
    }

    @Test
    void askDelegatesPromptToMistralService() throws Exception {
        String expectedResponse = "{\"choices\":[{\"message\":{\"content\":\"Test response\"}}]}";
        when(mistralService.getResponse("Test persona", "Summarize this text"))
                .thenReturn(expectedResponse);

        mockMvc.perform(post("/ask")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"persona\":\"Test persona\",\"prompt\":\"Summarize this text\"}"))
                .andExpect(status().isOk())
                .andExpect(content().string(expectedResponse));

        verify(mistralService).getResponse("Test persona", "Summarize this text");
    }
}
