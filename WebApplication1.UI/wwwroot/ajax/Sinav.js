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
        }
    });
}

// Fetch and display questions for the selected exam
function fetchQuestions(examId) {
    $.ajax({
        url: baseurl + 'api/Questions/GetExamToQestions/'+examId,
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + gettoken
        },
        success: function (data) {
            let questionsHtml = '';
            data.forEach(function (question, index) {
                console.log(question);
                questionsHtml += `
                                    <div>
                                        <p>${index + 1}. ${question.text}</p>
                                        <textarea name="question_${question.questionId}" class="form-control"></textarea>
                                    </div>
                                `;
            });
            $('#questionsContainer').html(questionsHtml);
            $('#examSection').show();
        }
    });
}

// Handle exam selection
$('#selectExamForm').on('submit', function (event) {
    event.preventDefault();
    const examId = $('#examId').val();
    if (examId) {
        fetchQuestions(examId);
    }
});

// Handle exam submission
$('#examForm').on('submit', function (event) {
    event.preventDefault();

    const studentId = $('#studentId').val();
    const examId = $('#examId').val();
    const studentAnswers = [];

    $('#questionsContainer textarea').each(function () {
        const questionId = $(this).attr('name').split('_')[1];
        const answerText = $(this).val();
        studentAnswers.push({
            studentId: studentId,
            examId: examId,
            QuestionId: questionId,
            AnswerText: answerText
        });
    });

    $.ajax({
        url: baseurl + 'api/StudentAnswer',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(studentAnswers),
        headers: {
            "Authorization": "Bearer " + gettoken
        },
        success: function (data) {
            alert(data.message);
            window.location.reload();
            displayResults(data);


        }
    });
});

// Display exam results
function displayResults(results) {
    let correctAnswers = 0;
    let incorrectAnswers = 0;

    results.forEach(function (result) {
        if (result.isCorrect) {
            correctAnswers++;
        } else {
            incorrectAnswers++;
        }
    });

    $('#resultMessage').html(`Correct Answers: ${correctAnswers} <br> Incorrect Answers: ${incorrectAnswers}`);
    $('#examSection').hide();
    $('#resultSection').show();
}

// Initial fetch of exams
fetchExams();