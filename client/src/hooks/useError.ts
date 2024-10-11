import { FieldValues, UseFormSetError } from "react-hook-form";

const useError = () => {
  const handleServerError = <T extends FieldValues>(
    error: any,
    setError: UseFormSetError<T>,
    defaultField: keyof T = "email"
  ) => {
    const errorMessage = error?.data || "An error occurred. Please try again.";

    const field = error?.data?.field || defaultField;

    setError(field, {
      type: "server",
      message: errorMessage,
    });
  };

  return { handleServerError };
};

export default useError;
