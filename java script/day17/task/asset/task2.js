let employees = [];

        const addEmployee = () => {
            let name = document.getElementById("employeeName").value;
            let department = document.getElementById("department").value;
            let salary = document.getElementById("salary").value;

            let employee = {
                name: name,
                department: department,
                salary: salary
            };

            employees.push(employee);

            let output = "";

            employees.forEach(function(employee) {
                output += `
                    <tr>
                        <td>${employee.name}</td>
                        <td>${employee.department}</td>
                        <td>${employee.salary}</td>
                    </tr>
                `;
            });

            document.getElementById("employeeList").innerHTML = output;
        }