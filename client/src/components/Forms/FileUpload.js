import React from 'react';
import Resizer from 'react-image-file-resizer';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Avatar from 'antd/lib/avatar/avatar';
import { Badge } from 'antd';
import { toast } from 'react-toastify';

export const FileUpload = ({ values, setValues, setLoading }) => {
  const authUser = useSelector(state => state.auth);

  const onChangeHandlerForFiles = e => {
    const files = e.target.files;
    setLoading(true);
    const uploadedFiles = values.images;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          'JPEG',
          100,
          0,
          async uri => {
            try {
              const res = await axios.post(
                '/api/images/upload-images',
                { image: uri },
                { headers: { authtoken: authUser.token || '' } }
              );
              console.log(res.data);
              setLoading(false);
              uploadedFiles.push(res.data);
              setValues(prevState => ({ ...prevState, images: uploadedFiles }));
            } catch (err) {
              setLoading(false);
              toast.error(`${err.response.data.error}`);
            }
          },
          'base64'
        );
      }
    }
  };

  const onClickHandler = async id => {
    console.log(id);
    try {
      setLoading(true);
      await axios.post(
        '/api/images/remove-images',
        { public_image_id: id },
        { headers: { authtoken: authUser.token } }
      );

      setLoading(false);
      const filteredImages = values.images.filter(
        item => item.public_image_id !== id
      );
      setValues(prevState => ({ ...prevState, images: filteredImages }));
    } catch (err) {
      setLoading(false);
      console.log(err.message);
    }
  };

  return (
    <>
      <div>
        {values.images.length > 0 &&
          values.images.map(i => (
            <Badge
              key={i.public_image_id}
              count="x"
              style={{ cursor: 'pointer' }}
              onClick={() => onClickHandler(i.public_image_id)}
            >
              <Avatar src={i.url} size={100} className="m-3" />
            </Badge>
          ))}
      </div>
      <div className="row p-3">
        <label htmlFor="file" className="btn btn-primary btn-raised">
          Choose Images
          <input
            onChange={onChangeHandlerForFiles}
            type="file"
            id="file"
            multiple
            accept="images/*"
            hidden
          />
        </label>
      </div>
    </>
  );
};
