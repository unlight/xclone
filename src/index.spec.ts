import { equal, ok, notEqual, deepEqual } from 'assert';
import * as lib from './index';

it('smoke', () => {
    ok(lib);
});

it('numbers', () => {
    const object = { a: 1 };
    const result = lib.deepClone(object);
    notEqual(result, object);
    deepEqual(result, object);
});

it('string', () => {
    const object = { a: 'a' };
    const result = lib.deepClone(object);
    notEqual(result, object);
    deepEqual(result, object);
});

it('primitives', () => {
    const object = { a: 1, b: true, b2: false, c: 'c', d: null, e: undefined };
    const result = lib.deepClone(object);
    notEqual(result, object);
    deepEqual(result, object);
});

it('deep primitives', () => {
    const object = { a: 2, x: { b: { c: true, c2: false, d: { e: null } } } };
    const result = lib.deepClone(object);
    notEqual(result, object);
    deepEqual(result, object);
});

it('functions', () => {
    const object = { a: 1, f: function func() { return arguments[0] + 1 } };
    const result = lib.deepClone(object);
    notEqual(result, object);
    ok(object.f.name === result.f.name);
    ok(object.f(1) === result.f(1));
    ok(object.f(10) === result.f(10));
    ok(object.f(100) !== result.f(0));
});

it('regexp', () => {
    const object = { r: /^x$/i };
    const result = lib.deepClone(object);
    notEqual(result, object);
    notEqual(object.r, result.r);
    equal(object.r.toString(), result.r.toString());
});

it('date', () => {
    const object = { d: new Date() };
    const result = lib.deepClone(object);
    notEqual(result, object);
    notEqual(object.d, result.d);
    equal(object.d.toString(), result.d.toString());
});

it('array', () => {
    const object = { a: [{ x: 1 }, { x: 2 }] };
    const result = lib.deepClone(object);
    notEqual(result, object);
    notEqual(result.a, object.a);
    deepEqual(result, object);
});

it('not a number', () => {
    const object = { a: NaN };
    const result = lib.deepClone(object);
    notEqual(result, object);
    notEqual(result.a, object.a);
    ok(isNaN(result.a));
});

it.skip('map collection', () => {
    const object = { a: new Map([['one', 1]]) };
    const result = lib.deepClone(object);
    notEqual(result, object);
    notEqual(result.a, object.a);
    ok(result.a.size === 1);
});
