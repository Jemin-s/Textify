import React, { useRef, useState, useEffect } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import axios from "../utils/axios";
import { Editor } from "@toast-ui/react-editor";
import { blogGenrator } from "../models/persona.models";

const BlogGenerator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const editorRef = useRef();
  const topicInputRef = useRef();
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
    const topic = topicInputRef.current.value;
    const audience = audInputRef.current.value;
    const tone = toneInputRef.current.value
      ? `, considering that the tone should be ${tone.replace(/(\r\n|\n|\r)/gm, " ")}`
      : "";
    return `Generate a blog post about ${topic}, targeting ${audience}${tone}.`;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const fetchResponse = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post("/ask", {
          persona: blogGenrator,
          prompt: getPrompt(),
        });
        const summarizedContent = response.data.choices[0].message.content;
        const editorInstance = editorRef.current.getInstance();
        editorInstance.setMarkdown(summarizedContent);
      } catch (error) {
        console.log("Error at Blog Generator: ", error.stack);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResponse();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      topicInputRef.current.focus();
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
    <div className="service blog-gen">
      <div className="container">
        <div className="service-panel">
          <h2>Blog Content Writer</h2>
          <p>
            Writing a full blog post can be time-consuming. Input a title or
            topic, and receive well-structured, informative content tailored to
            your theme, making blogging easier and faster.
          </p>
          <form onSubmit={handleFormSubmit}>
            <label>
              Topic or Keywords:
              <input placeholder="..." type="text" ref={topicInputRef} required/>
            </label>
            <label>
              About the Target Audience:
              <input placeholder="..." type="text" ref={audInputRef} required/>
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
            <h3>Your blog: </h3>
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

export default BlogGenerator;
