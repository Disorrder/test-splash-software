import { Container, Texture, Resource, Sprite, Assets, Point } from "pixi.js";

import { DEPTH, Game, HORIZON_Y } from "./Game";
import { PerspectiveLine } from "./PerspectiveLine";
import { Line } from "./debug";
import { getRandomElement } from "~/utils";
import { SpriteObject } from "./SpriteObject";

export class StaticBackground {
  container = new Container();

  constructor(private game: Game) {
    const res = game.getResolution();

    let tex: Texture<Resource>;
    let sprite: Sprite;

    tex = Assets.get<Texture>("/assets/game/sky.png");
    sprite = new Sprite(tex);
    sprite.anchor.set(0.5, 0);
    sprite.position.copyFrom(game.fromNdc(0, -1.1));
    sprite.width = res.x;
    sprite.height = sprite.width / 1.5;
    this.container.addChild(sprite);

    tex = Assets.get<Texture>("/assets/game/mountain_fade.png");
    sprite = new Sprite(tex);
    sprite.anchor.set(0.5, 0.5);
    sprite.position.copyFrom(game.fromNdc(0, HORIZON_Y - 0.1));
    sprite.width = res.x;
    sprite.height = sprite.width / 10;
    this.container.addChild(sprite);

    tex = Assets.get<Texture>("/assets/game/road.png");
    sprite = new Sprite(tex);
    sprite.anchor.set(0.5, 0);
    sprite.width = res.x * 1.7;
    sprite.height = res.y / 2;
    sprite.position.copyFrom(game.fromNdc(0, HORIZON_Y));
    this.container.addChild(sprite);

    // debug perspective
    // const c0 = PerspectiveLine.center;
    // const l = new Line(c0, game.fromNdc(-1.1, 1));
    // const r = new Line(c0, game.fromNdc(1.02, 1));
    // const c = new Line(c0, game.fromNdc(-0.025, 1));
    // this.container.addChild(l, r, c);

    game.app.stage.addChild(this.container);
  }
}

export class LeftBackground {
  end: Point;
  rail: PerspectiveLine;

  container = new Container();
  prefabs: SpriteObject[] = [];
  objects: SpriteObject[] = [];

  constructor(private game: Game) {
    this.end = game.fromNdc(-1.1, 1);
    this.rail = new PerspectiveLine(this.end);

    // debug
    this.container.addChild(new Line(PerspectiveLine.center, this.end));

    let tex: Texture<Resource>;
    let sprite: Sprite;
    let object: SpriteObject;

    tex = Assets.get<Texture>("/assets/game/mountain_left.png");
    sprite = new Sprite(tex);
    sprite.scale.set(0.4);
    sprite.anchor.set(1.3, 0.9);
    object = new SpriteObject(sprite);
    this.prefabs.push(object);

    tex = Assets.get<Texture>("/assets/game/sideroad_left.png");
    sprite = new Sprite(tex);
    sprite.scale.set(0.4);
    sprite.anchor.set(1.5, 0.3);
    object = new SpriteObject(sprite);
    this.prefabs.push(object);

    game.app.stage.addChild(this.container);
    game.app.ticker.add((dt) => this.update(dt));
  }

  update(dt: number) {
    const last = this.objects[this.objects.length - 1];
    if (!last || last.z < (DEPTH * 2) / 3) {
      const prefab = getRandomElement(this.prefabs)!;
      const object = prefab.clone();
      object.z = DEPTH;
      this.objects.push(object);
      this.container.addChild(object);
    }

    const dz = (this.game.speed * dt) / 1000;

    this.objects.forEach((object) => {
      object.z -= dz;
      this.rail.setTransformAt((DEPTH - object.z) / DEPTH, object);

      if (object.z < 0) {
        object.destroy();
      }
    });

    this.objects = this.objects.filter((object) => object.parent);
  }
}

export class RightBackground {
  end: Point;
  rail: PerspectiveLine;

  container = new Container();
  prefabs: SpriteObject[] = [];
  objects: SpriteObject[] = [];

  constructor(private game: Game) {
    this.end = game.fromNdc(1.1, 1);
    this.rail = new PerspectiveLine(this.end);

    // debug
    this.container.addChild(new Line(PerspectiveLine.center, this.end));

    let tex: Texture<Resource>;
    let sprite: Sprite;
    let object: SpriteObject;

    tex = Assets.get<Texture>("/assets/game/mountain_right.png");
    sprite = new Sprite(tex);
    sprite.scale.set(0.4);
    sprite.anchor.set(-0.3, 0.9);
    object = new SpriteObject(sprite);
    this.prefabs.push(object);

    tex = Assets.get<Texture>("/assets/game/sideroad_right.png");
    sprite = new Sprite(tex);
    sprite.scale.set(0.4);
    sprite.anchor.set(-0.5, 0.3);
    object = new SpriteObject(sprite);
    this.prefabs.push(object);

    game.app.stage.addChild(this.container);
    game.app.ticker.add((dt) => this.update(dt));
  }

  update(dt: number) {
    const last = this.objects[this.objects.length - 1];
    if (!last || last.z < (DEPTH * 2) / 3) {
      const prefab = getRandomElement(this.prefabs)!;
      const object = prefab.clone();
      object.z = DEPTH;
      this.objects.push(object);
      this.container.addChild(object);
    }

    const dz = (this.game.speed * dt) / 1000;

    this.objects.forEach((object) => {
      object.z -= dz;
      this.rail.setTransformAt((DEPTH - object.z) / DEPTH, object);

      if (object.z < 0) {
        object.destroy();
      }
    });

    this.objects = this.objects.filter((object) => object.parent);
  }
}
