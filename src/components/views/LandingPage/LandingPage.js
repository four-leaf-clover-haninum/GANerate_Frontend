import React, { useEffect } from 'react';
import axios from 'axios';

function LandingPage() {
    useEffect(() => {
        axios.get('/')
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            LandingPage 랜딩페이지
        </div>
    );
}

export default LandingPage;
