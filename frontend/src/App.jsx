import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import BlogGenerator from "./services/BlogGenerator";
import EmailGenerator from "./services/EmailGenerator";
import EmojiAdder from "./services/EmojiAdder";
import TextEnhancer from "./services/TextEnhancer";
import TextSummarizer from "./services/TextSummarizer";
import TitleGenerator from "./services/TitleGenerator";


// Define the routes
const routes = createRoutesFromElements(
  <Route path="/" element={<Outlet />}>
    <Route index element={<Home />} />
    <Route path="/blog-content-writer" element={<BlogGenerator />} />
    <Route path="/email-assistant" element={<EmailGenerator />} />
    <Route path="/add-emojis-to-text" element={<EmojiAdder />} />
    <Route path="/text-enhancer" element={<TextEnhancer />} />
    <Route path="/text-summarizer" element={<TextSummarizer />} />
    <Route path="/title-generator" element={<TitleGenerator />} />
  </Route>
);

const App = () => {
  return (
    <div>
      <RouterProvider router={createBrowserRouter(routes)} />
    </div>
  );
};

export default App;