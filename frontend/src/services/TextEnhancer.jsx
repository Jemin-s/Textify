import React, { useEffect, useRef, useState } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import axios from "../utils/axios";
import { Editor } from "@toast-ui/react-editor";
import { textEnhancer } from "../models/persona.models";

const TextEnhancer = () => {
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
  const content = txtRef.current.value.replace(/(\r\n|\n|\r)/gm, " ");
  const instruction = inputRef.current.value
    ? `Note: ${inputRef.current.value.replace(/(\r\n|\n|\r)/gm, " ")}. `
    : "";
  
  return `Improve or refine the following content with better word choices and tone adjustments. ${instruction}Content: ${content}`;
};

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const fetchResponse = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post("/ask", {
          persona: textEnhancer,
          prompt: getPrompt(),
        });
        const summarizedContent = response.data.choices[0].message.content;
        const editorInstance = editorRef.current.getInstance();
        editorInstance.setMarkdown(summarizedContent);
      } catch (error) {
        console.log("Error at Text Enhancer: ", error.stack);
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
    <div className="service text-enh">
      <div className="container">
        <div className="service-panel">
          <h2>Text Enhancer</h2>
          <p>
            Refines your writing, eliminating errors, and redundancies for a
            clear, readable result with better word choices and tone
            adjustments.
          </p>
          <form onSubmit={handleFormSubmit}>
            <label>
              Enter the text to enhance:
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
              Your <em>enhanced</em> text:{" "}
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

export default TextEnhancer;
