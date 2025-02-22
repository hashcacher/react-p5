import React, { Component, RefObject, LegacyRef, createRef } from "react";
import p5 from "p5";

// NOTE: assigning p5 to window because someone can need it globally to use in others libraries
if (typeof window !== "undefined") {
  window.p5 = p5;
}

export const p5Events = [
  "draw",
  "windowResized",
  "preload",
  "mouseClicked",
  "doubleClicked",
  "mouseMoved",
  "mousePressed",
  "mouseWheel",
  "mouseDragged",
  "mouseReleased",
  "keyPressed",
  "keyReleased",
  "keyTyped",
  "touchStarted",
  "touchMoved",
  "touchEnded",
  "deviceMoved",
  "deviceTurned",
  "deviceShaken",
];

export default class Sketch extends Component<any, any> {
  canvasParentRef: RefObject<HTMLDivElement> | undefined
  sketch: any

  constructor(props: any) {
    super(props);
    this.canvasParentRef = createRef();
  }

  componentDidMount() {
    this.sketch = new p5((p) => {
      p.setup = () => {
        this.props.setup(p, this.canvasParentRef!.current);
      };

      p5Events.forEach((event) => {
        if (this.props[event]) {
          p[event] = (...rest: any[]) => {
            this.props[event](p, ...rest);
          };
        }
      });
    });
  }
  shouldComponentUpdate() {
    return false;
  }
  componentWillUnmount() {
    this.sketch.remove();
  }
  render() {
    return (
      <div
        ref={this.canvasParentRef as LegacyRef<HTMLDivElement>}
        className={this.props.className || "react-p5"}
        data-testid="react-p5"
      />
    );
  }
}
