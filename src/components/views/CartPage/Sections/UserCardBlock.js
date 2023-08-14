import React from 'react';
import { Card } from 'antd';

function ProductCard(props) {
    const { title, price, images } = props.product;

    return (
        <Card
            cover={<img alt="product" src={images[0]} style={{ height: '150px', objectFit: 'cover' }} />}
        >
            <Card.Meta
                title={title}
                description={`$${price}`}
            />
        </Card>
    );
}

export default ProductCard;
