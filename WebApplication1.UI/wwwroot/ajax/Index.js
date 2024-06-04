var baseurl = "https://localhost:7777/";
var gettoken = localStorage.getItem("token");



function fetchExams() {
    $.ajax({
        url: baseurl + 'api/Exams',
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + gettoken
        },
        success: function (data) {
            let rows = '';
            data.forEach(function (exam) {
                rows += `
                            <tr>
                                <td>${exam.examId}</td>
                                <td>${exam.title}</td>
                                <td>
                                    <button onclick="editExam(${exam.examId}, '${exam.title}')">Edit</button>
                                    <button onclick="deleteExam(${exam.examId})">Delete</button>
                                </td>
                            </tr>
                        `;
            });
            $('#examsTable tbody').html(rows);
        }
    });
}

fetchExams();

// Add new exam
$('#addExamForm').on('submit', function (event) {
    event.preventDefault();
    const exam = {
        Title: $('#examName').val()
    };
    $.ajax({
        url: baseurl + 'api/Exams',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(exam),
        headers: {
            "Authorization": "Bearer " + gettoken
        },
        success: function () {
            $('#examName').val('');
            fetchExams();
        }
    });
})
// Edit exam
function editExam(id, name) {
    $('#updateExamId').val(id);
    $('#updateExamName').val(name);

    // Update exam
    $('#updateExamForm').on('submit', function (event) {
        event.preventDefault();
        const examId = $('#updateExamId').val();
        const exam = {
            ExamId: examId,
            Title: $('#updateExamName').val()
        };
        $.ajax({
            url: baseurl + 'api/Exams/'+ examId,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(exam),
            headers: {
                "Authorization": "Bearer " + gettoken
            },
            success: function () {
                $('#updateExamId').val('');
                $('#updateExamName').val('');
                fetchExams();
            }
        });
    })

}

// Delete exam
function deleteExam(id) {
    $.ajax({
        url: baseurl + 'api/Exams/' + id,
        method: 'DELETE',
        headers: {
            "Authorization": "Bearer " + gettoken
        },
        success: function () {
            fetchExams();
        }
    });

    // Initial fetch of exams
    fetchExams();
}