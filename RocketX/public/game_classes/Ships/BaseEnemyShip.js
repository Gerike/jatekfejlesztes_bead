/**
 * Created by Geri on 2016. 11. 15..
 */
class BaseEnemyShip extends SpaceShip {
  constructor(x, y, img, weapons, extras, speed, path=null) {
    super(x, y, img);
    this.weapons = weapons;
    this.extras = extras;
    if (path) this.path = path.getWaypoints()
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y);
  }

  frame(){
    if (this.path !== null)
    {
      let next_waypoint = this.path.next();
      if (!next_waypoint.done) {
        this.x = next_waypoint.value.x;
        this.y = next_waypoint.value.y;
      }
      else
        this.path = null;
    }
  }

  shoot(){}

  collided (object){
    framework.requestDestroy(this);
  }
}
