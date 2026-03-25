"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { SceneManager } from '@/lib/3d/scene/SceneManager';
import { SodaCan } from '@/lib/3d/objects/SodaCan';
import { Lighting } from '@/lib/3d/scene/Lighting';
import { Particles } from '@/lib/3d/effects/Particles';
import { PostProcessing } from '@/lib/3d/effects/PostProcessing';
import { ScrollController } from '@/lib/3d/interactions/ScrollController';
import { AudioManager } from '@/lib/3d/audio/AudioManager';
import { MouseController } from '@/lib/3d/interactions/MouseController';

gsap.registerPlugin(ScrollTrigger);

export default function Canvas3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const sceneManager = new SceneManager(canvasRef.current);
    const sodaCan = new SodaCan();
    const lighting = new Lighting();
    const particles = new Particles();
    
    sceneManager.scene.add(sodaCan.group);
    sceneManager.scene.add(lighting.group);
    sceneManager.scene.add(particles.group);

    const postProcessing = new PostProcessing(
      sceneManager.renderer,
      sceneManager.scene,
      sceneManager.camera,
      window.innerWidth,
      window.innerHeight
    );

    const resizeHandler = () => {
      postProcessing.resize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', resizeHandler);

    const scrollController = new ScrollController(sceneManager.camera, sodaCan.group, particles.group);
    const audioManager = new AudioManager(sceneManager.camera, sodaCan.group);
    const mouseController = new MouseController(sceneManager.camera, sceneManager.scene, sodaCan.group, lighting, audioManager);

    const clock = new THREE.Clock();
    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      
      sodaCan.update(elapsedTime);
      lighting.update(elapsedTime);
      particles.update(elapsedTime);
      
      postProcessing.render();
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resizeHandler);
      ScrollTrigger.getAll().forEach(t => t.kill());
      sceneManager.renderer.dispose();
      // Optionally cleanup other Three.js objects
    };
  }, []);

  return <canvas ref={canvasRef} id="canvas" className="fixed top-0 left-0 w-screen h-screen z-0 pointer-events-none" />;
}
