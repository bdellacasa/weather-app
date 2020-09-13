import React from 'react';
import { Spinner } from 'reactstrap';
import './loading.scss';

const Loading = () => {
  return (
    <div className={"loading"}>
      <Spinner type="grow" color="primary" style={{ width: '50px', height: '50px' }} />
      <Spinner type="grow" color="primary" style={{ width: '50px', height: '50px' }} />
      <Spinner type="grow" color="primary" style={{ width: '50px', height: '50px' }} />
    </div>
  )
}

export default Loading;