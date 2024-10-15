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

        renderer.setSize(window.innerWidth, window.innerHeight);
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

            parrotRef.current.scale.set(0.11, 0.11, 0.11);
            parrotRef.current.rotation.set(0, 1.3, 0);
            parrotRef.current.position.set(-100, 2, 0);

            scene.add(parrotRef.current);
            mixerRef.current = new THREE.AnimationMixer(gltf.scene);
            const action = mixerRef.current.clipAction(gltf.animations[1]);
            action.play();
        });

        camera.position.z = 5;

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const totalHeight = document.body.scrollHeight - windowHeight;
            const rect = mountRef.current.getBoundingClientRect();

            const scrollPercentage = scrollY / totalHeight;

            const translateX = (scrollPercentage * 600 - 100) * 0.2;
            const translateY = -(scrollPercentage * 400 - 50) * 0.2;

            if (rect.top < 400) {
                gsap.to(parrotRef.current.position, {
                    x: translateX,
                    y: translateY / 7,
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
            <div ref={mountRef} className='relative mb-[300px]'>
                <div className='absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[-5]'>
                    <div className='container mx-auto px-5'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
                            <div></div>
                            <div>
                                <h1 className='text-4xl md:text-5xl lg:text-8xl	font-bold'>We are NutriBird</h1>
                                <p className='text-md md:text-xl mt-10'>We are NutriBird, for bird owners to carefree give the best to their birds. We’re obsessed with making birds look and perform at their best. We specialise in complete and balanced all-in-one nutrition formulas for all bird species, at every life stage.</p>
                            </div>
                            <div className='mt-[250px] text-md md:text-xl'>
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

