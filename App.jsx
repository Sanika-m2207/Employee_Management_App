import { useEffect, useState } from "react";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";

function App() {

  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const fetchEmployees = async () => {
    const res = await fetch("http://localhost:5000/api/employees");
    const data = await res.json();
    setEmployees(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="p-10 max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Employee Management
      </h1>

      <EmployeeForm
        fetchEmployees={fetchEmployees}
        editingEmployee={editingEmployee}
        setEditingEmployee={setEditingEmployee}
      />

      <EmployeeTable
        employees={employees}
        fetchEmployees={fetchEmployees}
        setEditingEmployee={setEditingEmployee}
      />

    </div>
  );
}

export default App;