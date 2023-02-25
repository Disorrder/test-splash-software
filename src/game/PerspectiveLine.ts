import { Container, Point } from "pixi.js";

import { Game, HORIZON_Y } from "./Game";

export class PerspectiveLine {
  /** Perspective center is always above horizon */
  static game: Game;
  static center = new Point();
  static horizonY = 0;

  static init(game: Game) {
    this.game = game;
    this.center = game.fromNdc(-0.085, 0.152);
    this.horizonY = game.fromNdc(0, HORIZON_Y).y;
  }

  /** Time to reach horizon, where 1 is time to reach end */
  horizonTime = 0;
  vector: Point;

  constructor(public end: Point) {
    const { center, horizonY } = this.constructor as typeof PerspectiveLine;
    this.vector = end.clone().subtract(center);
    this.horizonTime = (horizonY - center.y) / this.vector.y;
  }

  /**
   * Get point on this line at time t.
   * @param t Time from 0 to 1, where 0 is perspective center and 1 is end.
   * @returns Point on this line at time t.
   */
  getPointAt(t: number): Point {
    const p = this.vector.multiplyScalar(t);
    return p.add(PerspectiveLine.center, p);
  }

  /**
   * Set transforms of pixi object somewhere on this line.
   * @param _t Time from 0 to 1, where 0 is point on and 1 is end.
   * @param sprite Sprite to set transform on.
   */
  setTransformAt(_t: number, sprite: Container) {
    _t = _t * _t; //* _t; // ease in
    // transform time: when _t = 0 make t = horizonTime, when _t = 1 make t = 1
    const t = _t * (1 - this.horizonTime) + this.horizonTime;
    // Test cases when horizonTime = 0.5
    // _t = 0; t = 0.5 // 0 * (1 - 0.5) + 0.5
    // _t = 0.1; t = 0.55 // 0.1 * (1 - 0.5) + 0.5
    // _t = 0.5; t = 0.75 // 0.5 * (1 - 0.5) + 0.5
    // _t = 1; t = 1 // 1 * (1 - 0.5) + 0.5

    const point = this.getPointAt(t);
    sprite.position.copyFrom(point);

    sprite.scale.set(t);
    sprite.alpha = _t * 10;
  }
}
