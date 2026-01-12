// nodejs file for api

const express = require('express');

const app = express();
const PORT = 3000;

// Mock student data
const students = [
    {
        id: 'ENG001',
        name: 'John Doe',
        department: 'Computer Engineering',
        gpa: 3.85
    },
    {
        id: 'ENG002',
        name: 'Jane Smith',
        department: 'Civil Engineering',
        gpa: 3.72
    },
    {
        id: 'ENG003',
        name: 'Mike Johnson',
        department: 'Mechanical Engineering',
        gpa: 3.91
    },
    {
        id: 'ENG004',
        name: 'Sarah Williams',
        department: 'Computer Engineering',
        gpa: 3.78
    },
    {
        id: 'ENG005',
        name: 'Tom Brown',
        department: 'Electrical Engineering',
        gpa: 3.65
    },
    {
        id: 'ENG006',
        name: 'Emma Davis',
        department: 'Civil Engineering',
        gpa: 3.88
    }
];

app.use(express.json());

// API to get all students with GPA grouped by department
app.get('/api/students/gpa', (req, res) => {
    const groupedByDept = students.reduce((acc, student) => {
        if (!acc[student.department]) {
            acc[student.department] = [];
        }
        acc[student.department].push({
            id: student.id,
            name: student.name,
            gpa: student.gpa
        });
        return acc;
    }, {});

    res.json(groupedByDept);
});

// API to query individual student GPA by ID
app.get('/api/students/:id/gpa', (req, res) => {
    const student = students.find(s => s.id === req.params.id);

    if (!student) {
        return res.status(404).json({ error: 'Student not found' });
    }

    res.json({
        id: student.id,
        name: student.name,
        department: student.department,
        gpa: student.gpa
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});