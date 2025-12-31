import { describe, it, expect } from 'vitest';
import { greet, add } from './index.js';

describe('greet', () => {
  it('should return a greeting with the provided name', () => {
    expect(greet('World')).toBe('Hello, World!');
  });

  it('should handle empty string', () => {
    expect(greet('')).toBe('Hello, !');
  });
});

describe('add', () => {
  it('should add two positive numbers', () => {
    expect(add(1, 2)).toBe(3);
  });

  it('should handle negative numbers', () => {
    expect(add(-1, 1)).toBe(0);
  });

  it('should handle zero', () => {
    expect(add(0, 0)).toBe(0);
  });
});
