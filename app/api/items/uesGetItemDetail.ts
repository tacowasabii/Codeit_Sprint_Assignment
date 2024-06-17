import instance from '@api/_axios/instance';
import { useQuery } from '@tanstack/react-query';

// 할 일 상세 조회 함수
const getItemDetail = async (id: number) => {
  const { data } = await instance({
    method: 'GET',
    url: `items/${id}`,
  });
  return data;
};

// useGetItemDetail 훅
export const useGetItemDetail = (id: number) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['ItemDetail', id],
    queryFn: () => getItemDetail(id),
  });

  return { data, isLoading, refetch };
};
