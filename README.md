# Form2Agent: Your AI-Powered Form Assistant

Form2Agent is a React-based chat application that uses OpenAI's language models to help you fill out forms quickly and efficiently. With Form2Agent, you can simply chat with the AI assistant, and it will intelligently fill in your form fields based on your conversation.

**Demo Video:** [Link to demo video]

**Features:**

- **Intelligent Form Filling:** Form2Agent uses OpenAI to understand your form data and fill it in accurately.
- **Intuitive Chat Interface:** A user-friendly chat experience makes interacting with the AI simple.
- **Pre-built Demo Forms:** Get started quickly with our included sample forms.
- **Voice Interaction:** Speak your form answers and hear the AI's responses using text-to-speech and speech-to-text capabilities.

## **Prerequisites:**

- Node.js v21.1.0 or later [https://nodejs.org/en/download/package-manager](https://nodejs.org/en/download/package-manager)
- npm 10.2.5 or later
- An OpenAI API key (see below)

**Generate OpenAI API Key:**

1. **Create an OpenAI Account:**

- If you don't have an OpenAI account, visit [https://platform.openai.com/signup](https://platform.openai.com/signup) to sign up.
- If you already have an account, visit [https://platform.openai.com/login](https://platform.openai.com/login) to sign in.

2. **Navigate to the API Keys Page:**

- Once logged in, go to the [API key page](https://platform.openai.com/account/api-keys).

3. **Create a New Secret Key:**

- Click "Create new secret key."
- You can optionally give your key a name.

4. **Save Your API Key:**

- **IMPORTANT:** Copy the newly generated API key and save it in a secure location.
- You will need to paste this key into the api key modal after running Form2Agent project (as described in the "Running the Frontend" section).

Now that you have your API key, you can proceed with setting up and running the Form2Agent application.

## **Installation:**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/fmtops/form2agent-ai-react.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd form2agent-web
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```

### **Dependencies:**

- **OpenAI API:** Form2Agent requires a connection to the OpenAI API for its functionality.
  - You'll need OpenAI API key.
- **Backend:** This frontend application requires a backend server to handle form data and voice interactions. By default the app uses Freeport Metrics backend server the only thing needed is OpenAI API key.

## **Environment Variables:**

- **REACT_APP_AI_API_URL:** Backend API URL. Use `https://form2agent-demo.freeportmetrics.com`

## **Running the Frontend:**

1. **Start the development server:**
   ```bash
   npm start
   ```
   This will open the application in your default browser at `http://localhost:3000/`.

## **License:**

Form2Agent is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## **Usage:**

Please feel free to fork the repository.

**This project is currently in a state where pull requests and issues will not be reviewed or responded to. We apologize for any inconvenience this may cause.**

## **Contact:**

If you have any questions or feedback, please feel free to reach out us:
[info@freeportmetrics.com](mailto:info@freeportmetrics.com)
