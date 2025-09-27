import React, { useRef, useState, useEffect } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import axios from "../utils/axios";
import { Editor } from "@toast-ui/react-editor";
import { emailGenrator } from "../models/persona.models";

const EmailGenerator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const editorRef = useRef();
  const txtRef = useRef();
  const audInputRef = useRef();
  const toneInputRef = useRef();

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
    const purpose = txtRef.current.value;
    const audience = audInputRef.current.value;
    const tone = toneInputRef.current.value
      ? `, considering that the tone should be ${toneInputRef.current.value.replace(/(\r\n|\n|\r)/gm, " ")}` 
      : "";
    return `Draft an email for the purpose of "${purpose}", targeting "${audience}"${tone}.`;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const fetchResponse = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post("/ask", {
          persona: emailGenrator,
          prompt: getPrompt(),
        });
        const summarizedContent = response.data.choices[0].message.content;
        const editorInstance = editorRef.current.getInstance();
        editorInstance.setMarkdown(summarizedContent);
      } catch (error) {
        console.log("Error at Email Generator: ", error.stack);
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
    const healthCheck = async () => {
      try {
        const response = await axios.get("/health-check");
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    };
    healthCheck();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="service email-gen">
      <div className="container">
        <div className="service-panel">
          <h2>Email Assistant</h2>
          <p>
            Whether for business or personal use, composing emails can be
            challenging. This tool assists in crafting clear and effective
            emails that communicates your message effectively.
          </p>
          <form onSubmit={handleFormSubmit}>
            <label>
              Purpose of the Email:
              <textarea
                placeholder="..."
                ref={txtRef}
                style={{ height: "100px" }}
                required
              ></textarea>
            </label>
            <label>
              About the Target Audience:
              <input placeholder="..." ref={audInputRef} required />
            </label>
            <label>
              Tone and Style (optional):
              <input placeholder="..." type="text" ref={toneInputRef} />
            </label>
            <button type="submit">{isLoading ? "Loading" : "Proceed"}</button>
          </form>
        </div>
        <div className="editor-panel">
          <div>
            <h3>Your Email: </h3>
            <button onClick={copyToClipboard}>Copy</button>
          </div>
          <div>
            <Editor
              previewStyle="vertical"
              height="580px"
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

export default EmailGenerator;
