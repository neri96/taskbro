import { useProjectFilesAddMutation } from "../../../app/services/project";

const useUploadFile = () => {
  const [addFiles] = useProjectFilesAddMutation();

  const handleUpload = async (id: string, files: FileList) => {
    const formData: any = new FormData();

    formData.append("projectId", id);

    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    try {
      await addFiles(formData).unwrap();
    } catch (error) {
      throw error;
    }
  };

  return { handleUpload };
};

export default useUploadFile;
