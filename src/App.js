import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import 'melonjs';
import Game from 'components/Game';

const Wrapper = styled.div``;

const App = props => {
  return (
    <Game />
  )
};

App.propTypes = {
};

export default App;