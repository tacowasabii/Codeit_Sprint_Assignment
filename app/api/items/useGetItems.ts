import instance from '@api/_axios/instance';
import { useQuery } from '@tanstack/react-query';

// 할 일 목록 조회 함수
const getItems = async () => {
  const { data } = await instance({
    method: 'GET',
    url: 'items',
  });
  return data;
};

// useGetItems 훅
export const useGetItems = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['Items'],
    queryFn: getItems,
  });

  return { data, isLoading, refetch };
};
