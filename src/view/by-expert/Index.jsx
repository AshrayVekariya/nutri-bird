import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import parrotImg from '../../assets/by-expert/greenjay-anim.glb';
import { gsap } from 'gsap';

const ByExpert = () => {
    const mountRef = useRef(null);
    const parrotRef = useRef(null);
    const mixerRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0x000000, 0);

        renderer.setSize(window.innerWidth, 1500);
        mountRef.current.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
        directionalLight.position.set(10, 10, 10);
        directionalLight.castShadow = true;
        scene.add(directionalLight);

        const loader = new GLTFLoader();
        loader.load(parrotImg, (gltf) => {
            parrotRef.current = gltf.scene;

            parrotRef.current.position.set(-50, 1, 0);
            parrotRef.current.scale.set(0.09, 0.09, 0.09);
            parrotRef.current.rotation.set(0, 1.3, 0);

            scene.add(parrotRef.current);
            mixerRef.current = new THREE.AnimationMixer(gltf.scene);
            const action = mixerRef.current.clipAction(gltf.animations[1]);
            action.play();
        });

        camera.position.z = 5;

        const handleScroll = () => {
            const rect = mountRef.current.getBoundingClientRect();

            const translateX = -(rect.y / rect.height) * 20;
            const translateY = (rect.y / rect.height) * 5;

            if (parrotRef.current) {
                gsap.to(parrotRef.current.position, {
                    x: translateX - 5,
                    y: translateY + 1,
                    duration: 0.3,
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
                <div className='absolute w-full top-0 z-[-5]'>
                    <div className='container mx-auto px-10 mt-[300px]'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
                            <div></div>
                            <div>
                                <h1 className='text-3xl md:text-5xl lg:text-[3.333vw] lg:max-w-[736px] font-bold'>YOUR BIRDS AT THEIR BEST, BACKED BY EXPERTS</h1>
                                <p className='text-[14px] lg:text-[1.146vw] leading-6 lg:leading-[1.906vw] font-medium mt-10'>From canaries and parrots to toucans and hornbills. Making the right choice
                                    in bird nutrition is a vital step in fulfilling the needs of your birds. You want
                                    them to look and perform at their best. At every stage in their lives. But
                                    where do you start? With NutriBird.</p>
                            </div>
                            <div className='pt-[322px] text-[14px] lg:text-[1.146vw] leading-6 lg:leading-[1.906vw] font-medium mt-10'>
                                <p>I have been an aviculturist for 45 years. Birds are my passion; they are my reason for living. I always provide them with the best care and food possible. Each day I rely on NutriBird to keep them healthy. NutriBird is nutritious, based on science and produced by a company that mills the product - they don't rely on others to produce it for them. This gives me the confidence to give NutriBird to my flock, which ranges from parakeets to hyacinth macaws to palm cockatoos.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ByExpert;

