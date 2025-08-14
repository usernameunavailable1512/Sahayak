# Shiksha Saathi - Intelligent Educational Platform

## Overview

Shiksha Saathi is a comprehensive educational platform that combines multiple AI-powered features to enhance the learning and teaching experience. This project uses Lovable for frontend development and integrates various specialized features.

## Live Demo

- **Deployed Application**: [Shiksha Saathi Live](https://shiksha-saathi.lovable.app/)

### Demo Video
[![Shiksha Saathi Demo](https://drive.google.com/thumbnail?id=1Bl6um3JZG16G1PJA6j0fYeZxSu6HnLPL)](https://drive.google.com/file/d/1Bl6um3JZG16G1PJA6j0fYeZxSu6HnLPL/view?usp=sharing)

Click on the image above to watch the full demo video

## Getting Started with the Frontend

### Prerequisites

1. Node.js & npm - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
2. Git

### Installation and Setup

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd shiksha-saathi-main

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

## Project Structure

Our features are organized in the `Features/` directory:

#🔁 Master Workflow: AI-Driven Teaching Assistant for Multigrade Classrooms
### 🧠 1. Teacher Prompt Initiation
Voice/typed input:
“I want to teach fractions to Grades 3–5 in Hindi using local stories.”

Captured parameters:

Topic, subject, grade range

Teaching style and regional preferences

Curriculum-aligned outcomes

🎯 This initiates intelligent orchestration using Speech-to-Text + NLP.

### 🧭 2. Content Generation by Central Agent
Core Modules Triggered:

Lesson Planner Agent:

Breaks topic into steps, learning goals, Bloom’s levels

Story Agent:

Generates culturally relevant, multilingual narratives

Worksheet Generator:

Differentiated practice materials (easy, medium, advanced)

Visual Asset Agent:

Simple diagrams, blackboard sketches using DALL·E

🧩 All materials are packaged as a ready-to-teach resource kit.

### 📚 3. Student Interaction Phase I – Reading Fluency Assessment
Audio-Based Assessment via ElevenLabs + MCP

Student reads content aloud → Real-time transcription + analysis

Metrics captured:

Mispronunciations

Pauses/hesitations

Reading speed

Comprehension questions asked

📊 Output: Fluency Report with pronunciation score, vocabulary gaps, and regional noise adaptability.

### 📽 4. Student Interaction Phase II – Emotion-Behavior Based Video Mock Exam
Mock quiz attempted on screen + webcam activated

Real-time analytics capture:

Cursor trails → restlessness

Option switches → confusion

Idle time → disengagement

Emotion map generated (from facial data — detached heatmap)

Calm (🟢), Focused (🟡), Frustrated (🔴)

🎥 Output: Cognitive-Emotional Engagement Report

### 🧾 5. Central Agent – Performance Profiling
Aggregates reading + behavior analytics

Generates a holistic student profile, including:

Concept mastery

Reading fluency

Engagement confidence

Distraction/restlessness index

Stored in Firebase + RAG for longitudinal analysis

📈 Enables time-based tracking of student growth.

### ♿ 6. Inclusive Special Needs Module
Automatically triggered for:

Unusual behavior/emotion markers

Repeated disengagement

Voice-based cues of comprehension failure

Generates:

Simplified audio-visual content

Individualized learning strategies

Adaptive worksheet plans

✅ Special needs learners are supported without singling them out.

### 📬 7. Teacher Dashboard – Insights & Reporting
Receives:

Individual student reports

Comparative performance visualizations

Flags for intervention

Class-wide learning gap trends

🧑‍🏫 Enables data-driven micro-teaching for large classrooms.

### 🗣 8. Teacher Feedback to Lesson Feedback Agent
Optional voice/text input like:
“The story was too fast-paced for Grade 3; include local terms like ‘gilli danda’.”

Captured as feedback signals:

Difficulty level

Pedagogical tone

Cultural mismatch

🔄 Feedback triggers content evolution loop.

### ♻ 9. Regeneration of Improved Content
Using previous student data + teacher feedback:

Adjust pacing, visuals, vocabulary

Simplify story flow

Recommend retention strategies

🎯 Next-gen lesson kit is even more tailored.

### 🌱 10. Adaptive Teaching Cycle Resumes
Teacher receives new lesson pack

Students re-engage with personalized aids

System continues to log interactions

Learning becomes cyclic, adaptive, and responsive.
Key Components:
- Teacher Dashboard
- Question Generation
- Speech Processing
- Feedback Generation

## Technology Stack

- **Frontend Framework**: React with Vite
- **UI Components**: shadcn-ui
- **Styling**: Tailwind CSS
- **Type Safety**: TypeScript
- **State Management**: React Query
- **Routing**: React Router DOM

## Development Tools

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/028a708b-3a28-4088-b12c-c5c00bb9bd79) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:
#Backend: 
- FireStore Database
- Firebase Studio
- Vertex AI
- ADK (Agentic Development Kit)
- Google Cloud Platform
- Vertex Vision
- Google API
- Gemini Veo 3
- Gemini Imagen
- MCP Tool-Box
- ElevenLabs

#Frontend: 
- TypeScript
- React
- Vite
- Tailwind CSS
- HTML
- CSS

## Project Folder Structure

```
shiksha-saathi-main/
├── Features/
│   ├── Agentic/
│   │   └── develop/
│   │       ├── app.yaml
│   │       ├── main.py
│   │       ├── requirements.txt
│   │       ├── sahayak_analytics.py
│   │       ├── static/
│   │       └── templates/
│   ├── EduAI_Insights/
│   │   ├── src/
│   │   │   ├── ai/
│   │   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── lib/
│   │   └── docs/
│   ├── Exam_Guide/
│   │   ├── src/
│   │   │   ├── ai/
│   │   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── lib/
│   │   │   └── services/
│   │   └── docs/
│   ├── Frontend-master/
│   │   ├── public/
│   │   │   ├── chemistry/
│   │   │   ├── maths/
│   │   │   └── [simulation files]
│   │   └── src/
│   ├── Inclusive_Assessment/
│   │   └── emotion/
│   ├── Sahayak_Story/
│   │   └── src/
│   └── Studio-master/
│       └── src/
├── public/
│   └── lovable-uploads/
├── src/
│   ├── components/
│   │   └── ui/
│   ├── hooks/
│   ├── lib/
│   └── pages/
├── package.json
├── tsconfig.json
├── vite.config.ts
└── [other config files]
```

Each feature in the `Features/` directory is a self-contained module with its own implementation, configuration, and documentation. The main frontend application in the root `src/` directory serves as the unified interface for all these features.



