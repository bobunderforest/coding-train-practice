# Box2d

- [Box2d.ts main page](https://lusito.github.io/box2d.ts/)
- [Box2d.ts demos page](https://lusito.github.io/box2d.ts/testbed/)
- [Box2d.ts test environment code](https://github.com/Lusito/box2d.ts/blob/master/packages/testbed/src/test.ts)
- [Box2d Original Docs](https://box2d.org/documentation/index.html)
- Youtube: [Physics Libraries - The Nature of Code](https://www.youtube.com/playlist?list=PLRqwX-V7Uu6akvoNKE4GAxf6ZeBYoJ4uh) (Videos 3 – 12)

Box2d is a physical engine that operates with such entities:
- World
- Body
- Shape
- Fixture
- Joint

> ⚠️ Box2D has been tuned to work well with moving shapes between 0.1 and 10 meters. Static shapes may be up to 50 meters long without trouble.

## Coordinates

Box2d operates it's own coordinate system so we need to convert object coordinates from box2d world to screen coordinates to display. Vec2 is a box2d vector class.

The `CoordinateTransformer` class was implemented to perform coordinate transformations between the screen and the world coordinate systems. It has following methods:
- Pixel coordinates —> world coordinates: `screenToWorld(x, y)`
- World coordinates —> pixel coordinates: `worldToScreen(x, y)`
- Scalar value transformation: `screenToWorldScalar(w)` and `worldToScreenScalar(w)`.
- Vector transformation: `screenToWorldVector(x, y)` and `worldToScreenVector(x, y)`.

## Creating a body

1. Create BodyDef with a `position` and `type` params. The `type` param can be: `dynamic`, `static` or `kinematic`.
2. Create the Body.
3. Create a shape. `PolygonShape`, `CircleShape`, `ChainShape`, etc.
4. Create a fixture to attach the shape to the body. Params: `density`, `friction` and `restitution`.
5. Put it all together.

## Complex objects

Complex objects can be created by custom polygon or by attaching multiple shapes to one body.

## Joints

> [Video 1](https://www.youtube.com/watch?v=4LYvltd07hk&list=PLRqwX-V7Uu6akvoNKE4GAxf6ZeBYoJ4uh)
> [Video 2](https://www.youtube.com/watch?v=SUVH8Bh4ruw&list=PLRqwX-V7Uu6akvoNKE4GAxf6ZeBYoJ4uh)

1. Have 2 bodies.
2. Define the joint and configure all the params.
3. Create the joint

## Mouse Joint

> [Video](https://www.youtube.com/watch?v=Ubfqc983jN8&list=PLRqwX-V7Uu6akvoNKE4GAxf6ZeBYoJ4uh)

1. Define `MouseJointDef`.
2. Set the `bodyA` parameter as a ground body, and `bodyB` parameter as a body which you are interacting with.
3. Set the `target` vector to the mouse pointer position values.
4. Apply the `maxForce` and `damping` values.
5. Calculate stiffness with the `b2LinearStiffness` helper.
6. Create the joint with `world.CreateJoint`.
7. Update joint's `target` position while mouse is moving with `joint.SetTarget()`.
8. On mouse up, call the `world.DestroyJoint()` method.
