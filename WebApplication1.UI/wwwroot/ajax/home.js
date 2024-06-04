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
            let options = '<option value="">Select Exam</option>';
            data.forEach(function (exam) {
                options += `<option value="${exam.examId}">${exam.title}</option>`;
            });
            $('#examId').html(options);
        }
    });

    $.ajax({
        url: baseurl + 'api/Students',
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + gettoken
        },
        success: function (data) {
            let options = '<option value="">Select Student</option>';
            data.forEach(function (student) {
                options += `<option value="${student.studentId}">${student.name}</option>`;
            });
            $('#studentId').html(options);
        }
    });
}

fetchExams();

$("#examId, #studentId").change(function (e) {
    e.preventDefault();

    if ($("#examId").val() && $("#studentId").val()) {
        $.ajax({
            url: baseurl + 'api/StudentAnswer/GetStudentExamAnswerGet/',
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + gettoken
            },
            data: {
                studentId: $("#studentId").val(),
                examId: $("#examId").val()
            },
            success: function (data) {
                console.log(data);
                let questionsHtml = '';
                data.forEach(function (question, index) {
                    console.log(question);
                    questionsHtml += `
                                <div class="form-group">
                                    <h4>${index + 1}. ${question.answerText}</h4>
                                    <p> ${question.question.text} </p>
                                </div>
                            `;
                });
                $('#questionsContainer').html(questionsHtml);
                $('#examSection').show();
            }
        });
    }
});