import { Assets, Container, Point, Resource, Sprite, Texture } from "pixi.js";
import { clamp, getRandomInt } from "~/utils";
import { Line } from "./debug";

import { DEPTH, Game } from "./Game";
import { PerspectiveLine } from "./PerspectiveLine";
import { SpriteObject } from "./SpriteObject";

interface IEnemy {
  object: SpriteObject;
  rail: number;
}

export class Cars {
  container = new Container();

  rails: PerspectiveLine[] = [];

  enemyPrefabs: SpriteObject[] = [];
  playerSprites: SpriteObject[] = [];

  enemies: IEnemy[] = [];

  constructor(private game: Game) {
    this.rails[0] = new PerspectiveLine(game.fromNdc(-0.5, 1));
    this.rails[1] = new PerspectiveLine(game.fromNdc(0, 1));
    this.rails[2] = new PerspectiveLine(game.fromNdc(0.5, 1));

    // debug
    this.container.addChild(
      new Line(PerspectiveLine.center, this.rails[0].end)
    );
    this.container.addChild(
      new Line(PerspectiveLine.center, this.rails[1].end)
    );
    this.container.addChild(
      new Line(PerspectiveLine.center, this.rails[2].end)
    );

    let tex: Texture<Resource>;
    let sprite: Sprite;
    let object: SpriteObject;

    tex = Assets.get<Texture>("/assets/game/cars/enemy_left.png");
    sprite = new Sprite(tex);
    sprite.scale.set(0.4);
    sprite.anchor.set(0.5, 0.9);
    object = new SpriteObject(sprite);
    this.enemyPrefabs.push(object);

    tex = Assets.get<Texture>("/assets/game/cars/enemy_center.png");
    sprite = new Sprite(tex);
    sprite.scale.set(0.4);
    sprite.anchor.set(0.5, 0.9);
    object = new SpriteObject(sprite);
    this.enemyPrefabs.push(object);

    tex = Assets.get<Texture>("/assets/game/cars/enemy_right.png");
    sprite = new Sprite(tex);
    sprite.scale.set(0.4);
    sprite.anchor.set(0.5, 0.9);
    object = new SpriteObject(sprite);
    this.enemyPrefabs.push(object);

    game.app.stage.addChild(this.container);
    game.app.ticker.add((dt) => this.update(dt));
  }

  spawn(railI: number): IEnemy {
    const prefab = this.enemyPrefabs[railI]!;
    const object = prefab.clone();
    object.z = DEPTH;
    this.container.addChild(object);

    const enemy = { object, rail: railI };
    this.enemies.push(enemy);
    return enemy;
  }

  movePlayer(rail: number) {
    rail = clamp(rail, 0, this.rails.length - 1);
  }

  update(dt: number) {
    const last = this.enemies[this.enemies.length - 1];
    if (!last || last.object.z < (DEPTH * 2) / 3) {
      const n = getRandomInt(0, this.rails.length - 1);
      this.spawn(n);
    }

    const dz = (this.game.speed * dt) / 1000;

    this.enemies.forEach((enemy) => {
      const { object } = enemy;
      object.z -= dz;
      const rail = this.rails[enemy.rail]!;
      rail.setTransformAt((DEPTH - object.z) / DEPTH, object);
    });
  }
}
