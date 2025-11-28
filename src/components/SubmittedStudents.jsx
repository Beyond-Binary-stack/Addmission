import { useEffect, useState } from 'react';

const SubmittedStudents = () => {
  const [students, setStudents] = useState([]);
  const [facultyFilter, setFacultyFilter] = useState('');
  const [intakeFilter, setIntakeFilter] = useState('');
  const [shiftFilter, setShiftFilter] = useState('');

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('submittedStudents') || '[]');
      setStudents(stored);
    } catch (err) {
      console.error('Failed to load submitted students from localStorage', err);
    }
  }, []);

  const faculties = Array.from(
    new Set(students.map((s) => s.programmeInformation?.faculty).filter(Boolean))
  );
  const intakes = Array.from(
    new Set(students.map((s) => s.programmeInformation?.intakeMonth).filter(Boolean))
  );
  const shifts = Array.from(
    new Set(students.map((s) => s.programmeInformation?.shift).filter(Boolean))
  );

  const handleDeleteStudent = (index) => {
    const student = students[index];
    const studentName = `${student.personalInformation?.firstName} ${student.personalInformation?.lastName}`;
    
    if (window.confirm(`Are you sure you want to delete ${studentName}?`)) {
      try {
        const updatedStudents = students.filter((_, i) => i !== index);
        localStorage.setItem('submittedStudents', JSON.stringify(updatedStudents));
        setStudents(updatedStudents);
        alert('✅ Student deleted successfully!');
      } catch (err) {
        console.error('Failed to delete student', err);
        alert('❌ Error: Failed to delete student. Please try again.');
      }
    }
  };

  const handlePrintLetter = (s) => {
    const p = s.programmeInformation || {};
    const person = s.personalInformation || {};

    const fullName = `${person.firstName || ''} ${person.middleName || ''} ${
      person.lastName || ''
    }`.trim();

    const today = new Date().toLocaleDateString();

    const letterHtml = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Admission Letter - ${fullName}</title>
    <style>
      body {
        font-family: Cambria, serif;
        margin: 40px;
        color: #111827;
        line-height: 1.5;
      }
      .letter-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 32px;
        border: 1px solid #e5e7eb;
      }
      .letter-header {
        text-align: center;
        border-bottom: 2px solid #1f2937;
        padding-bottom: 16px;
        margin-bottom: 24px;
      }
      .logo {
        height: 90px;
        margin: 0 auto 12px;
        display: block;
      }
      .uni-info h1 {
        margin: 0 0 8px 0;
        font-size: 22px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-weight: 700;
      }
      .uni-info h2 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        color: #1f2937;
      }
      .meta {
        font-size: 13px;
        margin-bottom: 16px;
      }
      .section-title {
        font-weight: 600;
        margin-top: 16px;
        margin-bottom: 4px;
        text-transform: uppercase;
        font-size: 13px;
      }
      .signature {
        margin-top: 40px;
      }
      .signature-line {
        margin-top: 40px;
        border-top: 1px solid #9ca3af;
        width: 220px;
      }
      .no-print {
        margin-top: 24px;
        padding: 8px 16px;
        border-radius: 4px;
        border: 1px solid #9ca3af;
        background: #f9fafb;
        font-size: 13px;
        cursor: pointer;
      }
      @media print {
        .no-print {
          display: none;
        }
        body {
          margin: 0;
        }
        .letter-container {
          border: none;
          padding: 24px;
        }
      }
    </style>
  </head>
  <body>
    <div class="letter-container">
      <div class="letter-header">
        <img src="/tuu.png" alt="University Logo" class="logo" />
        <div class="uni-info">
          <h1>THE UNITY UNIVERSITY</h1>
          <h2>ADMISSION LETTER</h2>
        </div>
      </div>

      <div class="meta">
        <div><strong>Date:</strong> ${today}</div>
        <div><strong>Student ID:</strong> ${s.studentID || 'N/A'}</div>
      </div>

      <p>To: <strong>${fullName}</strong></p>
      <p>
        We are pleased to inform you that you have been offered admission to the
        <strong>${p.programmeName || ''}</strong> programme in the
        <strong>${p.faculty || ''}</strong> for the
        <strong>${p.intakeMonth || ''} ${p.intakeYear || ''}</strong> intake,
        <strong>${p.shift || ''}</strong> shift.
      </p>

      <p>
        Please note that this offer is subject to you fulfilling all university
        registration requirements and submitting all necessary documents within the
        stipulated time.
      </p>

      <div class="section-title">Summary of Admission</div>
      <p>
        Programme: <strong>${p.programmeName || ''}</strong><br />
        Faculty/College: <strong>${p.faculty || ''}</strong><br />
        Study Level: <strong>${p.studyLevel || ''}</strong><br />
        Intake: <strong>${p.intakeMonth || ''} ${p.intakeYear || ''}</strong><br />
        Shift: <strong>${p.shift || ''}</strong>
      </p>

      <div class="section-title">Contact Details</div>
      <p>
        Phone: <strong>${person.phone || ''}</strong><br />
        Email: <strong>${person.email || ''}</strong>
      </p>

      <div class="signature">
        <div>Sincerely,</div>
        <div class="signature-line"></div>
        <div>Registrar</div>
      </div>
    </div>

    <button class="no-print" onclick="window.print()">Print Admission Letter</button>
  </body>
</html>`;

    const win = window.open('', '_blank', 'width=900,height=1000');
    if (!win) return;
    win.document.write(letterHtml);
    win.document.close();
    win.focus();
  };

  const filteredStudents = students.filter((s) => {
    const p = s.programmeInformation || {};
    if (facultyFilter && p.faculty !== facultyFilter) return false;
    if (intakeFilter && p.intakeMonth !== intakeFilter) return false;
    if (shiftFilter && p.shift !== shiftFilter) return false;
    return true;
  });

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Submitted Students
        </h1>

        {/* Filters */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/15 rounded-2xl p-6 md:p-8 shadow-xl shadow-black/40 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1">
              Faculty
            </label>
            <select
              value={facultyFilter}
              onChange={(e) => setFacultyFilter(e.target.value)}
              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-sm text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
            >
              <option value="">All Faculties</option>
              {faculties.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1">
              Intake
            </label>
            <select
              value={intakeFilter}
              onChange={(e) => setIntakeFilter(e.target.value)}
              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-sm text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
            >
              <option value="">All Intakes</option>
              {intakes.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1">
              Shift
            </label>
            <select
              value={shiftFilter}
              onChange={(e) => setShiftFilter(e.target.value)}
              className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-sm text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
            >
              <option value="">All Shifts</option>
              {shifts.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Cards */}
        {filteredStudents.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-lg border border-white/15 rounded-2xl p-8 shadow-xl shadow-black/40">
            <p className="text-center text-slate-300">
              No submitted students found. Please submit the admission form first.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((s, filterIndex) => {
              const originalIndex = students.findIndex(student => student.studentID === s.studentID);
              return (
              <div
                key={`${s.studentID || filterIndex}-${filterIndex}`}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 hover:bg-white/10 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-500/20 duration-200"
              >
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-semibold text-white">
                    {s.personalInformation?.firstName}{' '}
                    {s.personalInformation?.middleName}{' '}
                    {s.personalInformation?.lastName}
                  </h2>
                  <span className="text-xs px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                    {s.studentID || 'No ID'}
                  </span>
                </div>

                <p className="text-sm text-slate-200 mb-1">
                  <span className="font-semibold text-slate-100">Programme:</span>{' '}
                  {s.programmeInformation?.programmeName}
                </p>
                <p className="text-sm text-slate-200 mb-1">
                  <span className="font-semibold text-slate-100">Faculty:</span>{' '}
                  {s.programmeInformation?.faculty}
                </p>
                <p className="text-sm text-slate-200 mb-1">
                  <span className="font-semibold text-slate-100">Intake:</span>{' '}
                  {s.programmeInformation?.intakeMonth} {s.programmeInformation?.intakeYear}
                </p>
                <p className="text-sm text-slate-200 mb-1">
                  <span className="font-semibold text-slate-100">Shift:</span>{' '}
                  {s.programmeInformation?.shift}
                </p>

                <p className="text-sm text-slate-300 mt-2 border-t border-white/10 pt-2">
                  <span className="font-semibold text-slate-200">Contact:</span>{' '}
                  {s.personalInformation?.phone} • {s.personalInformation?.email}
                </p>

                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => handlePrintLetter(s)}
                    className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-cyan-400/30 rounded-xl text-xs font-medium text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 transition"
                  >
                    View / Print Letter
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteStudent(originalIndex)}
                    className="px-3 py-2 border border-red-400/30 rounded-xl text-xs font-medium text-red-300 bg-red-500/10 hover:bg-red-500/20 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmittedStudents;


