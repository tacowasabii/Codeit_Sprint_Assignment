import instance from '@api/_axios/instance';
import { useQuery } from '@tanstack/react-query';

const getItemDetail = async (id: number) => {
  const { data } = await instance({
    method: 'GET',
    url: `items/${id}`,
  });
  return data;
};

export const useGetItemDetail = (id: number) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['ItemDetail', id],
    queryFn: () => getItemDetail(id),
  });

  return { data, isLoading, refetch };
};
