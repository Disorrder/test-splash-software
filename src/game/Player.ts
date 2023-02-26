import { Container, Point, Sprite, Texture } from "pixi.js";
import { Group, Tween } from "tweedle.js";
import { clamp } from "~/utils";

import { Game } from "./Game";
import { TweenState } from "./TweenState";

export class Player extends Container {
  textures: Texture[] = [];
  rail = 0;
  rails: Point[] = [];

  sprite = new Sprite();

  moveTime = 200; // how long to make 1 turn
  animations = new TweenState();

  constructor(protected game: Game) {
    super();
    this.initRails();
    this.initTextures();
    this.initSprite();

    this.reset();

    game.app.stage.addChild(this);
    game.app.ticker.add((dt) => this.update(dt));
  }

  initRails() {
    this.rails[0] = this.game.fromNdc(-0.5, 1);
    this.rails[1] = this.game.fromNdc(0, 1);
    this.rails[2] = this.game.fromNdc(0.5, 1);
  }

  initTextures() {
    this.textures[0] = Texture.from("/assets/game/cars/car_right.png");
    this.textures[1] = Texture.from("/assets/game/cars/car_center.png");
    this.textures[2] = Texture.from("/assets/game/cars/car_left.png");
  }

  initSprite() {
    this.sprite.anchor.set(0.5, 1.1);
    this.sprite.scale.set(0.3, 0.25);
    this.addChild(this.sprite);
  }

  reset() {
    this.alpha = 1;
    this.moveTo(1);
  }

  protected moveTo(rail: number) {
    rail = clamp(rail, 0, this.rails.length - 1);
    if (rail === this.rail) return;

    const tween = new Tween(this)
      .to(this.rails[rail], this.moveTime)
      .easing((t) => {
        if (t > 0.5) {
          this.rail = rail;
        }
        return t;
      });

    this.animations.play(tween);
  }

  moveLeft() {
    this.moveTo(this.rail - 1);
  }

  moveRight() {
    this.moveTo(this.rail + 1);
  }

  explode() {
    this.animations.stop();
    const anim = new Tween(this).to({ alpha: 0 }, 200);
    this.animations.play(anim);
  }

  updateAnimation() {
    const time = this.game.app.ticker.lastTime;

    const period = ((time % 500) / 500) * Math.PI;
    const scale = Math.sin(period) * 0.1 + 1;
    this.scale.set(1, scale);
  }

  updateTexture() {
    this.sprite.texture = this.textures[this.rail]!;
  }

  updateCollision() {
    const { enemiesSystem } = this.game;

    enemiesSystem.objects.forEach((enemy) => {
      const rail = enemiesSystem.objectRailMap.get(enemy);
      if (enemy.z < 50 && rail === this.rail) {
        enemy.destroy();
        this.game.gameOver();
      }
    });
  }

  update(dt: number) {
    this.updateAnimation();
    this.updateTexture();
    this.updateCollision();
  }
}
