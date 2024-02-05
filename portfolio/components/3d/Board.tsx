import React from "react";
import { Mesh } from "three";

const Board = React.forwardRef<Mesh>((props, ref) => (
  <mesh ref={ref}>
    {/* // Table */}
    <mesh>
      <boxGeometry args={[15, 2, 10]} />
      <meshStandardMaterial color={"tan"} />
    </mesh>
    {/* // Board */}
    <mesh position={[0, 1, -0.3]}>
      <boxGeometry args={[5, 0.3, 3.5]} />
      <meshStandardMaterial color={"brown"} />
    </mesh>
  </mesh>
));

export default Board;
