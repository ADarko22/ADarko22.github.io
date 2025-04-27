# My Resume Website

![Angular](https://img.shields.io/badge/Angular-19.2%2B-red?logo=angular) ![Material](https://img.shields.io/badge/Material-Design-blue) 

## 🚀 Overview
**My Resume Website** is an Angular 19.2+ project that creates a personal resume website using Material Design. It dynamically loads and displays resume information from a structured JSON file (`resume.json`), ensuring easy customization and maintainability.

## ✨ Features
- Displays resume sections:
  - **Intro**
  - **Work Experience**
  - **Education**
  - **Hall of Fame**
  - **Contacts**

## 🏗️ Project Structure
The core data files are stored in:
- **[`resume.json`](src/assets/data/resume.json)** → Contains the resume details (adheres to `resume-schema.json`).
- **[`resume-schema.json`](src/assets/data/resume-schema.json)** → Defines the schema for `resume.json`.
- **[`metadata.json`](src/assets/data/metadata.json)** → Contains the extra info, such as the website title and the logo text.

## 🛠️ Customization
Anyone can clone and modify this project to suit their personal needs. Here’s how:

1. **Customize Resume Information**
   - Update [`resume.json`](src/assets/data/resume.json) with personal details.
   - Include profile photos and other images in [`src/assets/`](src/assets/) and reference them inside `resume.json`. For example:
      - [src/assets/intro-photos](src/assets/intro-photos)
      - [src/assets/hall-of-fame-images](src/assets/hall-of-fame-images)

2. **Customize Title, Logo, other metadata and styles**
    - Update [`metadata.json`](src/assets/data/metadata.json) with extra metadata, like the title and the logo.
    - Extend the [`MetadataService`](src/app/metadata.service.ts) to inject extra informations in the existing components.
    - Update the [`styles.scss`](src/styles.scss) to modify theme colors and other rendering.

## 💻 Installation & Running Locally
```sh
# Clone the repository
git clone https://github.com/<YOUR-USERNAME>/<REPOSITORY-NAME>.git
cd my-resume-website

# Install dependencies
npm install

# Run the development server
ng serve

# Open in browser
http://localhost:4200/
```

## 🚀 Deploying on GitHub Actions
You can set up GitHub Actions to automatically build and deploy your Angular app to GitHub Pages.

### **1. Enable GitHub Pages**
- Go to **Repository Settings** → **Pages**.
- Set the source to `gh-pages` branch (this will be created by GitHub Actions).

### **2. Create GitHub Actions Workflow**
Inside your repository, create a file at `.github/workflows/deploy.yml` like [deploy.yml](.github/workflows/build-deploy.yml)

### **3. Commit & Push Changes**
Once you commit this file, GitHub Actions will automatically build and deploy your website when you push changes to the `main` branch.

## 📜 License
This project is licensed under the [GPLv3 License](LICENSE).

---

## 🔧 **Contributions & Suggestions Welcome!**

Share your ideas for improvements or contribute, by forking the repo and submitting a pull request! 🎉