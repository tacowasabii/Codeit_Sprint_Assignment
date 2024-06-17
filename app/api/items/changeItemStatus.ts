import instance from '@api/_axios/instance';

const changeItemStatus = async (
  itemId: number,
  item: {
    name?: string;
    memo?: string;
    imageUrl?: string;
    isCompleted: boolean;
  },
) => {
  const { data } = await instance.patch(`/items/${itemId}`, item);
  return data;
};

export default changeItemStatus;
