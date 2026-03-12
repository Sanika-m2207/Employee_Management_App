import * as yup from "yup";

export const employeeSchema = yup.object({

  name: yup
    .string()
    .required("Employee name is required"),

  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

  mobile: yup
    .string()
    .matches(/^[0-9]{10}$/, "Mobile must be exactly 10 digits")
    .required("Mobile number is required"),

  department: yup
    .string()
    .required("Department is required"),

  salary: yup
    .number()
    .typeError("Salary must be a number")
    .required("Salary is required")

});