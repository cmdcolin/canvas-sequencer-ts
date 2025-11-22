import CanvasAtom from './CanvasAtom.js';

const locals = Object.freeze({
  METHODS: [
    'addHitRegion',
    'arc',
    'arcTo',
    'beginPath',
    'bezierCurveTo',
    'clearHitRegions',
    'clearRect',
    'clip',
    'closePath',
    'drawFocusIfNeeded',
    'drawImage',
    'ellipse',
    'fill',
    'fillRect',
    'fillText',
    'lineTo',
    'moveTo',
    'putImageData',
    'quadraticCurveTo',
    'rect',
    'removeHitRegion',
    'resetTransform',
    'restore',
    'rotate',
    'save',
    'scale',
    'scrollPathIntoView',
    'setLineDash',
    'setTransform',
    'stroke',
    'strokeRect',
    'strokeText',
    'transform',
    'translate',
  ],

  PROPERTIES: [
    'direction',
    'fillStyle',
    'filter',
    'font',
    'globalAlpha',
    'globalCompositeOperation',
    'imageSmoothingEnabled',
    'imageSmoothingQuality',
    'lineCap',
    'lineDashOffset',
    'lineJoin',
    'lineWidth',
    'miterLimit',
    'shadowBlur',
    'shadowColor',
    'shadowOffsetX',
    'shadowOffsetY',
    'strokeStyle',
    'textAlign',
    'textBaseline',
  ],
});

const symbols = Object.freeze({
  sequence: Symbol.for('sequence'),
  push:     Symbol.for('push'),
  fromJSON: Symbol.for('fromJSON'),
});

interface AtomData {
  type: string;
  inst: string;
  args: any[];
}

interface SequenceData {
  sequence: AtomData[];
}

class CanvasSequence {
  [key: symbol]: any;

  constructor(data: SequenceData | null = null) {
    this[symbols.sequence] = [];

    if (data) this[symbols.fromJSON](data);
  }

  [symbols.fromJSON](data: SequenceData = { sequence: [] }) {
    data.sequence.forEach(({ type, inst, args }) => {
      this[symbols.push](type, inst, args);
    });
  }

  [symbols.push](type: string, inst: string, args: any[]) {
    this[symbols.sequence].push(new CanvasAtom(type as any, inst, args));
  }

  execute(context: CanvasRenderingContext2D) {
    context.save();
    this[symbols.sequence].forEach((a: any) => a.execute(context));
    context.restore();
  }

  toJSON() {
    return { sequence: this[symbols.sequence] };
  }
}

locals.METHODS.forEach(m => {
  Object.defineProperty(CanvasSequence.prototype, m, {
    value: function pushMethodCall(...args: any[]) {
      (this as any)[symbols.push](CanvasAtom.METHOD, m, args);
    },
    writable:     false,
    enumerable:   true,
    configurable: false,
  });
});

locals.PROPERTIES.forEach(p => {
  Object.defineProperty(CanvasSequence.prototype, p, {
    get()  { throw `Invalid canvas sequencer interaction, cannot get ${p}.`; },
    set(v: any) { (this as any)[symbols.push](CanvasAtom.PROPERTY, p, [v]); },
    enumerable:   true,
    configurable: false,
  });
});

export default CanvasSequence;
