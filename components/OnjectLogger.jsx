import { useFrame } from '@react-three/fiber';

// Logger for any mesh/object3D
const ObjectLogger = ({ targetRef, label = "Object" }) => {
  useFrame(() => {
    if (targetRef.current) {
      console.log(
        `${label} position:`,
        targetRef.current.position.toArray().map(v => +v.toFixed(2))
      );
    }
  });
  return null;
};
export default ObjectLogger;