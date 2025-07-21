# Textify

Textify is an AI-powered writing assistant that leverages the Mistral API to help users generate high-quality content across various formats. It provides functionalities such as text summarization, emoji enhancement, text refinement, title generation, email composition, and blog writing. Textify aims to simplify the content creation process while ensuring clarity, engagement, and relevance.

## Features

- **Text Summarization**: Utilizes the Mistral API to provide concise summaries of long-form content, capturing key points and essential information in 2-6 sentences, tailored to different content types such as articles and research papers.
- **Emoji Addition**: Enhances text by analyzing its tone and context, adding appropriate emojis to make the content more engaging without overwhelming the reader.
- **Text Enhancement**: Refines text to improve clarity and readability, correcting errors and awkward phrasing, and adjusting tone to suit the intended message.
- **Title Generation**: Suggests creative and impactful titles for various types of content, ensuring they accurately represent the themes and engage the target audience.
- **Email Composition**: Crafts clear and concise emails tailored to specific purposes, including catchy subject lines and appropriate tones for various audiences.
- **Blog Writing**: Generates well-structured blog posts based on provided topics, ensuring engaging introductions, informative body paragraphs, and strong conclusions.

## Technologies Used

- **Backend**: Java with Spring Boot
- **Frontend**: React
- **AI Model**: Mistral API for text processing and generation

## Installation

To set up Textify locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/JuhilSavani/textify.git
   ```

2. **Navigate to the backend directory**:
   ```bash
   cd textify/backend
   ```

3. **Install dependencies**:
   ```bash
   mvn install
   ```

4. **Configure Mistral API Key**:<br/>
  Open the `application.properties` file located at `Textify/backend/src/main/resources/` and replace `your_api_key` with your actual Mistral API key.

5. **Run the backend server**:
   ```bash
   mvn spring-boot:run
   ```

6. **Navigate to the frontend directory**:
   ```bash
   cd ../frontend
   ```

7. **Install dependencies**:
   ```bash
   npm install
   ```

8. **Run the frontend application**:
   ```bash
   npm run dev
   ```

## Usage

- Access the application in your browser at `http://localhost:3000`.
- Use the various features by providing appropriate input and receive generated content based on your needs.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please fork the repository and submit a pull request.

## Acknowledgements

- Thanks to the Mistral API for providing powerful text processing capabilities.
- Thanks to all resources and libraries that contributed to the development of Textify.

---
