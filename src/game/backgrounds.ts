import { Container, Texture, Resource, Sprite, Assets } from "pixi.js";

import { Game, HORIZON_Y } from "./Game";
import { PerspectiveLine } from "./PerspectiveLine";
import { SpriteObject } from "./SpriteObject";
import { RailGenerator } from "./RailGenerator";

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

export class LeftBackground extends RailGenerator {
  initRail(): void {
    this.rail = new PerspectiveLine(this.game.fromNdc(-1.1, 1));
  }

  initPrefabs(): void {
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
  }
}

export class RightBackground extends RailGenerator {
  initRail(): void {
    this.rail = new PerspectiveLine(this.game.fromNdc(1.1, 1));
  }

  initPrefabs(): void {
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
  }
}
