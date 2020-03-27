export default window.me.Entity.extend({
  init: function(x, y, settings) {
      
      // call the constructor
      this._super(window.me.Entity, "init", [x, y , settings]);

      // walking & jumping speed
      this.body.setVelocity(2.5, 2.5);
      this.body.setFriction(0.4,0.4);

      // set the display around our position
      window.me.game.viewport.follow(this, window.me.game.viewport.AXIS.BOTH);

      // enable keyboard
      window.me.input.bindKey(window.me.input.KEY.LEFT,  "left");
      window.me.input.bindKey(window.me.input.KEY.RIGHT, "right");
      window.me.input.bindKey(window.me.input.KEY.UP,    "up");
      window.me.input.bindKey(window.me.input.KEY.DOWN,  "down");

      // the main player spritesheet
      var texture =  new window.me.video.renderer.Texture(
          { framewidth: 32, frameheight: 32 },
          window.me.loader.getImage("alien")
      );

      // create a new sprite object
      this.renderable = texture.createAnimationFromName([0, 1, 2, 3, 4, 5, 6, 7, 8]);
      // define an additional basic walking animation
      this.renderable.addAnimation ("simple_walk", [0,1,2]);

      // set the renderable position to bottom center
      this.anchorPoint.set(0.5, 0.5);
  },

  /* -----
      update the player pos
  ------            */
  update : function (dt) {

      if (window.me.input.isKeyPressed("left")) {
          // update the entity velocity
          this.body.vel.x -= this.body.accel.x * window.me.timer.tick;
      } else if (window.me.input.isKeyPressed("right")) {
          // update the entity velocity
          this.body.vel.x += this.body.accel.x * window.me.timer.tick;
      } else {
          this.body.vel.x = 0;
      }
      if (window.me.input.isKeyPressed("up")) {
          // update the entity velocity
          this.body.vel.y -= this.body.accel.y * window.me.timer.tick;
      } else if (window.me.input.isKeyPressed("down")) {
          // update the entity velocity
          this.body.vel.y += this.body.accel.y * window.me.timer.tick;
      } else {
          this.body.vel.y = 0;
      }

      // apply physics to the body (this moves the entity)
      this.body.update(dt);

      // handle collisions against other shapes
      window.me.collision.check(this);

      // check if we moved (an "idle" animation would definitely be cleaner)
      if (this.body.vel.x !== 0 || this.body.vel.y !== 0) {
          this._super(window.me.Entity, "update", [dt]);
          return true;
      }
  },

  /**
   * colision handler
   * (called when colliding with other objects)
   */
  onCollision : function (response, other) {
      console.log('collision!', response, other);
      // Make all other objects solid
      return true;
  }
});