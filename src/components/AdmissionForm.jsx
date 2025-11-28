import { useState } from 'react';

const AdmissionForm = ({ onSuccess }) => {
  // Personal Information
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [nationality, setNationality] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // Programme Information
  const [studyLevel, setStudyLevel] = useState('');
  const [faculty, setFaculty] = useState('');
  const [department, setDepartment] = useState('');
  const [programmeName, setProgrammeName] = useState('');
  const [intakeYear] = useState(new Date().getFullYear());
  const [intakeMonth, setIntakeMonth] = useState('');
  const [shift, setShift] = useState('');

  // Scholarship
  const [hasScholarship, setHasScholarship] = useState(false);
  const [fullScholarship, setFullScholarship] = useState(false);
  const [halfScholarship, setHalfScholarship] = useState(false);

  // Emergency Contact
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyRelationship, setEmergencyRelationship] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');

  // Education Background
  const [highSchoolName, setHighSchoolName] = useState('');
  const [completionYear, setCompletionYear] = useState('');

  // Student counter state
  const [studentCounters, setStudentCounters] = useState({});

  // College code mapping
  const collegeCodes = {
    'COMPUTING & INFORMATION TECHNOLOGY': 'CIT',
    'BUSINESS & ACCOUNTING': 'BA',
    'SOCIAL SCIENCE': 'SS',
    'HEALTH SCIENCE': 'HS'
  };

  // Shift code mapping
  const shiftCodes = {
    'Morning': 'M',
    'Afternoon': 'A',
    'Evening': 'E',
    'Weekend': 'W'
  };

  // Handle scholarship checkbox changes
  const handleScholarshipChange = (e) => {
    const checked = e.target.checked;
    setHasScholarship(checked);
    if (!checked) {
      setFullScholarship(false);
      setHalfScholarship(false);
    }
  };

  const handleFullScholarshipChange = (e) => {
    if (e.target.checked) {
      setFullScholarship(true);
      setHalfScholarship(false);
    } else {
      setFullScholarship(false);
    }
  };

  const handleHalfScholarshipChange = (e) => {
    if (e.target.checked) {
      setHalfScholarship(true);
      setFullScholarship(false);
    } else {
      setHalfScholarship(false);
    }
  };

  // Generate Student ID
  const generateStudentID = () => {
    if (!faculty || !intakeYear || !shift) {
      return null;
    }

    const collegeCode = collegeCodes[faculty] || 'UNK';
    const year = intakeYear.toString().slice(-2);
    const shiftCode = shiftCodes[shift] || 'M';

    // Create unique key for this combination (without level code)
    const key = `${collegeCode}/${year}/${shiftCode}`;

    // Get or initialize counter for this combination
    const currentCount = studentCounters[key] || 0;
    const newCount = currentCount + 1;

    // Update counters
    setStudentCounters(prev => ({
      ...prev,
      [key]: newCount
    }));

    // Format number with leading zero
    const number = newCount.toString().padStart(2, '0');

    return `${collegeCode}/${year}/${shiftCode}/${number}`;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const studentID = generateStudentID();

    const formData = {
      personalInformation: {
        firstName,
        middleName,
        lastName,
        dateOfBirth,
        gender,
        nationality,
        phone,
        email
      },
      programmeInformation: {
        studyLevel,
        faculty,
        department,
        programmeName,
        intakeYear,
        intakeMonth,
        shift
      },
      scholarship: {
        hasScholarship,
        fullScholarship,
        halfScholarship
      },
      emergencyContact: {
        name: emergencyName,
        relationship: emergencyRelationship,
        phone: emergencyPhone
      },
      educationBackground: {
        highSchoolName,
        completionYear
      },
      studentID
    };

    console.log('Form Data:', formData);
    console.log('Student ID:', studentID);

    // Save to localStorage for use on other pages
    try {
      const existing = JSON.parse(localStorage.getItem('submittedStudents') || '[]');
      const updated = [...existing, formData];
      localStorage.setItem('submittedStudents', JSON.stringify(updated));
      
      // Show success message
      alert(`✅ Success! Student ${firstName} ${lastName} has been successfully admitted.\nStudent ID: ${studentID}`);
      
      // Redirect to submitted students page
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 500);
      }
    } catch (err) {
      console.error('Failed to save submitted student to localStorage', err);
      alert('❌ Error: Failed to submit the form. Please try again.');
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Admission Form
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/15 rounded-2xl p-6 md:p-8 shadow-xl shadow-black/40 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-cyan-500/20 transition-transform transition-shadow duration-200">
            <h2 className="text-2xl font-semibold text-white mb-4 border-b border-white/10 pb-3">
              1. Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-sm text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1">
                  Middle Name
                </label>
                <input
                  type="text"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-sm text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-sm text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-sm text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-sm text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1">
                  Nationality
                </label>
                <input
                  type="text"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-sm text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-sm text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-sm text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
                  required
                />
              </div>
            </div>
          </div>

          {/* Programme Information */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/15 rounded-2xl p-6 md:p-8 shadow-xl shadow-black/40 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-cyan-500/20 transition-transform transition-shadow duration-200">
            <h2 className="text-2xl font-semibold text-white mb-4 border-b border-white/10 pb-3">
              2. Programme Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1">
                  Study Level
                </label>
                <select
                  value={studyLevel}
                  onChange={(e) => setStudyLevel(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-sm text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
                  required
                >
                  <option value="">Select Study Level</option>
                  <option value="Degree">Degree</option>
                  <option value="Master">Master</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1">
                  Faculty/College
                </label>
                <select
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-sm text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
                  required
                >
                  <option value="">Select Faculty/College</option>
                  <option value="COMPUTING & INFORMATION TECHNOLOGY">COMPUTING & INFORMATION TECHNOLOGY</option>
                  <option value="BUSINESS & ACCOUNTING">BUSINESS & ACCOUNTING</option>
                  <option value="SOCIAL SCIENCE">SOCIAL SCIENCE</option>
                  <option value="HEALTH SCIENCE">HEALTH SCIENCE</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1">
                  Department
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-sm text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1">
                  Programme Name
                </label>
                <input
                  type="text"
                  value={programmeName}
                  onChange={(e) => setProgrammeName(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-sm text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1">
                  Intake
                </label>
                <select
                  value={intakeMonth}
                  onChange={(e) => setIntakeMonth(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-sm text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
                  required
                >
                  <option value="">Select Intake</option>
                  <option value="September">September</option>
                  <option value="Crash Course">Crash Course</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1">
                  Shift
                </label>
                <select
                  value={shift}
                  onChange={(e) => setShift(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-sm text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
                  required
                >
                  <option value="">Select Shift</option>
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                  <option value="Weekend">Weekend</option>
                </select>
              </div>
            </div>
          </div>

          {/* Scholarship */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/15 rounded-2xl p-6 md:p-8 shadow-xl shadow-black/40 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-cyan-500/20 transition-transform transition-shadow duration-200">
            <h2 className="text-2xl font-semibold text-white mb-4 border-b border-white/10 pb-3">
              3. Scholarship
            </h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="hasScholarship"
                  checked={hasScholarship}
                  onChange={handleScholarshipChange}
                  className="w-4 h-4 text-cyan-500 border-white/30 rounded focus:ring-cyan-400/70"
                />
                <label htmlFor="hasScholarship" className="ml-2 text-sm font-medium text-slate-200">
                  Scholarship?
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="fullScholarship"
                  checked={fullScholarship}
                  onChange={handleFullScholarshipChange}
                  disabled={!hasScholarship}
                  className="w-4 h-4 text-cyan-500 border-white/30 rounded focus:ring-cyan-400/70 disabled:opacity-50"
                />
                <label htmlFor="fullScholarship" className="ml-2 text-sm font-medium text-slate-200">
                  Full Scholarship
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="halfScholarship"
                  checked={halfScholarship}
                  onChange={handleHalfScholarshipChange}
                  disabled={!hasScholarship}
                  className="w-4 h-4 text-cyan-500 border-white/30 rounded focus:ring-cyan-400/70 disabled:opacity-50"
                />
                <label htmlFor="halfScholarship" className="ml-2 text-sm font-medium text-slate-200">
                  Half Scholarship
                </label>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/15 rounded-2xl p-6 md:p-8 shadow-xl shadow-black/40 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-cyan-500/20 transition-transform transition-shadow duration-200">
            <h2 className="text-2xl font-semibold text-white mb-4 border-b border-white/10 pb-3">
              4. Emergency Contact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={emergencyName}
                  onChange={(e) => setEmergencyName(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-sm text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1">
                  Relationship
                </label>
                <input
                  type="text"
                  value={emergencyRelationship}
                  onChange={(e) => setEmergencyRelationship(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-sm text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  value={emergencyPhone}
                  onChange={(e) => setEmergencyPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-sm text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
                  required
                />
              </div>
            </div>
          </div>

          {/* Education Background */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/15 rounded-2xl p-6 md:p-8 shadow-xl shadow-black/40 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-cyan-500/20 transition-transform transition-shadow duration-200">
            <h2 className="text-2xl font-semibold text-white mb-4 border-b border-white/10 pb-3">
              5. Education Background
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1">
                  High School Name
                </label>
                <input
                  type="text"
                  value={highSchoolName}
                  onChange={(e) => setHighSchoolName(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-sm text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-1">
                  Completion Year
                </label>
                <input
                  type="number"
                  value={completionYear}
                  onChange={(e) => setCompletionYear(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-sm text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
                  required
                  min="1950"
                  max="2099"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-cyan-500/80 hover:bg-cyan-400 text-slate-900 font-semibold rounded-xl px-8 py-3 shadow-md shadow-cyan-500/40 transition hover:shadow-lg hover:shadow-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdmissionForm;

