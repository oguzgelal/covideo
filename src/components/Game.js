import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

// resources
import Alien from 'assets/alien.png';
import OrangeMap from 'assets/maps/orange/orange.tmx';
import * as OrangeAssets from 'assets/maps/orange/assets';

// entities
import Screen from 'components/Screen';
import You from 'components/You';

const CONTAINER_ID = 'screen';
const RESOURCES = [
  { name: 'alien', type: 'image', src: Alien },
].concat(Object.keys(OrangeAssets).map(k => (
  { name: k, type: 'image', src: OrangeAssets[k] }
))).concat(
  { name: 'orange', type: 'tmx', src: OrangeMap },
);

const Wrapper = styled.div.attrs({ id: CONTAINER_ID })``;

const Game = props => {

  // run serially after dom mutations
  useLayoutEffect(() => {
    
    // initialize game engine
    window.me.device.onReady(() => {

      // initialize the video
      const videoStarted = window.me.video.init(800, 600, {
        wrapper : CONTAINER_ID,
        scale : 'auto',
      });

      // lack of HTML5 support
      if (!videoStarted) {
        alert("Your browser does not support HTML5 canvas.");
      }

      // set all ressources to be loaded
      window.me.loader.preload(RESOURCES, () => {
        // set play screen object
        window.me.state.set(window.me.state.PLAY, new Screen());
        // set the fade transition effect
        window.me.state.transition("fade","#FFFFFF", 250);
        // register our objects entity in the object pool
        window.me.pool.register("mainPlayer", You);
        // switch to play state
        window.me.state.change(window.me.state.PLAY);
      });
    })

  }, [])

  return (
    <Wrapper />
  );
};

Game.propTypes = {
};

export default Game;