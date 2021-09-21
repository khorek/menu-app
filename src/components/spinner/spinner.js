import React from 'react';
import spinner from '../../assets/img/loading.gif'

const Spinner = () => {
    return <img src={spinner} className="spinner" alt='Load...' style={{ width: '450px', borderRadius: '50%' }} />
}

export default Spinner;