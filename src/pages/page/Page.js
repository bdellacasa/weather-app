import React from 'react';
import Header from '../../components/header/Header';
import Loading from '../../components/loading/Loading';
import './page.scss';

const Page = (props) => {
    const opacity = props.loading ? 0 : 1;
    return (
      <div className="page">
        {props.loading && <Loading/>} 
        <div style={{ opacity: opacity }}>
          <Header/>
          <div className={"page-content"}>
            {props.content}
          </div>
        </div>
      </div>
    );
}

export default Page;