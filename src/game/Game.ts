import { Application, Assets, Point, Sprite } from "pixi.js";
import "@pixi/math-extras";

import { PerspectiveLine } from "./PerspectiveLine";
import {
  LeftBackground,
  RightBackground,
  StaticBackground,
} from "./backgrounds";
import { Cars } from "./Cars";

export const DEPTH = 300; // Distance from camera to horizon (units)
export const PERSP_SCALE = 35 / 675; // Perspective scale. 35 is far road width, 675 is close road width
export const HORIZON_Y = 0.2; // Horizon position in NDC

export class Game {
  private static instance: Game;
  static getInstance() {
    if (!Game.instance) {
      Game.instance = new Game();
    }

    return Game.instance;
  }

  #ready = false;

  camera: Point;
  carsSystem!: Cars;

  /** Speed of the car (units per second) */
  speed = 5 * DEPTH;

  private constructor(
    public readonly app = new Application({
      antialias: true,
    })
  ) {
    const dpr = window.devicePixelRatio || 1;
    app.renderer.resize(1600 / dpr, 900 / dpr);

    this.camera = this.fromNdc(0, 1);
  }

  async load() {
    if (this.#ready) return;
    await this.loadAssets();
    PerspectiveLine.init(this);
    new StaticBackground(this);
    new LeftBackground(this);
    new RightBackground(this);
    this.carsSystem = new Cars(this);
    this.#ready = true;
  }

  async loadAssets() {
    const urls = [
      // "/assets/game/explosion_spritesheet.avif",
      "/assets/game/mountain_fade.png",
      "/assets/game/mountain_left.png",
      "/assets/game/mountain_right.png",
      "/assets/game/road.png",
      "/assets/game/sideroad_left.png",
      "/assets/game/sideroad_right.png",
      "/assets/game/sky.png",

      "/assets/game/cars/car_center.png",
      "/assets/game/cars/car_left.png",
      "/assets/game/cars/car_right.png",
      "/assets/game/cars/enemy_center.png",
      "/assets/game/cars/enemy_left.png",
      "/assets/game/cars/enemy_right.png",
    ];

    return Promise.all(urls.map((url) => Assets.load(url)));
  }

  getResolution() {
    return new Point(this.app.renderer.width, this.app.renderer.height);
  }

  /** Convert Normalized Device Coordinates [-1, 1] to canvas pixels position */
  fromNdc(x: number, y: number): Point {
    const { width, height } = this.app.renderer;
    return new Point(((x + 1) * width) / 2, ((y + 1) * height) / 2);
  }
}