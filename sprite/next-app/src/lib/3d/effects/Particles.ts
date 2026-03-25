import * as THREE from 'three';

export class Particles {
  public group: THREE.Group;
  private bubblesMesh: THREE.InstancedMesh;
  private bubbleCount = 500;
  private dummy = new THREE.Object3D();
  private bubbleData: { speed: number, x: number, z: number, offset: number }[] = [];

  constructor() {
    this.group = new THREE.Group();
    
    // Bubble Geometry and Material for realistic carbonation
    const geometry = new THREE.SphereGeometry(0.04, 16, 16);
    
    // Use MeshPhysicalMaterial for refraction and glass-like bubble appearance
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.9,
      opacity: 1,
      metalness: 0.1,
      roughness: 0,
      ior: 1.1,
      thickness: 0.1,
      transparent: true,
    });
    
    this.bubblesMesh = new THREE.InstancedMesh(geometry, material, this.bubbleCount);
    
    for (let i = 0; i < this.bubbleCount; i++) {
      const radius = Math.random() * 3 + 1.2; // Keep them around the can but not inside
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * 15; // Spread vertically
      
      this.dummy.position.set(x, y, z);
      this.dummy.scale.setScalar(Math.random() * 0.6 + 0.4);
      this.dummy.updateMatrix();
      
      this.bubblesMesh.setMatrixAt(i, this.dummy.matrix);
      
      this.bubbleData.push({
        speed: Math.random() * 0.05 + 0.02,
        x,
        z,
        offset: Math.random() * Math.PI * 2
      });
    }
    
    this.group.add(this.bubblesMesh);
  }

  public update(time: number) {
    for (let i = 0; i < this.bubbleCount; i++) {
      this.bubblesMesh.getMatrixAt(i, this.dummy.matrix);
      this.dummy.matrix.decompose(this.dummy.position, this.dummy.quaternion, this.dummy.scale);
      
      const data = this.bubbleData[i];
      
      this.dummy.position.y += data.speed;
      
      // Wobble effect
      this.dummy.position.x = data.x + Math.sin(time * 3 + data.offset) * 0.05;
      this.dummy.position.z = data.z + Math.cos(time * 3 + data.offset) * 0.05;
      
      // Reset at top
      if (this.dummy.position.y > 8) {
        this.dummy.position.y = -8;
      }
      
      this.dummy.updateMatrix();
      this.bubblesMesh.setMatrixAt(i, this.dummy.matrix);
    }
    
    this.bubblesMesh.instanceMatrix.needsUpdate = true;
  }
}
