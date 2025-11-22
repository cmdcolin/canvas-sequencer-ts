import { describe, expect, test, vi } from 'vitest';
import CanvasAtom from '../src/CanvasAtom.js';

const METHOD = CanvasAtom.METHOD;
const PROPERTY = CanvasAtom.PROPERTY;

describe('CanvasAtom', () => {
  describe(METHOD, () => {
    const args = [1, 2, 3, 0, Math.PI];

    describe('constructor(type, inst, args)', () => {
      test('Returns a valid object of correct type', () => {
        const ca = new CanvasAtom(METHOD, 'arc', args) as any;
        expect(ca.type).toEqual(METHOD);
        expect(ca.inst).toEqual('arc');
        expect(ca.args).toBeInstanceOf(Array);
        expect(ca.args).toEqual(args);
      });
    });

    describe('execute(context)', () => {
      const ctx = {} as any;
      ctx.arc = vi.fn();
      const ca = new CanvasAtom(METHOD, 'arc', args) as any;
      test('Executes its method on the context', () => {
        expect(() => ca.execute(ctx)).not.toThrow();
        expect(ctx.arc).toHaveBeenCalledTimes(1);
        expect(ctx.arc).toHaveBeenLastCalledWith(...args);
      });
    });
  });

  describe(PROPERTY, () => {
    const args = ['12px serif'];

    describe('constructor(type, inst, args)', () => {
      test('Returns a valid object of correct type', () => {
        const ca = new CanvasAtom(PROPERTY, 'font', args) as any;
        expect(ca.type).toEqual(PROPERTY);
        expect(ca.inst).toEqual('font');
        expect(ca.args).toBeInstanceOf(Array);
        expect(ca.args).toEqual(args);
      });
    });

    describe('execute(context)', () => {
      const ctx = {} as any;
      ctx.font = '10px sans-serif';
      const ca = new CanvasAtom(PROPERTY, 'font', args) as any;
      test('Assigns its property on the context', () => {
        expect(() => ca.execute(ctx)).not.toThrow();
        expect(ctx.font).toBe(...args);
      });
    });
  });
});
