import { insert } from "./orderIndex";
import assert from 'assert';

it('finds a default order', () => {
    const index = insert(null, null);
    assert.ok(index.length > 0);
});

it('finds a first order', () => {
    const index = insert(null, '0522');
    assert.ok(index < '0522');
});

it('finds a last order', () => {
    const index = insert('42', null);
    assert.ok(index > '42');
});

it('finds a middle order', () => {
    const index = insert('19', '20');
    assert.ok(index > '19');
    assert.ok(index < '20');
});

it('finds a complex middle order', () => {
    const index = insert('0000009', '11');
    assert.ok(index > '0000009');
    assert.ok(index < '11');
});

it('finds a complex middle order', () => {
    const index = insert('005', '010');
    assert.ok(index > '005');
    assert.ok(index < '010');
});
