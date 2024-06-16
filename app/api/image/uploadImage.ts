import instance from '@api/_axios/instance';

const uploadImage = async (image: File) => {
  const formData = new FormData();
  formData.append('image', image);

  const { data } = await instance.post('/images/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

export default uploadImage;
