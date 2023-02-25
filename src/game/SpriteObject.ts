import { Container, Sprite } from "pixi.js";
import { DEPTH } from "./Game";

export class SpriteObject extends Container {
  #z = 0;

  get z() {
    return this.#z;
  }

  set z(value: number) {
    this.#z = value;
    // this.scale.set((DEPTH - value) / DEPTH);
  }

  constructor(public readonly sprite: Sprite) {
    super();
    this.addChild(sprite);
  }

  clone(): SpriteObject {
    const sprite = new Sprite(this.sprite.texture);
    sprite.anchor.copyFrom(this.sprite.anchor);
    sprite.position.copyFrom(this.sprite.position);
    sprite.scale.copyFrom(this.sprite.scale);

    const C = this.constructor as typeof SpriteObject;
    return new C(sprite);
  }
}
