import { AnimatedSprite, Rectangle, Texture } from "pixi.js";

export class OMGWhyPixiDoesntHaveThisOutOfTheBox extends AnimatedSprite {
  constructor(
    tex: Texture,
    public cols: number,
    public rows: number,
    public frames: number
  ) {
    const width = tex.width / cols;
    const height = tex.height / rows;
    tex.frame = new Rectangle(0, 0, width, height);
    super(Array<Texture>(frames).fill(tex));
  }

  update(dt: number) {
    const i = this.currentFrame;
    const { width, height } = this.texture.frame;
    this.texture.frame.x = (i % this.cols) * width;
    this.texture.frame.y = Math.floor(i / this.cols) * height;
    this.texture.updateUvs();
    super.update(dt);
  }
}
