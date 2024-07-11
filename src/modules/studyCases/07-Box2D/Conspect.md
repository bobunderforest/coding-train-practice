# Box2d

> Youtube Playlist: [Physics Libraries - The Nature of Code](https://www.youtube.com/playlist?list=PLRqwX-V7Uu6akvoNKE4GAxf6ZeBYoJ4uh); Videos 3 – 13

Box2d is a physical engine that operates with such entities:
- World
- Body
- Shape
- Fixture
- Joint

#### Coordinates

Box2d operates it's own coordinate system so we need to convert object coordinates from box2d world to screen coordinates to display. Vec2 is a box2d vector class.

- Pixel coordinates —> world coordinates: `coordPixelsToWorld(x, y)`
- World coordinates —> pixel coordinates: `coordWorldToPixels(x, y)`
- Get box with with width `w` in box2d coordinate system: `scalarPixelsToWorld(w / 2)`. We divide it by 2 because box2d counts size from center of the shape to it's boundary.

#### Creating a body

1. Create BodyDef with a `position` and `type` params. The `type` param can be: `dynamic`, `static` or `kinematic`.
2. Create the Body.
3. Create a shape. `PolygonShape`, `CircleShape`, `ChainShape`, etc.
4. Create a fixture to attach the shape to the body. Params: `density`, `friction` and `restitution`.
5. Put it all together.

#### Complex objects

Complex objects can be created by custom polygon or by attaching multiple shapes to one body.
