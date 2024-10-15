import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import parrotImg from '../../assets/our-goal/budgie-anim.glb';
import { gsap } from 'gsap';

const OurGoal = () => {
    const mountRef = useRef(null);
    const parrotRef = useRef(null);
    const mixerRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0x000000, 0);

        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 8);
        directionalLight.position.set(0, 3, 5);
        directionalLight.castShadow = true;
        scene.add(directionalLight);

        const loader = new GLTFLoader();
        loader.load(parrotImg, (gltf) => {
            parrotRef.current = gltf.scene;

            parrotRef.current.scale.set(0.13, 0.13, 0.13);
            parrotRef.current.rotation.set(0.3, 1.2, 0);
            parrotRef.current.position.set(-100, 1, 0);

            scene.add(parrotRef.current);
            mixerRef.current = new THREE.AnimationMixer(gltf.scene);
            const action = mixerRef.current.clipAction(gltf.animations[0]);
            action.play();
        });

        camera.position.z = 5;

        const handleScroll = () => {
            const rect = mountRef.current.getBoundingClientRect();

            const translateX = -(rect.y / rect.height) * 15;
            const translateY = (rect.y / rect.height) * 5;

            if (parrotRef.current) {
                gsap.to(parrotRef.current.position, {
                    x: translateX,
                    y: translateY,
                    duration: 0.5,
                    ease: 'power2.out',
                });
            }
        };

        const animate = () => {
            requestAnimationFrame(animate);
            if (mixerRef.current) mixerRef.current.update(0.01);

            if (parrotRef.current) {
                window.addEventListener('scroll', handleScroll);
            }
            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            mountRef.current.removeChild(renderer.domElement);
            if (renderer) renderer.dispose();
        };
    }, []);

    return (
        <>
            <div ref={mountRef} className='relative'>
                <div className='absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[-5]'>
                    <div className='container mx-auto px-5'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
                            <div></div>
                            <div>
                                <h1 className='text-4xl md:text-5xl lg:text-8xl	font-bold'>Your birds at their best</h1>
                                <div>
                                    <ul className="mt-20 list-disc marker:text-green-600">
                                        <li className="mt-5 mx-5 text-sm md:text-2xl">A complete and extensive range of all-in-one-solutions</li>
                                        <li className="mt-5 mx-5 text-sm md:text-2xl">For all bird species at every stage of life</li>
                                        <li className="mt-5 mx-5 text-sm md:text-2xl">Offered by 1 single brand with many years of experience</li>
                                        <li className="mt-5 mx-5 text-sm md:text-2xl">Quality products</li>
                                        <li className="mt-5 mx-5 text-sm md:text-2xl">Developed by avian vets and nutritionists</li>
                                        <li className="mt-5 mx-5 text-sm md:text-2xl">Used by top breeders and zoos around the world</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OurGoal;

