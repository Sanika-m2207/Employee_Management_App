function EmployeeTable({ employees, fetchEmployees, setEditingEmployee }) {

  const deleteEmployee = async id => {
    await fetch(`http://localhost:5000/api/employees/${id}`, {
      method: "DELETE"
    });

    fetchEmployees();
  };

  return (
    <table className="w-full border">

      <thead className="bg-gray-200">
        <tr>
          <th className="border p-2">Name</th>
          <th className="border p-2">Email</th>
          <th className="border p-2">Mobile</th>
          <th className="border p-2">Department</th>
          <th className="border p-2">Salary</th>
          <th className="border p-2">Action</th>
        </tr>
      </thead>

      <tbody>
        {employees.map(emp => (
          <tr key={emp.id}>

            <td className="border p-2">{emp.name}</td>
            <td className="border p-2">{emp.email}</td>
            <td className="border p-2">{emp.mobile}</td>
            <td className="border p-2">{emp.department}</td>
            <td className="border p-2">{emp.salary}</td>

            <td className="border p-2 flex gap-2">

              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded"
                onClick={() => setEditingEmployee(emp)}
              >
                Edit
              </button>

              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => deleteEmployee(emp.id)}
              >
                Delete
              </button>

            </td>

          </tr>
        ))}
      </tbody>

    </table>
  );
}

export default EmployeeTable;