import * as THREE from 'three';
import gsap from 'gsap';
import { AudioManager } from '../audio/AudioManager';
import { Lighting } from '../scene/Lighting';

export class MouseController {
  private mouse = new THREE.Vector2();
  private raycaster = new THREE.Raycaster();
  private baseScrollY = 0;
  
  constructor(
    private camera: THREE.PerspectiveCamera,
    private scene: THREE.Scene,
    private canGroup: THREE.Group,
    private lighting: Lighting,
    private audioManager: AudioManager
  ) {
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    window.addEventListener('click', this.onClick.bind(this));
    
    // Track scroll to combine with parallax
    window.addEventListener('scroll', () => {
      // In GSAP scrub, we don't necessarily want to override camera pos, 
      // parallax should ideally be additive, but simple gsap overwriting works for typical setups.
    });
  }

  private onMouseMove(event: MouseEvent) {
    // Convert to normalized device coordinates
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Small Parallax for camera and can
    gsap.to(this.canGroup.rotation, {
      z: -this.mouse.x * 0.1,
      x: this.mouse.y * 0.1,
      duration: 1,
      ease: "power2.out",
      overwrite: "auto"
    });

    // Hover check
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObject(this.canGroup, true);
    
    if (intersects.length > 0) {
      document.body.style.cursor = 'crosshair';
      gsap.to(this.lighting.rimLight, { intensity: 100, duration: 0.3 });
    } else {
      document.body.style.cursor = 'default';
      gsap.to(this.lighting.rimLight, { intensity: 50, duration: 0.3 });
    }
  }

  private onClick() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObject(this.canGroup, true);
    
    if (intersects.length > 0) {
      // Burst animation
      gsap.to(this.canGroup.scale, {
        x: 1.2, y: 1.2, z: 1.2,
        duration: 0.1,
        yoyo: true,
        repeat: 1
      });
      // Play sound
      this.audioManager.playBurst();
    }
  }
}
