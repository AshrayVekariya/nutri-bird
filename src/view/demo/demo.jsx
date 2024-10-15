// src/ThreeCanvas.js
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const ThreeCanvas = ({ color }) => {
    const mountRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();

        renderer.setSize(300, 300); // Set canvas size
        mountRef.current.appendChild(renderer.domElement);

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 5;

        const animate = () => {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        };
        animate();

        // GSAP animation
        gsap.to(cube.rotation, { duration: 2, y: Math.PI * 2, repeat: -1, ease: "power1.inOut" });

        return () => {
            mountRef.current.removeChild(renderer.domElement);
        };
    }, [color]);

    return <div ref={mountRef} />;
};


const Demo = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 h-screen">
            <div className="flex items-center justify-center bg-gray-200">
                <ThreeCanvas color="orange" />
            </div>
            <div className="flex items-center justify-center bg-gray-300">
                <ThreeCanvas color="blue" />
            </div>
            <div className="flex items-center justify-center bg-gray-400">
                <ThreeCanvas color="green" />
            </div>
            <div className="flex items-center justify-center bg-gray-500">
                <ThreeCanvas color="red" />
            </div>
        </div>
    );
};

export default Demo;

