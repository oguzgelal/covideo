export default window.me.Stage.extend({
  /**
   *  action to perform on state change
   */
  onResetEvent: function() {
    // disable gravity
    window.me.sys.gravity = 0;

    // load a level
    window.me.levelDirector.loadLevel('orange');

    // display a basic tile selector
    window.me.game.world.addChild(
      new (window.me.Renderable.extend({
        /** Constructor */
        init: function() {
          
          // reference to the main layer
          this.refLayer = window.me.game.world.getChildByName('Floor')[0];

          // call the parent constructor using the tile size
          this._super(window.me.Renderable, "init", [
            0,
            0,
            this.refLayer.tilewidth / 2,
            this.refLayer.tileheight
          ]);

          this.anchorPoint.set(0, 0);

          // configure it as floating
          this.floating = true;

          // create a corresponding diamond polygon shape with an isometric projection
          this.diamondShape = this.clone()
            .toPolygon()
            .toIso();

          // currently selected tile
          this.currentTile = null;

          // simple font to display tile coordinates
          this.font = new window.me.Font("Arial", 10, "#FFFFFF");
          this.font.textAlign = "center";

          // dirty flag to enable/disable redraw
          this.dirty = false;

          this.isKinematic = false;

          // subscribe to pointer and viewport move event
          this.pointerEvent = window.me.event.subscribe(
            "pointermove",
            this.pointerMove.bind(this)
          );
          this.viewportEvent = window.me.event.subscribe(
            window.me.event.VIEWPORT_ONCHANGE,
            this.viewportMove.bind(this)
          );
        },
        
        /** pointer move event callback */
        pointerMove: function(event) {
          var tile = this.refLayer.getTile(event.gameWorldX, event.gameWorldY);
          if (tile && tile !== this.currentTile) {
            // get the tile x/y world isometric coordinates
            this.refLayer
              .getRenderer()
              .tileToPixelCoords(tile.col, tile.row, this.diamondShape.pos);
            // convert thhe diamon shape pos to floating coordinates
            window.me.game.viewport.worldToLocal(
              this.diamondShape.pos.x,
              this.diamondShape.pos.y,
              this.diamondShape.pos
            );
            // store the current tile
            this.currentTile = tile;
          }
        },
        
        /** viewport move event callback */
        viewportMove: function(pos) {
          // invalidate the current tile when the viewport is moved
          this.currentTile = null;
        },
        
        /** Update function */
        update: function(dt) {
          return typeof this.currentTile === "object";
        },
        
        /** draw function */
        draw: function(renderer) {
          if (this.currentTile) {
            // draw our diamond shape
            renderer.save();
            renderer.setColor("#FF0000");
            renderer.stroke(this.diamondShape);

            renderer.setColor("#FFFFFF");
            // draw the tile col/row in the middle
            this.font.draw(
              renderer,
              "( " + this.currentTile.col + "/" + this.currentTile.row + " )",
              this.diamondShape.pos.x,
              this.diamondShape.pos.y + this.currentTile.height / 2 - 8
            );
            renderer.restore();
          }
        }
      }))()
    );

    // register on mouse event
    window.me.input.registerPointerEvent(
      "pointermove",
      window.me.game.viewport,
      function(event) {
        window.me.event.publish("pointermove", [event]);
      },
      false
    );
  },

  /**
   *  action to perform on state change
   */
  onDestroyEvent: function() {
    // unsubscribe to all events
    window.me.event.unsubscribe(this.pointerEvent);
    window.me.event.unsubscribe(this.viewportEvent);
    window.me.input.releasePointerEvent("pointermove", window.me.game.viewport);
  }
});
