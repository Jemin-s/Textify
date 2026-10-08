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

- **Backend**: <img src="https://img.shields.io/badge/Java-ED8B00?style=flat&logo=java&logoColor=white" alt="Java" />  <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat&logo=springboot&logoColor=white" alt="Spring Boot" />
- **Frontend**: <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white" alt="React" /> 
- **AI Model**: <img src="https://img.shields.io/badge/Mistral_API-00A5CF?style=flat&logo=api&logoColor=white" alt="Mistral API" /> for text processing and generation

## Installation

To set up Textify locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Jemin-s/Textify.git
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
  Set the `MISTRAL_API_KEY` environment variable before starting the backend. The value is read by `backend/src/main/resources/application.properties`.

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
---

## Continuous Testing with Jenkins

Textify includes a Jenkins-based continuous testing pipeline. The pipeline checks out the repository, installs frontend dependencies, runs the existing ESLint configuration, builds the Vite frontend, runs the Spring Boot backend tests, and publishes the backend JUnit/Surefire test results in Jenkins.

### Prerequisites

- Git
- Java 21 (the backend project targets Java 21)
- Node.js and npm
- Jenkins
- Internet access from the Jenkins agent for dependency installation

The Mistral API key is not required for the automated tests because the `/ask` controller tests mock the Mistral service. For normal Textify use, configure the `MISTRAL_API_KEY` environment variable.

### Run the frontend locally

```bash
cd frontend
npm ci
npm run dev
```

### Run the frontend CI checks

```bash
cd frontend
npm ci
npm run lint
npm run build
```

### Run backend tests locally

```bash
cd backend
chmod +x mvnw
./mvnw test
```

### Jenkins pipeline

Create a Pipeline job for the Textify Git repository and configure it to use the `Jenkinsfile` from SCM. The repository configured in the uploaded project is the `main` branch of `https://github.com/Jemin-s/Textify.git`.

The pipeline stages are:

```text
Checkout
  ↓
Install Frontend Dependencies
  ↓
Frontend Lint
  ↓
Frontend Build
  ↓
Backend Tests
  ↓
JUnit Test Report
  ↓
PASS / FAIL
```

Jenkins publishes the Maven Surefire XML files from `backend/target/surefire-reports/`, so test results and failed-test details can be viewed from the Jenkins build page.

### Continuous testing demonstration

For the successful run, execute the pipeline with the unchanged project and show all stages completing successfully.

For a controlled failure demonstration, temporarily change the expected value in `MistralControllerTest.java`, for example changing `200: Ok` to `200: Failed`. Commit/push the change and run Jenkins again. The backend test stage should fail and Jenkins should report the build as failed. Restore the expected value, commit/push again, and run Jenkins to demonstrate a successful build.

### Triggering Jenkins

For the university practical, the simplest trigger is Jenkins **Build Now**. An optional Git webhook or SCM polling configuration can later trigger the same pipeline automatically after a push.

### Required Jenkins plugins

Use the standard Pipeline and Git support plus the JUnit plugin for publishing test results. Jenkins documents that the JUnit step consumes JUnit-format XML and provides test result history and details in the Jenkins UI.
