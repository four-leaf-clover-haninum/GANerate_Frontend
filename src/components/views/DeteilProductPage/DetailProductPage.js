import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductImage from './Sections/Productimage';
import ProductInfo from './Sections/Productinfo';
import { Row, Col } from 'antd';

function DetailProductPage() {
    const { dataProductId } = useParams(); // useParams를 이용해 dataProductId 가져오기

    const [Product, setProduct] = useState({});

    useEffect(() => {
        axios.get(`/v1/data-products/${dataProductId}`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(err => alert(err));
    }, [dataProductId]); // dataProductId가 변경될 때마다 재요청

    return (
        <div style={{ width: '100%', padding: '3rem 4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{Product.title}</h1>
            </div>
            <br />
            <Row gutter={[16, 16]}>
                <Col lg={12} sm={24}>
                    <ProductImage detail={Product} />
                </Col>
                <Col lg={12} sm={24}>
                    <ProductInfo detail={Product} />
                </Col>
            </Row>
        </div>
    );
}

export default DetailProductPage;
