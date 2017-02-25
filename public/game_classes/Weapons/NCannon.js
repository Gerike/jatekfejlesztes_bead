class NCannon extends BaseCannon {
  constructor(ammo, firerate, linkedEntity, projectileCount) {
    super(ammo, firerate, linkedEntity);
    this.projectileCount = projectileCount;
    this._shootingAngle = 30;

  }

  _shoot(direction) {
    let projectileAngleDiff = this._shootingAngle / this.projectileCount;
    let left = this.projectileCount;
    super._shoot(direction);
    left--;
    let tempDirection = direction;
    for (let i = 0; i < (this.projectileCount - 1) / 2; i++) {
      tempDirection += projectileAngleDiff;
      super._shoot(tempDirection);
      left--;
    }

    tempDirection = direction;
    for (let i = 0; i < left; i++) {
      tempDirection -= projectileAngleDiff;
      super._shoot(tempDirection);
    }
  }
}
