import React from 'react';

export const handleResponse = (response) => {
  return response.json().then(json => {
    return response.ok ? json : Promise.reject(json);
  });
}

export const renderChangePercent = (percent) => {
  if (percent > 0) {
    return <span className='percent-raised'>{percent}% &uarr;</span>
  } else if (percent < 0) {
    return <span className='percent-fallen'>{percent}% &darr;</span>
  } else {
    return <span>{percent}%</span>
  }
}
