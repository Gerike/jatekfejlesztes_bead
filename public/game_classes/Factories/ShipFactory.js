class ShipFactory {
  static createShip(x, y, shipPattern, weaponPatterns, ammoPatterns) {
    let ship = new shipPattern.type();

    ship.weapons = [];
    ship.x = x;
    ship.y = y;

    for (const key in shipPattern) {
      if ((key !== 'type') && (key !== 'img'))
        ship[key] = shipPattern[key];
      else if (key === 'img')
        ship[key] = framework.getResources()[shipPattern[key]];
    }

    if (weaponPatterns)
      for (let i = 0; i < weaponPatterns.length; i++)
        ship.addWeapon(WeaponFactory.createWeapon(weaponPatterns[i], ammoPatterns[i]));
    return ship;
  }
}

