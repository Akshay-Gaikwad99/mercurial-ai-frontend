import React, { useEffect } from 'react';
import NewsTopBar from '../../../components/News Components/NewsTopBar';
import NewsBody from '../../../components/News Components/NewsBody';
import mixpanel from 'mixpanel-browser';

function NewsScreen() {
  useEffect(() => {
    mixpanel.track('News Screen');
  },[])

  return (
    <>
      <NewsTopBar/>
      <NewsBody/>
    </>
  );
}

export default NewsScreen;
