import { test, expect } from 'vitest';
import { CanvasSequence, CanvasBlueprint } from '../index.js';

test('Classes are available', () => {
  expect(CanvasSequence).toBeInstanceOf(Function);
  expect(CanvasBlueprint).toBeInstanceOf(Function);
});
