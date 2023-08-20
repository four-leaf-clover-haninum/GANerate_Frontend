import React from 'react';
import { Card } from 'antd';

function ProductCard(props) {
    const { title, price, imageUrl } = props.product; // 예시로 name을 사용, 실제 API 응답에 맞게 수정해야 함

    return (
        <Card
            cover={<img alt="product" src={imageUrl[0].url} style={{ height: '150px', objectFit: 'cover' }} />} // images 배열에서 이미지의 URL을 가져옴
        >
            <Card.Meta
                title={title} // API 응답에 맞게 수정
                description={`$${price}`} // API 응답에 맞게 수정
            />
        </Card>
    );
}

export default ProductCard;
