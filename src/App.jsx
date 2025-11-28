import { useState } from 'react';
import AdmissionForm from './components/AdmissionForm';
import SubmittedStudents from './components/SubmittedStudents';

function App() {
  const [page, setPage] = useState('form'); // 'form' or 'submitted'

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-800">
      <header className="bg-white/5 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">University Admission System</h1>
          <nav className="space-x-2">
            <button
              onClick={() => setPage('form')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                page === 'form'
                  ? 'bg-cyan-500/80 text-slate-900 shadow-md shadow-cyan-500/40'
                  : 'bg-white/5 text-slate-200 hover:bg-white/10 border border-white/20'
              }`}
            >
              Admission Form
            </button>
            <button
              onClick={() => setPage('submitted')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                page === 'submitted'
                  ? 'bg-cyan-500/80 text-slate-900 shadow-md shadow-cyan-500/40'
                  : 'bg-white/5 text-slate-200 hover:bg-white/10 border border-white/20'
              }`}
            >
              Submitted Students
            </button>
          </nav>
        </div>
      </header>

      {page === 'form' ? <AdmissionForm onSuccess={() => setPage('submitted')} /> : <SubmittedStudents />}
    </div>
  );
}

export default App;

