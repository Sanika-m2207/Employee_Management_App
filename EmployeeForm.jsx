import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { employeeSchema } from "../validation/employeeSchema";
import { useEffect } from "react";

function EmployeeForm({ fetchEmployees, editingEmployee, setEditingEmployee }) {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(employeeSchema)
  });

  // Load data into form when editing
  useEffect(() => {
    if (editingEmployee) {
      reset(editingEmployee);
    }
  }, [editingEmployee, reset]);

  const onSubmit = async (data) => {

    try {

      // UPDATE employee
      if (editingEmployee) {
        console.log("Updating employee:", editingEmployee);
        await fetch(`http://localhost:5000/api/employees/${editingEmployee.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });

        setEditingEmployee(null);

      } else {

        // CREATE employee
        await fetch("http://localhost:5000/api/employees", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });

      }

      reset();
      fetchEmployees();

    } catch (error) {
      console.error("Error saving employee:", error);
    }

  };

  const handleCancel = () => {
    setEditingEmployee(null);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-md p-6 rounded-lg mb-6"
    >

      <div className="grid grid-cols-2 gap-4">

        {/* Name */}
        <div>
          <input
            {...register("name")}
            placeholder="Employee Name"
            className="border p-2 w-full rounded"
          />
          <p className="text-red-500 text-sm">
            {errors.name?.message}
          </p>
        </div>

        {/* Email */}
        <div>
          <input
            {...register("email")}
            placeholder="Email"
            className="border p-2 w-full rounded"
          />
          <p className="text-red-500 text-sm">
            {errors.email?.message}
          </p>
        </div>

        {/* Mobile */}
        <div>
          <input
            {...register("mobile")}
            placeholder="Mobile"
            className="border p-2 w-full rounded"
          />
          <p className="text-red-500 text-sm">
            {errors.mobile?.message}
          </p>
        </div>

        {/* Department */}
        <div>
          <input
            {...register("department")}
            placeholder="Department"
            className="border p-2 w-full rounded"
          />
          <p className="text-red-500 text-sm">
            {errors.department?.message}
          </p>
        </div>

        {/* Salary */}
        <div className="col-span-2">
          <input
            {...register("salary")}
            placeholder="Salary"
            className="border p-2 w-full rounded"
          />
          <p className="text-red-500 text-sm">
            {errors.salary?.message}
          </p>
        </div>

      </div>

      {/* Buttons */}
      <div className="mt-4 flex gap-3">

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingEmployee ? "Update Employee" : "Add Employee"}
        </button>

        {editingEmployee && (
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}

      </div>

    </form>
  );
}

export default EmployeeForm;