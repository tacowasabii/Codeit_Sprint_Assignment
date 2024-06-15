import instance from '@api/_axios/instance';

const addItem = async (item: { name: string }) => {
  const { data } = await instance.post('/items', item);
  return data;
};

export default addItem;
