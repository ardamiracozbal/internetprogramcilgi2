    $(document).ready(function () {
            var token = localStorage.getItem("token");
    if (token == "" || token == null) {
        location.href = "/Login/Index";
    return false;
            }
        });