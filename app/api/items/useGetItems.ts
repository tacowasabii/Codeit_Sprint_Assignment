import instance from '@api/_axios/instance';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const getItems = async () => {
  const { data } = await instance({
    method: 'GET',
    url: 'items',
  });
  return data;
};

export const useGetItems = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['Items'],
    queryFn: getItems,
  });

  return { data, isLoading, refetch };
};
