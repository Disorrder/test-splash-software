import { Container } from "pixi.js";
import { clamp, getRandomInt } from "~/utils";

import { DEPTH, Game } from "./Game";
import { PerspectiveLine } from "./PerspectiveLine";
import { SpriteObject } from "./SpriteObject";

export abstract class RailGenerator {
  container = new Container();

  rail!: PerspectiveLine;
  prefabs: SpriteObject[] = [];
  objects: SpriteObject[] = [];

  spawnedAt = 0;
  spawnNextAt = 0;
  spawnInterval: [number, number] = [500, 8000];

  constructor(protected game: Game) {
    this.initRail();
    this.initPrefabs();

    game.app.stage.addChild(this.container);
    game.app.ticker.add((dt) => this.update(dt));
  }

  abstract initRail(): void;
  abstract initPrefabs(): void;

  /**
   * @param n number prefab in array
   */
  spawn(n: number): SpriteObject {
    n = clamp(n, 0, this.prefabs.length - 1);
    const prefab = this.prefabs[n];
    if (!prefab) throw new Error("Prefab not found");

    const object = prefab.clone();
    object.z = DEPTH;

    this.container.addChildAt(object, 0);
    this.objects.push(object);

    this.spawnedAt = this.game.app.ticker.lastTime;
    this.spawnNextAt = this.spawnedAt + getRandomInt(...this.spawnInterval);
    return object;
  }

  updateSpawn() {
    const time = this.game.app.ticker.lastTime;
    if (time > this.spawnNextAt) {
      const n = getRandomInt(0, this.prefabs.length - 1);
      this.spawn(n);
    }
  }

  moveObjects(dz: number) {
    // filer out destroyed objects
    this.objects = this.objects.filter((object) => {
      if (object.z < 0) {
        object.destroy();
        return false;
      }

      object.z -= dz;
      const t = (DEPTH - object.z) / DEPTH;
      this.rail.setTransformAt(t, object);

      return object.parent;
    });
  }

  update(dt: number) {
    this.updateSpawn();

    const dz = this.game.speed * dt * dt;
    this.moveObjects(dz);
  }
}
