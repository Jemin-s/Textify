import React, { useRef, useEffect, useState } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import axios from "../utils/axios";
import { Editor } from "@toast-ui/react-editor";
import { titleGenrator } from "../models/persona.models";

const TitleGenerator = () => {
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
      "Provide a list of suitable titles for the following content" +
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
        const obj = {
          persona: titleGenrator,
          prompt: getPrompt(),
        };
        const response = await axios.post("/ask", obj);
        const summarizedContent = response.data.choices[0].message.content;
        const editorInstance = editorRef.current.getInstance();
        editorInstance.setMarkdown(summarizedContent);
      } catch (error) {
        console.log("Error at Title Generator: ", error.stack);
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
    <div className="service title-gen">
      <div className="container">
        <div className="service-panel">
          <h2>Title Generator</h2>
          <p>
            Crafting an engaging title can set the tone for your blog. This
            handy tool helps you to generate a variety of catchy titles that
            will draw readers in and encourage them to click.
          </p>
          <form onSubmit={handleFormSubmit}>
            <label>
              Enter the content:
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
            <h3>Suggested titles: </h3>
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

export default TitleGenerator;
