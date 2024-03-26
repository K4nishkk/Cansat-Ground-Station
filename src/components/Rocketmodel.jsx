// Rocketmodel.js
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { MeshStandardMaterial, Euler } from 'three';

const Rocketmodel = ({ orientation }) => {
  const { scene } = useGLTF('rocket.gltf');

  const material = new MeshStandardMaterial({ color: 0xff0000 });

  // Convert orientation to radians
  const euler = new Euler(
    orientation.x * (Math.PI / 180),
    orientation.y * (Math.PI / 180),
    orientation.z * (Math.PI / 180)
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas className="cursor-pointer" frameloop="demand" camera={{ position: [0, 0, 10], fov: 45 }}>
        <OrbitControls autoRotate enableZoom={true} enablePan={true} />
        <primitive object={scene} scale={[0.01, 0.01, 0.01]} material={material} rotation={euler} />
      </Canvas>
    </div>
  );
};

export default Rocketmodel;