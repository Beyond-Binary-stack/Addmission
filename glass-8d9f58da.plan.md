<!-- 8d9f58da-ba2f-471d-863e-f56fb5a73b6b dbcb1556-cf94-4d0a-8841-30e93006feb0 -->
# Academic Management System MVP

## Overview

Transform the current admission system into a role-based academic management platform with result management workflow: Lecturer uploads results → Dean reviews/approves → Students view results. All roles can export data.

## Architecture

### User Roles & Permissions

1. **Admin**: Manage all users, view all data, export everything
2. **Dean**: Assign lecturers to courses, review/approve results, export faculty data
3. **Lecturer**: Upload results for assigned courses, view assigned students, export course data
4. **Student**: View own results, export personal transcripts

### Data Models (localStorage)

**users.json** structure:

```json
{
  "id": "unique-id",
  "username": "john.doe",
  "password": "hashed", 
  "role": "student|lecturer|dean|admin",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "facultyId": "faculty-id", // for dean/lecturer
  "studentId": "CIT/25/M/01" // for students (link to admitted students)
}
```

**courses.json** structure:

```json
{
  "id": "course-id",
  "courseCode": "CIT101",
  "courseName": "Introduction to Programming",
  "creditHours": 3,
  "facultyId": "faculty-id",
  "lecturerId": "lecturer-id", // assigned by dean
  "semester": "Fall 2025"
}
```

**results.json** structure:

```json
{
  "id": "result-id",
  "studentId": "CIT/25/M/01",
  "courseId": "course-id",
  "lecturerId": "lecturer-id",
  "assignmentMarks": 20,
  "midtermMarks": 25,
  "finalExamMarks": 45,
  "totalMarks": 90,
  "grade": "A",
  "status": "pending|approved|rejected",
  "uploadedAt": "2025-11-26",
  "reviewedBy": "dean-id",
  "reviewedAt": "2025-11-27",
  "comments": "Excellent performance"
}
```

**faculties.json** structure:

```json
{
  "id": "faculty-id",
  "name": "COMPUTING & INFORMATION TECHNOLOGY",
  "code": "CIT",
  "deanId": "dean-user-id"
}
```

## Implementation Steps

### Phase 1: Authentication & Role System

1. Create login page with role-based routing
2. Build user management (create default admin, dean, lecturer, student accounts)
3. Implement role-based navigation/header
4. Add logout functionality
5. Store current user session in localStorage

### Phase 2: Data Setup & Course Management

1. Create faculties data (reuse existing admission faculties)
2. Build course management page (Admin/Dean can create courses)
3. Implement lecturer assignment to courses (Dean functionality)
4. Link admitted students to the student user accounts
5. Display enrolled students per course

### Phase 3: Result Upload (Lecturer Role)

1. Create lecturer dashboard showing assigned courses
2. Build result upload form with detailed marks (assignment, midterm, final)
3. Auto-calculate total marks and grade (A, B, C, D, F based on percentage)
4. Submit results with "pending" status for dean approval
5. Show upload history and status

### Phase 4: Result Approval (Dean Role)

1. Create dean dashboard showing pending results
2. Build result review page with student/course details
3. Implement approve/reject functionality with comments
4. Show approval history
5. Notifications/badges for pending count

### Phase 5: Result Viewing (Student Role)

1. Create student dashboard showing enrolled courses
2. Display results (only approved) with detailed breakdown
3. Show grade, marks breakdown, lecturer comments
4. Calculate and display semester GPA/CGPA
5. Filter by semester/academic year

### Phase 6: Export Functionality (All Roles)

1. **Student**: Export personal transcript (PDF/CSV)
2. **Lecturer**: Export course results (all students in assigned courses)
3. **Dean**: Export faculty-wide results, course reports
4. **Admin**: Export all data (users, courses, results)
5. Implement CSV and PDF export utilities

### Phase 7: UI/UX Polish

1. Apply glass effect styling to all new pages (match current admission form style)
2. Add loading states and error handling
3. Implement confirmation dialogs for critical actions
4. Add search/filter capabilities to all tables
5. Responsive design for all pages

## Key Features for MVP

- **Login System**: Role-based authentication with mock backend structure
- **Course Assignment**: Dean assigns specific lecturers to courses
- **Result Upload**: Lecturer uploads detailed marks (assignment, midterm, final)
- **Approval Workflow**: Dean reviews pending results before students see them
- **Result Viewing**: Students see only approved results with full breakdown
- **Export**: All roles can export relevant data (CSV format minimum)
- **Glass Effect UI**: Consistent modern design across all pages

## Pages/Routes Structure

```
/login - Login page
/admin - Admin dashboard
  /admin/users - User management
  /admin/courses - Course management
  /admin/export - Export all data
  
/dean - Dean dashboard
  /dean/courses - View/assign courses to lecturers
  /dean/results/pending - Review pending results
  /dean/results/approved - View approved results
  /dean/export - Export faculty data
  
/lecturer - Lecturer dashboard
  /lecturer/courses - My assigned courses
  /lecturer/upload-results - Upload results form
  /lecturer/results - View uploaded results (pending/approved)
  /lecturer/export - Export course results
  
/student - Student dashboard
  /student/results - View my results
  /student/transcript - Full transcript view
  /student/export - Export transcript
  
/admission - Keep existing admission form (admin only)
/submitted - Keep existing submitted students (admin only)
```

## Technical Notes

- Use React Context API for user authentication state
- localStorage keys: `currentUser`, `users`, `courses`, `results`, `faculties`
- Prepare API service layer with mock functions (easy to replace with real backend)
- Keep existing admission form integrated as admin-only feature
- Reuse student IDs from admission system for student accounts

### To-dos

- [ ] Build login page and authentication system with role-based routing
- [ ] Create React Context for user state and role management
- [ ] Create seed data for users, faculties, and sample courses
- [ ] Build course management pages for admin/dean to create and assign courses
- [ ] Create lecturer dashboard with assigned courses and result upload form
- [ ] Implement result upload with detailed marks and grade calculation
- [ ] Build dean approval workflow for reviewing pending results
- [ ] Create student dashboard to view approved results and grades
- [ ] Implement CSV export for all user roles
- [ ] Apply glass effect styling and polish UI across all new pages