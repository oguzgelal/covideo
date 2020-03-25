import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Stage } from 'react-konva';
import styled from 'styled-components/macro';
import Party from 'components/Party/Party';

const Canvas = styled(Stage)`
  width: ${p => p.width}px;
  height: ${p => p.height}px;
  border: 1px solid black;
`;

const Session = props => {

  return (
    <Canvas
      width={props.width}
      height={props.height}
    >
      <Party
        width={props.width}
        height={props.height}
      />
    </Canvas>
  )
};

Session.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

Session.defaultProps = {
  width: 800,
  height: 320,
}

export default Session;
