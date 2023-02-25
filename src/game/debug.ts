import { Graphics, Point } from "pixi.js";

export class Rect extends Graphics {
  constructor(x: number, y: number, width: number, height: number) {
    super();
    this.position.set(x, y);
    // this.width = width;
    // this.height = height;
    this.beginFill(0xff0000);
    this.drawRect(-width / 2, -height / 2, width, height);
    // this.endFill();
    this.lineStyle(2, 0xbb4433);
  }
}

export class Line extends Graphics {
  constructor(start: Point, end: Point) {
    super();
    this.lineStyle(2, 0xbb4433);
    this.moveTo(start.x, start.y);
    this.lineTo(end.x, end.y);
  }
}
