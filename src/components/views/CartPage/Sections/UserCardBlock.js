import React from 'react';
import { Card } from 'antd';
import './UserCardBlock.css';

function ProductCard(props) {
    const { title, price, imageUrl } = props.product; // 예시로 name을 사용, 실제 API 응답에 맞게 수정해야 함

    return (
        <Card
            cover={<img alt="product" src={imageUrl} style={{ height: '150px', objectFit: 'cover' }} />} // 이미지 URL 직접 사용
        >
            <Card.Meta
                title={title} // API 응답에 맞게 수정
                description={`${price}` + '원'} // API 응답에 맞게 수정
            />
        </Card>
    );
}

export default ProductCard;
