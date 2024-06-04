var baseurl = "https://localhost:7777/";
var gettoken = localStorage.getItem("token");


// Fetch and display students
function fetchStudents() {
    $.ajax({
        url: baseurl + 'api/Students',
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + gettoken
        },
        success: function (data) {
            let rows = '';
            data.forEach(function (student) {
                rows += `
                                    <tr>
                                        <td>${student.studentId}</td>
                                        <td>${student.name}</td>

                                        <td>
                                            <button onclick="editStudent(${student.studentId}, '${student.name}', '${student.email}')">Edit</button>
                                            <button onclick="deleteStudent(${student.studentId})">Delete</button>
                                        </td>
                                    </tr>
                                `;
            });
            $('#studentsTable tbody').html(rows);
        }
    });
}

// Add new student
$('#addStudentForm').on('submit', function (event) {
    event.preventDefault();
    const student = {
        name: $('#studentName').val(),
    };
    $.ajax({
        url: baseurl + 'api/Students',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(student),
        headers: {
            "Authorization": "Bearer " + gettoken
        },
        success: function () {
            $('#studentName').val('');
            $('#studentEmail').val('');
            fetchStudents();
        }
    });
});

// Edit student
function editStudent(id, name, email) {
    $('#updateStudentId').val(id);
    $('#updateStudentName').val(name);
    $('#updateStudentEmail').val(email);
}

// Update student
$('#updateStudentForm').on('submit', function (event) {
    event.preventDefault();
    const studentId = $('#updateStudentId').val();
    const student = {
        studentId: studentId,
        name: $('#updateStudentName').val(),
        email: $('#updateStudentEmail').val()
    };
    $.ajax({
        url: baseurl + 'api/Students/' + studentId,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(student),
        headers: {
            "Authorization": "Bearer " + gettoken
        },
        success: function () {
            $('#updateStudentId').val('');
            $('#updateStudentName').val('');
            fetchStudents();
        }
    });
});

// Delete student
function deleteStudent(id) {
    $.ajax({
        url: baseurl + 'api/Students/' + id,
        method: 'DELETE',
        headers: {
            "Authorization": "Bearer " + gettoken
        },
        success: function () {
            fetchStudents();
        }
    });
}

// Initial fetch of students
fetchStudents();