$(document).ready(function () {
    baseurl = "https://localhost:7777/";
    $("#register").click(function (e) { 
        e.preventDefault();
        var dto = {
            UserName: $("#username").val(),
            FullName: $("#fullname").val(),
            Email: $("#email").val(),
            Password: $("#password").val(),
            Addres: $("#addres").val(),
            PhoneNumber: $("#phonenumber").val(),
        };         
        console.log(dto);
        console.log(baseurl);   
        $.ajax({
            type: "POST",
            url: baseurl + "api/User/Add",
            contentType: "application/json",
            data: JSON.stringify(dto),
            success: function (response) {
                console.log(response);  
                if(response.status == true){

                    $("#divResult")
                    .show()
                    .removeClass()
                    .addClass("alert alert-success")
                    .html("Kayıt Başarılı Login Sayfasına Yönelndiriliyorsunuz.!")
                    .fadeOut(5000);
                    setTimeout(function() {
                        window.location.href = "/login";
                    }, 2000);    
                }
                else{
                    $("#divResult")
                    .show()
                    .removeClass()
                    .addClass("alert alert-danger")
                    .html(response.message)
                    .fadeOut(10000);
                }
            },
            error: function (xhr, status, error) {
                var errorMessages;
            }
        });
    });
$("#login").click(function (e) { 
        e.preventDefault();
        var dto = {
            UserName: $("#UserName").val(),
            Password: $("#password").val(),
        };         
        console.log(dto);
        console.log(baseurl);   
        $.ajax({
            type: "POST",
            url: baseurl + "api/User/SignIn",
            contentType: "application/json",
            data: JSON.stringify(dto),
            success: function (response) {
                console.log(response);  
                if(response.status == true){
                    $("#divResult")
                    .show()
                    .removeClass()
                    .addClass("alert alert-success")
                    .html("Giriş Başarılı Ana Sayfaya Yönelndiriliyorsunuz.!")
                    .fadeOut(5000);
                    localStorage.setItem("token", response.message);
                    setTimeout(function() {
                        window.location.href = "/admin";
                    }, 2000);    
                }
                else{
                    $("#divResult")
                    .show()
                    .removeClass()
                    .addClass("alert alert-danger")
                    .html(response.message)
                    .fadeOut(10000);
                }
            },
            error: function (xhr, status, error) {
                var errorMessages;
            }
        });
    });

  
   
});



 