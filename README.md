# My Resume Website

![Angular](https://img.shields.io/badge/Angular-19.2%2B-red?logo=angular) ![Material](https://img.shields.io/badge/Material-Design-blue) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ADarko22_ADarko22.github.io&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ADarko22_ADarko22.github.io)

## 🚀 Overview
**My Resume Website** is an Angular 19.2+ project that creates a personal resume website using Material Design. It dynamically loads and displays resume information from a structured JSON file (`resume.json`), ensuring easy customization and maintainability.

## ✨ Features
- Displays resume sections:
  - **Intro**
  - **Work Experience**
  - **Education**
  - **Contacts**
- Future enhancements:
  - **Hobbies section**
  - **GitHub project integration** (projects will be dynamically loaded from `resume.json`)

## 🏗️ Project Structure
The core data files are stored in:
- **`src/assets/data/resume.json`** → Contains the resume details (adheres to `resume-schema.json`).
- **`src/assets/data/resume-schema.json`** → Defines the schema for `resume.json`.

## 🛠️ Customization
Anyone can clone and modify this project to suit their personal needs. Here’s how:

1. **Change the Website Title**
   - Edit `src/index.html`
   - Modify the `<title>` tag.
   - _(Future updates will improve this process.)_

2. **Modify the Navigation Bar Logo**
   - Edit `src/app/app.component.html`
   - Replace the logo with your own.
   - _(Future updates will provide a more flexible configuration.)_

3. **Customize Resume Information**
   - Update `src/assets/data/resume.json` with personal details.
   - Include profile photos and other images in `src/assets/` and reference them inside `resume.json`.

## 💻 Installation & Running Locally
```sh
# Clone the repository
git clone https://github.com/your-username/my-resume-website.git
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
Inside your repository, create a file at `.github/workflows/deploy.yml` with the following content:

```yaml
name: Deploy Angular to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Install dependencies
        run: npm install

      - name: Build Angular app
        run: npm run build -- --output-path=dist --base-href /my-resume-website/

      - name: Deploy to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          branch: gh-pages
          folder: dist
```

### **3. Commit & Push Changes**
Once you commit this file, GitHub Actions will automatically build and deploy your website when you push changes to the `main` branch.

## 📜 License
This project is licensed under the [GPLv3 License](LICENSE).

---

## 🔧 **Contributions & Suggestions Welcome!**

Share your ideas for improvements or contribute, by forking the repo and submitting a pull request! 🎉