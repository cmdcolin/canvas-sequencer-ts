import CanvasSequence from './CanvasSequence.js';

const symbols = Object.freeze({
  sequence: Symbol.for('sequence'),
  push:     Symbol.for('push'),
});

function replaceTags(str: string, values: Record<string, any>) {
  const tag = str.replace(/^\{|\}$/gu, '');
  if (tag !== str) {
    return values.hasOwnProperty(tag) ? values[tag] : tag;
  }
  return str;
}

class CanvasBlueprint extends CanvasSequence {
  build(values: Record<string, any> = {}) {
    const seq = new CanvasSequence();
    (this as any)[symbols.sequence].forEach(({ type, inst, args }: any) => {
      const realArgs = args.map((v: any) => {
        return (typeof v === 'string') ? replaceTags(v, values) : v;
      });
      (seq as any)[symbols.push](type, inst, realArgs);
    });
    return seq;
  }

  execute(): never {
    throw new TypeError('Cannot execute a blueprint.');
  }
}

export default CanvasBlueprint;
