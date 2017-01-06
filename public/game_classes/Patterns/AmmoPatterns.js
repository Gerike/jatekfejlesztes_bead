patterns.ammos = {};

patterns.ammos.types = {
  BASE: BaseAmmo,
  FREEZING: FreezingAmmo,
  LASER: LaserAmmo,
};

patterns.ammos = {
  BASE_AMMO: {
    type: patterns.ammos.types.BASE,
    damage: 10,
    img: 'laser_2',
    firerate: 5,
    speed: 6,
  },

  FREEZING_AMMO: {
    type: patterns.ammos.types.FREEZING,
    damage: 5,
    img: 'laser_3',
    firerate: 5,
    speed: 6,
  },

  BASE_LASER_AMMO: {
    type: patterns.ammos.types.LASER,
    damage: 1,
    img: 'laser_4',
    uptime: 60
  },
};