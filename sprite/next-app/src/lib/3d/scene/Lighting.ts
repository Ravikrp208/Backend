import * as THREE from 'three';

export class Lighting {
  public group: THREE.Group;
  public rimLight: THREE.PointLight;

  constructor() {
    this.group = new THREE.Group();

    // Key Light: Illuminates the front/side
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(5, 5, 5);
    
    // Fill Light: Softens shadows on the opposite side
    const fillLight = new THREE.DirectionalLight(0xccddff, 1.0);
    fillLight.position.set(-5, 3, 5);
    
    // Rim Light (Green Glow): Gives the cinematic Sprite aura from behind
    this.rimLight = new THREE.PointLight(0x00ff00, 50, 20);
    this.rimLight.position.set(0, -1, -3); // Behind and slightly below
    
    // Base Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    
    // Optional spotlight for dramatic focus from the top
    const spotLight = new THREE.SpotLight(0xffffff, 100);
    spotLight.position.set(0, 10, 0);
    spotLight.angle = Math.PI / 6;
    spotLight.penumbra = 0.5;
    spotLight.decay = 2;
    spotLight.distance = 50;

    this.group.add(keyLight);
    this.group.add(fillLight);
    this.group.add(this.rimLight);
    this.group.add(ambientLight);
    this.group.add(spotLight);
  }

  public update(time: number) {
    // Dynamic light flickers/pulsing for the rim light
    this.rimLight.intensity = 50 + Math.sin(time * 5) * 10;
  }
}
