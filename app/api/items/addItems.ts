import instance from '@api/_axios/instance';

// 할 일 추가 함수
const addItem = async (item: { name: string }) => {
  const { data } = await instance({
    method: 'POST',
    url: '/items',
    data: item,
  });
  return data;
};

export default addItem;
