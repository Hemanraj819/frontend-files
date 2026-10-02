const login = () => {
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;

            let user = JSON.parse(localStorage.getItem("user"));

            if (user && email === user.email && password === user.password) {

                localStorage.setItem("loggedIn", "true");

                window.location.href = "dashboard.html";

            } else {
                alert("Invalid Email or Password");
            }
        }