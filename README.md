# University Admission System

A modern university admission management system built with React, Vite, and Tailwind CSS featuring a beautiful glassmorphism UI.

## Features

- ✨ Modern glassmorphism UI design
- 📝 Student admission form with auto-generated student IDs
- 👥 View and manage submitted students
- 🖨️ Print admission letters
- 🗑️ Delete student records
- 📱 Fully responsive design

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **LocalStorage** - Client-side data persistence

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd uni_project
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Deploying to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI
```bash
npm install -g vercel
```

2. Deploy
```bash
vercel
```

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Vite configuration
6. Click "Deploy"

### Important Files for Deployment

- `vercel.json` - Vercel configuration for SPA routing
- `.nvmrc` - Specifies Node.js version (18)
- `.gitignore` - Excludes node_modules and build files

## Project Structure

```
uni_project/
├── src/
│   ├── components/
│   │   ├── AdmissionForm.jsx    # Main admission form
│   │   └── SubmittedStudents.jsx # Student list view
│   ├── App.jsx                   # Main app component
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles
├── public/
│   └── tuu.png                   # University logo
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── vercel.json                   # Vercel deployment config
└── .nvmrc                        # Node version specification
```

## Student ID Format

Student IDs are auto-generated in the format: `COLLEGE/YEAR/SHIFT/NUMBER`

Example: `CIT/25/M/01`

- **CIT** - College of Computing & Information Technology
- **25** - Year 2025
- **M** - Morning shift
- **01** - Sequential number

## License

MIT

