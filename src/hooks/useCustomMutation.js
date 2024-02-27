import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCustomMutation = (axiosApi) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (data) => {
      const response = await axiosApi(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['room']);
    }
  });

  return mutate;
};
