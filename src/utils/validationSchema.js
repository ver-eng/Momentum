import * as yup from "yup";

export const taskSchema = yup.object().shape({
  name: yup
    .string()
    .required("")
    .min(3, "მინიმუმ სამი სიმბოლო")
    .max(255, "მაქსიმუმ 255 სიმბოლო"),

  description: yup
    .string()
    .test(
      "word-count",
      "Description must have at least 4 words",
      (value) => !value || value.trim().split(/\s+/).length >= 4
    )
    .max(255, "Description cannot exceed 255 characters"),

  due_date: yup
    .date()
    .nullable()
    .required("Due date is required")
    .min(new Date(), "Due date cannot be in the past"),

  department: yup.object().shape({
    id: yup
      .number()
      .typeError("Please select a department")
      .required("Department is required"),
  }),

  employee: yup.object().shape({
    id: yup
      .number()
      .typeError("Please select an employee")
      .required("Employee is required"),
  }),

  status: yup.object().shape({
    id: yup
      .number()
      .typeError("Please select a status")
      .required("Status is required"),
  }),

  priority: yup.object().shape({
    id: yup
      .number()
      .typeError("Please select a priority")
      .required("Priority is required"),
  }),
});
