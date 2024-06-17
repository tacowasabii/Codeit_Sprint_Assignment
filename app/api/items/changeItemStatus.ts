import instance from '@api/_axios/instance';

// 할 일 상태 변경 함수
const changeItemStatus = async (
  itemId: number,
  // 메인 페이지에서 isCompleted만 변경하는 기능을 위해 나머지 필드는 optional로 설정
  item: {
    name?: string;
    memo?: string;
    imageUrl?: string;
    isCompleted: boolean;
  },
) => {
  const { data } = await instance({
    method: 'PATCH',
    url: `/items/${itemId}`,
    data: item,
  });
  return data;
};

export default changeItemStatus;
