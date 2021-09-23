import React from 'react';
import ErorrBackground from '../../assets/img/404.png';

const Error = () => {
    return <div className="error"
        style={{ background: `url(${ErorrBackground}) center center/cover no-repeat` }} ></div>
}

export default Error;