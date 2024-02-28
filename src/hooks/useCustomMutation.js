import { queryClient } from '@/main';
import { useMutation } from '@tanstack/react-query';

export const useCustomMutation = (axiosApi) => {
  const { mutate } = useMutation({
    mutationFn: async (data) => {
      const response = await axiosApi(data);
      return response.data;
    },
    onSuccess: async (result) => {
      console.log('1112312312', result);
      // await queryClient.invalidateQueries({ queryKey: ['room'] });
      await queryClient.setQueryData(['room'], (old) => {
        console.log('old=>', old);
        return { ...old, users: old.users.map((user) => (user.id === result.id ? result : user)) };
        // return result;
      });
    }
  });

  return mutate;
};
