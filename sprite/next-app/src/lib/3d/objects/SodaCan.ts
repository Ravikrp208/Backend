import * as THREE from 'three';

export class SodaCan {
  public group: THREE.Group;
  private canMesh: THREE.Mesh;
  
  constructor() {
    this.group = new THREE.Group();
    
    // Create the main cylinder geometry representing the can body
    // Dimensions: ratio ~1.85:1 (height vs diameter)
    const geometry = new THREE.CylinderGeometry(1, 1, 3.7, 64, 1, true);
    
    // Top and bottom metal caps
    const topGeometry = new THREE.CylinderGeometry(0.95, 1, 0.2, 64, 1, false);
    const bottomGeometry = new THREE.CylinderGeometry(0.85, 1, 0.3, 64, 1, false);
    
    // Load the texture
    const textureLoader = new THREE.TextureLoader();
    const canTexture = textureLoader.load('/textures/sprite_can.png');
    canTexture.colorSpace = THREE.SRGBColorSpace;
    
    // Ensure texture wraps perfectly if needed (though mapping usually stretches well on cylinder)
    canTexture.wrapS = THREE.RepeatWrapping;
    canTexture.repeat.set(-1, 1); // Flip horizontally if text is backward
    
    // Material (PBR)
    const material = new THREE.MeshStandardMaterial({
      map: canTexture,
      metalness: 0.7,
      roughness: 0.15,
      envMapIntensity: 1.5,
      side: THREE.DoubleSide // To render inside just in case
    });
    
    const metalMaterial = new THREE.MeshStandardMaterial({
      color: 0xcdcdcd,
      metalness: 0.9,
      roughness: 0.2,
      envMapIntensity: 2.0
    });

    this.canMesh = new THREE.Mesh(geometry, material);
    
    const topMesh = new THREE.Mesh(topGeometry, metalMaterial);
    topMesh.position.y = 1.95;
    
    const bottomMesh = new THREE.Mesh(bottomGeometry, metalMaterial);
    bottomMesh.position.y = -2.0;

    // Wet Shell Mesh for condensation droplets via Shader
    const wetGeometry = new THREE.CylinderGeometry(1.02, 1.02, 3.65, 64, 1, true);
    (this as any).wetMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        varying vec3 vNormal;

        float rand(vec2 p) {
          return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
        }

        void main() {
          vec2 st = vUv * vec2(40.0, 10.0);
          
          // Different scroll speeds based on noise
          float nSpeed = rand(floor(st * vec2(1.0, 0.0))); 
          st.y += time * (0.1 + nSpeed * 0.3);
          
          vec2 id = floor(st);
          vec2 f = fract(st);
          
          float n = rand(id);
          float d = length(f - vec2(0.5, 0.5));
          
          float droplet = smoothstep(0.4 * n, 0.3 * n, d);
          droplet *= step(0.6, n); // keep fewer droplets
          
          // Subtle normal highlight
          float spec = pow(max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0), 30.0);
          
          // Add some environmental green to droplets to fit Scene
          vec3 col = vec3(0.8, 1.0, 0.8) * spec + vec3(1.0) * droplet * 0.5;
          float alpha = droplet * 0.8 + spec * 0.3;
          
          gl_FragColor = vec4(col, alpha);
        }
      `
    });
    const wetMesh = new THREE.Mesh(wetGeometry, (this as any).wetMaterial);

    this.group.add(this.canMesh);
    this.group.add(topMesh);
    this.group.add(bottomMesh);
    this.group.add(wetMesh);

    // Initial positioning
    this.group.position.set(0, 0, 0);
  }

  public update(time: number) {
    // Subtle idle floating animation
    this.group.position.y = Math.sin(time * 2) * 0.1;
    this.group.rotation.x = Math.sin(time) * 0.05 + 0.1; // slight tilt forward
    this.group.rotation.y = time * 0.5; // continuous rotation
    this.group.rotation.z = Math.cos(time * 1.2) * 0.02;

    if ((this as any).wetMaterial) {
      (this as any).wetMaterial.uniforms.time.value = time;
    }
  }
}
