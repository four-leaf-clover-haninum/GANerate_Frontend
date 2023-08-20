import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import Icon from '@ant-design/icons';
import axios from 'axios';

function FileUpload(props) {
    const [Images, setImages] = useState([]);

    const dropHandler = (files) => {
        const formData = new FormData();
        formData.append('zipFile', files[0]);

        const accessToken = localStorage.getItem('accessToken'); // 로그인 후 받은 토큰

        axios.post('http://3.35.255.4/v1/data-products/sale/zip', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${accessToken}` // 토큰을 헤더에 추가
            }
        })

        .then(response => {
            if (response.data.code === 0) { // Assuming 'code' indicates success
                setImages([...Images, response.data.filePath]);
                props.refreshFunction([...Images, response.data.filePath]);

                alert('파일 업로드에 성공했습니다.');
                console.log('파일 업로드에 성공했습니다.');
            } else {
                alert('파일 업로드에 실패했습니다.');
                console.log('파일 업로드에 실패했습니다.');
            }
        })
        .catch(error => {
            console.log('파일 업로드 오류:', error);
        });
    };

    const deleteHandler = (image) => {
        const newImages = Images.filter(img => img !== image);
        setImages(newImages);
        props.refreshFunction(newImages);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Dropzone onDrop={dropHandler} maxSize={10 * 1024 * 1024}>

            
                {({ getRootProps, getInputProps }) => (
                    <div
                        style={{
                            width: 300, height: 240, border: '1px solid lightgray',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                        {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Icon type="plus" style={{ fontSize: '3rem' }} />
                    </div>
                )}
            </Dropzone>

            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>
                {Images.map((image, index) => (
                    <div onClick={() => deleteHandler(image)} key={index}>
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }}
                            src={`http://3.35.255.4/${image}`}
                            alt={`Uploaded ${index}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FileUpload;
