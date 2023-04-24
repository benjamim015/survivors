import { survivorsUrl } from '@/constants/urls';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http } from '../http';

type Params = {
  id: string;
  isSurvivorInfected: boolean;
};

export const useSurvivorIsInfectedMutation = ({
  id,
  isSurvivorInfected,
}: Params) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await http.patch(`${survivorsUrl}/${id}`, {
        isInfected: isSurvivorInfected,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'survivors',
      });
    },
  });
};
