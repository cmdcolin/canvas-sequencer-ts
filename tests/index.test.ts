import { CanvasBlueprint, CanvasSequence } from '../index.js';
import { expect, test } from 'vitest';

test('Classes are available', () => {
  expect(CanvasSequence).toBeInstanceOf(Function);
  expect(CanvasBlueprint).toBeInstanceOf(Function);
});
