import { Tween, Group } from "tweedle.js";

export class TweenState<T> {
  queue: Tween<T>[] = [];
  current: Tween<T> | null = null;

  play(tween: Tween<T>) {
    tween.onComplete(() => {
      this.current = null;
      if (this.queue.length) {
        this.play(this.queue.shift()!);
      }
    });

    if (this.current) {
      this.queue.push(tween);
      return;
    }

    this.current = tween.start();
  }

  stop() {
    if (this.current) {
      this.current.stop();
      this.current = null;
    }
    this.queue = [];
  }
}

if (typeof window !== "undefined") {
  const tweenLoop = () => {
    requestAnimationFrame(tweenLoop);
    Group.shared.update();
  };
  tweenLoop();
}
