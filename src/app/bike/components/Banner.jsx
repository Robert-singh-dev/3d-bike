'use client';

import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Styles from '../css/banner.module.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function BikeModel({ sectionRef }) {
  const bike = useGLTF('/assets/bike.glb');
  const bikeRef = useRef();

  useEffect(() => {
    if (bikeRef.current && sectionRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          pin: true,
          pinSpacing: false,
        },
      });

      tl.to(bikeRef.current.rotation, {
        x: -1.5,
        duration: 2,
        ease: 'power2.out',
      })
        .to(
          bikeRef.current.position,
          {
            z: 1,
            duration: 2,
            ease: 'power2.out',
          },
          0
        );

      // Cleanup on unmount
      return () => {
        tl.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, [sectionRef]);

  return (
    <primitive
      ref={bikeRef}
      object={bike.scene}
      scale={1.5}
      rotation={[0, 1.5, 0]}
      position={[0, 0, 0]} 
    />
  );
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[8, 8, 8]} intensity={1} />
      <directionalLight position={[-8, 8, -8]} intensity={0.5} />
    </>
  );
}

function Controls() {
  const { camera, gl } = useThree();
  return (
    <OrbitControls
      camera={camera}
      domElement={gl.domElement}
      enableZoom={false}
      enablePan={false}
      enableRotate={false}
      target={[0, 1, 0]}
    />
  );
}

export default function HeroPage() {
  const sectionRef = useRef();

  return (
    <> 
      <section ref={sectionRef} className={`${Styles.pinSec}`}>
        <Canvas camera={{ position: [0, 8, 0], fov: 20 }}>
          <Lighting />
          <Suspense fallback={null}>
            <BikeModel sectionRef={sectionRef} />
          </Suspense>
          <Controls />
        </Canvas>
      </section>
      <section className={`${Styles.secTwo}`}></section>
    </>
  );
}