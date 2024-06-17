import instance from '@api/_axios/instance';

// 할 일 삭제 함수
const deleteItem = async (id: number) => {
  const { data } = await instance({
    method: 'DELETE',
    url: `/items/${id}`,
  });
  return data;
};

export default deleteItem;
