import * as THREE from 'three';

export class AudioManager {
  private listener: THREE.AudioListener;
  public burstSound: THREE.PositionalAudio;

  constructor(camera: THREE.Camera, canGroup: THREE.Group) {
    this.listener = new THREE.AudioListener();
    camera.add(this.listener);

    this.burstSound = new THREE.PositionalAudio(this.listener);
    
    // Create a procedural burst sound using a white noise buffer
    const audioCtx = THREE.AudioContext.getContext();
    const bufferSize = audioCtx.sampleRate * 0.8; // 0.8 seconds
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
        // generate white noise fizz that decays over time
        const decay = Math.pow(1 - i / bufferSize, 2);
        data[i] = (Math.random() * 2 - 1) * decay * 0.5; // Scaled down volume
    }
    
    this.burstSound.setBuffer(buffer);
    this.burstSound.setRefDistance(5);
    this.burstSound.setVolume(2.0);
    
    canGroup.add(this.burstSound);
  }

  public playBurst() {
    if (this.burstSound.isPlaying) {
      this.burstSound.stop();
    }
    this.burstSound.play();
  }
}
