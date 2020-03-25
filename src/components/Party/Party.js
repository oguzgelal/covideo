import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Layer, Star, Text } from 'react-konva';

const Party = props => {

  const [pressedKeys, setPressedKeys] = useState({});
  const { width, height } = props;

  const setKey = (event, status) => {
    let key;
    switch(event.keyCode) {
      case 38: key = 'UP'; break; // UP
      case 40: key = 'DOWN'; break; // DOWN
      case 37: key = 'LEFT'; break; // LEFT
      case 39: key = 'RIGHT'; break; // RIGHT
      case 87: key = 'UP'; break; // W
      case 83: key = 'DOWN'; break; // S
      case 65: key = 'LEFT'; break; // A
      case 68: key = 'RIGHT'; break; // D
      default: break;
    }
    if (key) {
      setPressedKeys({
        ...pressedKeys,
        [key]: status
      })
    }
  }

  const keyPressed = event => setKey(event, true);
  const keyReleased = event => setKey(event, false);

  // handle event listeners
  useEffect(() => {
    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', keyReleased);
    return () => {
      document.removeEventListener('keydown', keyPressed);
      document.removeEventListener('keyup', keyReleased);
    }
  })

  return (
    <Layer>
      {pressedKeys.UP && <Text text="UP" />}
      {pressedKeys.DOWN && <Text text="DOWN" />}
      {pressedKeys.LEFT && <Text text="LEFT" />}
      {pressedKeys.RIGHT && <Text text="RIGHT" />}
      <Star
        numPoints={5}
        innerRadius={20}
        outerRadius={40}
        fill="#89b717"
        opacity={0.8}
        x={Math.random() * width}
        y={Math.random() * height}
        rotation={Math.random() * 180}
        shadowColor="black"
        shadowBlur={10}
        shadowOpacity={0.6}
      />
    </Layer>
  )
};

Party.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

export default Party;