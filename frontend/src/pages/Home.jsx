import React from "react";
import ServiceCard from "../components/ServiceCard";

const Home = () => {
  const services = [
    {
      slug: "title-generator",
      title: "Title Generator",
      content:
        "Crafting an engaging title can set the tone for your blog. This handy tool helps you to generate a variety of catchy titles that will draw readers in and encourage them to click.",
    },
    {
      slug: "blog-content-writer",
      title: "Blog Content Writer",
      content:
        "Writing a full blog post can be time-consuming. Input a title or topic, and receive well-structured, informative content tailored to your theme, making blogging easier and faster.",
    },
    {
      slug: "email-assistant",
      title: "Email Assistant",
      content:
        "Whether for business or personal use, composing emails can be challenging. This tool assists in crafting clear and effective emails that communicates your message effectively.",
    },
    {
      slug: "text-enhancer",
      title: "Text Enhancer",
      content:
        "Refines your writing, eliminating errors, and redundancies for a clear, readable result with better word choices and tone adjustments.",
    },
    {
      slug: "add-emojis-to-text",
      title: "Add Emojis to Text",
      content:
        "Emojis can bring life and emotion to written communication. Enter your text and spice up messages with fun emojis that add emotion.",
    },
    {
      slug: "text-summarizer",
      title: "Text Summarizer",
      content:
        "Extracts key sentences, phrases, or segments directly from the original text and provides a summary consisting of verbatim content from the source material.",
    },
  ];

  return (
    <div>
      <div className="hero-banner">
        <div className="wrapper">
          <h1>Textify</h1>
          <p>From Ideas to Words, Powered by AI</p>
          <div>
            <input type="text" placeholder="Search" className="search-input" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="service-list">
        {services.map((service, index) => (
          <a key={index} href={service.slug}>
            <ServiceCard
              title={service.title}
              content={service.content}
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Home;
