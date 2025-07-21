import React, { useRef, useEffect, useState } from "react";
import axios from "../utils/axios";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { textSummarizer } from "../models/persona.models";

const TextSummarizer = () => {
  const [isLoading, setIsLoading] = useState(false);

  const editorRef = useRef(null);
  const txtRef = useRef(null);
  const inputRef = useRef(null);

  const copyToClipboard = () => {
    const editorInstance = editorRef.current.getInstance();
    const content = editorInstance.getMarkdown();
    navigator.clipboard
      .writeText(content)
      .then(() => {
        alert("Content copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy content:", error);
      });
  };

  const getPrompt = () => {
    const instruction =
      "Please provide a concise summary of the following text" +
      (inputRef.current.value
        ? `, considering that 
          ${inputRef.current.value.replace(/(\r\n|\n|\r)/gm, " ")}`
        : "");
    const content = txtRef.current.value.replace(/(\r\n|\n|\r)/gm, " ");

    return `${instruction}: ${content}`;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const fetchResponse = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post("/ask", {
          persona: textSummarizer,
          prompt: getPrompt(),
        });
        const summarizedContent = response.data.choices[0].message.content;
        const editorInstance = editorRef.current.getInstance();
        editorInstance.setMarkdown(summarizedContent);
      } catch (error) {
        console.log("Error at Text Summarizer: ", error.stack);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResponse();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      txtRef.current.focus();
    }, 0);
    // const healthCheck = async () => {
    //   try {
    //     const response = await axios.get("/health-check");
    //     console.log(response);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // };
    // healthCheck();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="service text-summ">
      <div className="container">
        <div className="service-panel">
          <h2>Text Summarizer</h2>
          <p>
            Extracts key sentences, phrases, or segments directly from the
            original text and provides a summary consisting of verbatim content
            from the source material.
          </p>
          <form onSubmit={handleFormSubmit}>
            <label>
              Enter the text to summarize:
              <textarea placeholder="..." ref={txtRef} required></textarea>
            </label>
            <label>
              Enter any specific instruction (optional):
              <input placeholder="..." ref={inputRef} />
            </label>
            <button type="submit">{isLoading ? "Loading" : "Proceed"}</button>
          </form>
        </div>
        <div className="editor-panel">
          <div>
            <h3>
              Your <em>summarized</em> text:{" "}
            </h3>
            <button onClick={copyToClipboard}>Copy</button>
          </div>
          <div>
            <Editor
              previewStyle="vertical"
              height="525px"
              initialEditType="wysiwyg"
              initialValue=" "
              ref={editorRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextSummarizer;
