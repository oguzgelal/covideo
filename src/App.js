import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import Session from 'components/Session/Session';

const Wrapper = styled.div``;

const App = props => (
  <Wrapper>
    <Session />
  </Wrapper>
);

App.propTypes = {
};

export default App;