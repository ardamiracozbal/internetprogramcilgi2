var baseurl = "https://localhost:7777/";
var gettoken = localStorage.getItem("token");

// Fetch and display exams for selection
function fetchExams() {
    $.ajax({
        url: baseurl + 'api/Exams',
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + gettoken
        },
        success: function (data) {
            let options = '<option value="">Select Exam</option>';
            data.forEach(function (exam) {
                options += `<option value="${exam.examId}">${exam.title}</option>`;
            });
            $('#examId').html(options);
            $('#updateExamId').html(options);
        }
    });
}

// Fetch and display questions
function fetchQuestions() {
    $.ajax({
        url: baseurl + 'api/Questions',
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + gettoken
        },
        success: function (data) {
            let rows = '';
            data.forEach(function (question) {
                rows += `
                                    <tr>
                                        <td>${question.questionId}</td>
                                        <td>${question.examId}</td>
                                        <td>${question.text}</td>
                                        <td>
                                            <button onclick="editQuestion(${question.questionId}, ${question.examId}, '${question.text}')">Edit</button>
                                            <button onclick="deleteQuestion(${question.questionId})">Delete</button>
                                        </td>
                                    </tr>
                                `;
            });
            $('#questionsTable tbody').html(rows);
        }
    });
}

// Add new question
$('#addQuestionForm').on('submit', function (event) {
    event.preventDefault();
    const question = {
        examId: $('#examId').val(),
        text: $('#questionText').val(),
    };
    $.ajax({
        url: baseurl + 'api/Questions',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(question),
        headers: {
            "Authorization": "Bearer " + gettoken
        },
        success: function () {
            $('#examId').val('');
            $('#questionText').val('');
            fetchQuestions();
        }
    });
});

// Edit question
function editQuestion(id, examId, text) {
    $('#updateQuestionId').val(id);
    $('#updateExamId').val(examId);
    $('#updateQuestionText').val(text);
}

// Update question
$('#updateQuestionForm').on('submit', function (event) {
    event.preventDefault();
    const questionId = $('#updateQuestionId').val();
    const question = {
        questionId: questionId,
        examId: $('#updateExamId').val(),
        text: $('#updateQuestionText').val(),
    };
    $.ajax({
        url: baseurl + 'api/Questions/'+questionId,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(question),
        headers: {
            "Authorization": "Bearer " + gettoken
        },
        success: function () {
            $('#updateQuestionId').val('');
            $('#updateExamId').val('');
            $('#updateQuestionText').val('');
            fetchQuestions();
        }
    });
});

// Delete question
function deleteQuestion(id) {
    $.ajax({
        url: baseurl + 'api/Questions/'+id,
        method: 'DELETE',
        headers: {
            "Authorization": "Bearer " + gettoken
        },
        success: function () {
            fetchQuestions();
        }
    });
}

// Initial fetch of exams and questions
fetchExams();
fetchQuestions();