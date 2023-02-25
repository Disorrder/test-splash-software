import { Assets, Resource, Sprite, Texture } from "pixi.js";

import { DEPTH } from "./Game";
import { PerspectiveLine } from "./PerspectiveLine";
import { RailGenerator } from "./RailGenerator";
import { SpriteObject } from "./SpriteObject";

export class Enemies extends RailGenerator {
  rails!: PerspectiveLine[];
  objectRailMap: Map<SpriteObject, number> = new Map();

  spawnInterval: [number, number] = [500, 2000];

  initRail(): void {
    this.rails = [];
    this.rails[0] = new PerspectiveLine(this.game.fromNdc(-0.5, 1));
    this.rails[1] = new PerspectiveLine(this.game.fromNdc(0, 1));
    this.rails[2] = new PerspectiveLine(this.game.fromNdc(0.5, 1));

    // // debug
    // this.container.addChild(
    //   new Line(PerspectiveLine.center, this.rails[0].end)
    // );
    // this.container.addChild(
    //   new Line(PerspectiveLine.center, this.rails[1].end)
    // );
    // this.container.addChild(
    //   new Line(PerspectiveLine.center, this.rails[2].end)
    // );
  }

  initPrefabs(): void {
    let tex: Texture<Resource>;
    let sprite: Sprite;
    let object: SpriteObject;

    tex = Assets.get<Texture>("/assets/game/cars/enemy_left.png");
    sprite = new Sprite(tex);
    sprite.scale.set(0.5);
    sprite.anchor.set(0.5, 0.9);
    object = new SpriteObject(sprite);
    this.prefabs.push(object);

    tex = Assets.get<Texture>("/assets/game/cars/enemy_center.png");
    sprite = new Sprite(tex);
    sprite.scale.set(0.5);
    sprite.anchor.set(0.5, 0.9);
    object = new SpriteObject(sprite);
    this.prefabs.push(object);

    tex = Assets.get<Texture>("/assets/game/cars/enemy_right.png");
    sprite = new Sprite(tex);
    sprite.scale.set(0.5);
    sprite.anchor.set(0.5, 0.9);
    object = new SpriteObject(sprite);
    this.prefabs.push(object);
  }

  /**
   * @param n number prefab in array, and also rail number
   */
  spawn(n: number): SpriteObject {
    const enemy = super.spawn(n);
    this.objectRailMap.set(enemy, n);

    return enemy;
  }

  moveObjects(dz: number) {
    // filer out destroyed objects
    this.objects = this.objects.filter((object) => {
      if (object.z < -200) {
        object.destroy();
        this.objectRailMap.delete(object);
        return false;
      }

      object.z -= dz * 2;
      const t = (DEPTH - object.z) / DEPTH;
      const railI = this.objectRailMap.get(object)!;
      const rail = this.rails[railI]!;
      rail.setTransformAt(t, object);

      return object.parent;
    });
  }

  updateSpawn() {
    /* noop */
  }
}
