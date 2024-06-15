import instance from '@api/_axios/instance';

const deleteItem = async (id: number) => {
  const { data } = await instance.delete(`/items/${id}`);
  return data;
};

export default deleteItem;
