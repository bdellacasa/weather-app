import React from 'react';
import Header from '../../components/header/Header';
import Loading from '../../components/loading/Loading';
import './page.scss';

const Page = ({ content, loading }) => {
  const opacity = loading ? 0 : 1;
  return (
    <div className="page">
      {loading && <Loading />}
      <div style={{ opacity: opacity }}>
        <Header />
        <div className={"page-content"}>
          {content}
        </div>
      </div>
    </div>
  );
}

export default Page;