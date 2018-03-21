import React from 'react';

/**
 * Fetch response helper
 * 
 * @param {object} response 
 */
export const handleResponse = (response) => {
  return response.json()
    .then(json => {
      if (response.ok) {
        return json
      } else {
        return Promise.reject(json)
      }
    })
}

/**
 * Render change percent
 * 
 * Show green text and up arrow if 24h percentage change has been raised
 * Red text and down arrow if it has fallen
 * Default text color without arrow, if it's zero
 * 
 * @param {number} changePercent
 */
export const renderChangePercent = (changePercent) => {
  if (changePercent > 0) {
    return <span className="percent-raised">{changePercent}% &uarr;</span>
  } else if (changePercent < 0) {
    return <span className="percent-fallen">{changePercent}% &darr;</span>
  } else {
    return <span>{changePercent}</span>
  }
}
