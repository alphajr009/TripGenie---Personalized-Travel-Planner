import React, { useState } from 'react';
import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const ImageUploader = ({ index, onImageUpload }) => {
    const [fileList, setFileList] = useState([]);

    const handleChange = ({ file, fileList: newFileList }) => {
        setFileList(newFileList);
        console.log("File object in handleChange:", file);
    };

    const customRequest = ({ onSuccess, file }) => {
        setFileList([...fileList, file]);
        onImageUpload(index, file);
        onSuccess();
    };

    const handleRemove = (file) => {
        setFileList(fileList.filter((item) => item.uid !== file.uid));
        onImageUpload(index, '');
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleChange}
            onRemove={handleRemove}
            customRequest={customRequest}
            showUploadList={{
                showPreviewIcon: false,
            }}
        >
            {fileList.length >= 1 ? null : uploadButton}
        </Upload>
    );
};

export default ImageUploader;
