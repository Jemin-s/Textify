import React, { useEffect, useRef, useState } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import axios from "../utils/axios";
import { emojiAdder } from "../models/persona.models";

const EmojiAdder = () => {
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
  
    return `Emojify the following content. ${instruction}Content: ${content}`;
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const fetchResponse = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post("/ask", {
          persona: emojiAdder,
          prompt: getPrompt(),
        });
        const summarizedContent = response.data.choices[0].message.content;
        const editorInstance = editorRef.current.getInstance();
        editorInstance.setMarkdown(summarizedContent);
      } catch (error) {
        console.log("Error at Emoji Adder: ", error.stack);
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
    <div className="service emoji-adder">
      <div className="container">
        <div className="service-panel">
          <h2>Add Emojis to Text</h2>
          <p>
            Emojis can bring life and emotion to written communication. Enter
            your text and spice up messages with fun emojis that add emotion.
          </p>
          <form onSubmit={handleFormSubmit}>
            <label>
              Enter the text to add emojis:
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
              Your <em>emojinated</em> text:{" "}
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

export default EmojiAdder;

