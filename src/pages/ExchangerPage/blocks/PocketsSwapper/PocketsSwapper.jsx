import React from 'react';
import PropTypes from 'prop-types';
import SwapIcon from '@material-ui/icons/Cached';

const PocketsSwapper = ({ onSwap: handleSwap }) => {
  return <SwapIcon color="action" onClick={handleSwap} />;
};

PocketsSwapper.propTypes = {
  onSwap: PropTypes.func.isRequired,
};

export default PocketsSwapper;
