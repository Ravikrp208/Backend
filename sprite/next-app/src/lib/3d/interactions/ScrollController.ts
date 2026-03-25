import * as THREE from 'three';
import gsap from 'gsap';

export class ScrollController {
  constructor(
    camera: THREE.PerspectiveCamera,
    canGroup: THREE.Group,
    particlesGroup: THREE.Group
  ) {
    // Initial State: Hidden/High up
    camera.position.set(0, 5, 20);
    canGroup.position.set(0, 15, 0); 
    
    // Create the master timeline linked to the scroll container
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5, // 1.5 seconds smooth catching up
      }
    });

    // Transition 1: Entering Scene 1 to Scene 2 (Hero to Close-up)
    // The can drops into view, camera moves forward
    tl.to(canGroup.position, { y: 0, ease: "power2.out", duration: 1 }, 0)
      .to(camera.position, { y: 0.5, z: 7, ease: "power1.inOut", duration: 1 }, 0)
      
    // Transition 2: Scene 2 to Scene 3 (Close-up to Burst)
    // Get very close to see the droplets, spin the can
    tl.to(camera.position, { y: 0, z: 4, ease: "power2.inOut", duration: 1 }, 1)
      .to(canGroup.rotation, { y: Math.PI * 2, ease: "none", duration: 1 }, 1)

    // Transition 3: Scene 3 to Scene  4 (Burst to CTA)
    // Pull back and orbit slightly, expand particles
    tl.to(camera.position, { x: 4, z: 8, ease: "power2.inOut", duration: 1 }, 2)
      .to(canGroup.rotation, { y: Math.PI * 3, ease: "none", duration: 1 }, 2)
      .to(particlesGroup.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 1 }, 2)

    // Transition 4: Final settling
    tl.to(camera.position, { x: 0, y: 0, z: 10, ease: "power2.out", duration: 1 }, 3)
      .to(canGroup.rotation, { y: Math.PI * 4, ease: "power2.out", duration: 1 }, 3)
      .to(particlesGroup.scale, { x: 1, y: 1, z: 1, duration: 1 }, 3);
  }
}
