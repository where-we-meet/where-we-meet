import { queryClient } from '@/main';
import { useMutation } from '@tanstack/react-query';

export const useCustomMutation = (axiosApi) => {
  const { mutate } = useMutation({
    mutationFn: async (data) => {
      const response = await axiosApi(data);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['room'] });
    }
  });

  return mutate;
};
