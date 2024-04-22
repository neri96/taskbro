import { useProjectCompleteMutation } from "../../../app/services/project";

import AudioCompleted from "../../../assets/sounds/completion.wav";

const useProjectComplete = () => {
  const [projectComplete] = useProjectCompleteMutation();

  const handleComplete = async (data: {
    projectId: string;
    isCurrentlyCompleted: boolean;
  }) => {
    try {
      const result = await projectComplete(data).unwrap();

      if (result.completed) {
        setTimeout(() => {
          const audio = new Audio(AudioCompleted);

          audio.play();
        }, 300);
      }
    } catch (error) {
      throw error;
    }
  };

  return handleComplete;
};

export default useProjectComplete;
