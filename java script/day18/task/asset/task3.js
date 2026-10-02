let user = JSON.parse(localStorage.getItem("user"));

        if (localStorage.getItem("loggedIn") === "true") {

            document.getElementById("userData").innerHTML = `
                <h2>Welcome ${user.name}</h2>
                <p>Email: ${user.email}</p>
            `;

        } else {

            window.location.href = "login.html";

        }

        const logout = () => {
            localStorage.removeItem("loggedIn");
            window.location.href = "login.html";
        }