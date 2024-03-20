import React, { useState } from 'react';
import { Upload } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';

const ImageUploader1 = ({ onImageUpload }) => {
    const [file, setFile] = useState(null);

    const handleChange = ({ file: newFile }) => {
        setFile(newFile);
        console.log("File object in handleChange:", newFile);
    };

    const customRequest = ({ onSuccess, file }) => {
        setFile(file);
        onImageUpload(file); // Only pass the single image file to the callback
        onSuccess();
    };

    const handleRemove = () => {
        setFile(null);
        onImageUpload(null); // Pass null when removing the image
    };

    const uploadButton = (
        <div>
            <CloudUploadOutlined className='cloud-icon' />
            <div style={{ marginTop: 8 }}>Upload Cover</div>
        </div>
    );

    return (
        <Upload
            listType="picture-card"
            fileList={file ? [file] : []} // Use an array with a single image file or an empty array
            onChange={handleChange}
            onRemove={handleRemove}
            customRequest={customRequest}
            showUploadList={{
                showPreviewIcon: false,
            }}
        >
            {file ? null : uploadButton}
        </Upload>
    );
};

export default ImageUploader1;
