'use client';

import React, { useMemo } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// --- КОМПОНЕНТ КНИГИ (3D MODEL) ---
function Book() {
  // Завантажуємо твою обкладинку
  const coverTexture = useLoader(THREE.TextureLoader, '/cover_zine.png');
  
  // Генеруємо текстуру смужок (сторінок) програмно, щоб не треба було файлів
  const pagesTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 64, 64);
      ctx.fillStyle = '#e60000'; // Червоні смужки
      // Малюємо смужки
      for (let i = 0; i < 64; i += 4) {
        ctx.fillRect(i, 0, 2, 64); 
      }
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }, []);

  // Розміри книги: Ширина 3, Висота 4.2, Товщина 0.25
  const args: [number, number, number] = [3, 4.2, 0.25];

  return (
    <mesh rotation={[0, -0.5, 0]}> {/* Початковий поворот */}
      <boxGeometry args={args} />
      {/* Масив матеріалів для 6 граней куба: 
          Order: Right, Left, Top, Bottom, Front, Back */}
      
      {/* 1. Right (Сторінки збоку) */}
      <meshBasicMaterial map={pagesTexture} />
      {/* 2. Left (Корінець - білий) */}
      <meshBasicMaterial color="white" />
      {/* 3. Top (Сторінки зверху - треба повернути текстуру) */}
      <meshBasicMaterial map={pagesTexture} />
      {/* 4. Bottom (Сторінки знизу) */}
      <meshBasicMaterial map={pagesTexture} />
      {/* 5. Front (Обкладинка) */}
      <meshBasicMaterial map={coverTexture} />
      {/* 6. Back (Обкладинка ззаду) */}
      <meshBasicMaterial map={coverTexture} />
    </mesh>
  );
}

// --- ГОЛОВНА СТОРІНКА ---
export default function BookPage() {
  return (
    <div className="relative min-h-screen w-full bg-[#FF0000] overflow-x-hidden flex flex-col md:block">
      
      {/* Глобальні стилі шрифтів */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Helvetica+Neue:wght@400;700&display=swap');
        body { margin: 0; font-family: 'Helvetica Neue', sans-serif; }
        
        .text-base-custom { font-size: 13px; line-height: 103%; letter-spacing: -0.04em; }
        .title-custom { font-size: 26px; line-height: 103%; letter-spacing: -0.04em; }
        .price-text { font-size: 23px; font-weight: bold; line-height: 1; transform: scaleX(1.25); transform-origin: center; }
        .label-text { font-size: 13px; letter-spacing: -0.04em; font-weight: bold; line-height: 1; margin-top: 4px; }
      `}} />

      {/* --- 3D СЦЕНА (CANVAS) --- */}
      <div className="book-wrapper relative z-0 w-full h-[60vh] md:absolute md:top-0 md:left-0 md:w-full md:h-full">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          {/* Світло (хоча для BasicMaterial воно не критичне, але хай буде для об'єму) */}
          <ambientLight intensity={1} />
          
          {/* Сама книга */}
          <Book />

          {/* Контроли: дозволяють крутити, зумити(відключено), і авто-обертання */}
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate={true}
            autoRotateSpeed={4.0} // Швидкість обертання
          />
        </Canvas>
      </div>

      {/* --- MOBILE PANEL (Текст знизу) --- */}
      <div className="mobile-panel md:hidden relative w-full bg-[#D9D9D9] p-[13px] flex flex-col z-10 flex-grow">
        <h1 className="title-custom font-bold m-0 origin-left scale-x-125 w-[80%] mb-[18px]">
          Зін «Мама»<br />
          Христина Новікова
        </h1>

        <div className="flex flex-col gap-[5px] mb-[18px]">
            <a 
                href="ВСТАВ_СЮДИ_ЛІНК_НА_БАНКУ" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-black w-full h-[82px] flex justify-center items-center text-[25px] font-bold tracking-[-0.04em] no-underline hover:scale-[1.01] transition-transform"
            >
                Monopay
            </a>

            <div className="flex w-full gap-[5px]">
                <div className="flex-1 bg-white text-black h-[63px] flex flex-col justify-center items-center">
                    <div className="price-text">666₴</div>
                    <div className="label-text">pre-order</div>
                </div>
                <div className="flex-1 bg-[#ACACAC] text-black h-[63px] flex flex-col justify-center items-center">
                    <div className="price-text relative">
                        <span className="opacity-40">777₴</span>
                        <span className="absolute left-0 top-1/2 w-full h-[2px] bg-black opacity-40 -translate-y-1/2"></span>
                    </div>
                    <div className="label-text">full price</div>
                </div>
            </div>
        </div>

        <p className="text-base-custom font-bold mb-[18px]">
          Цей зін апропріює естетику культової пачки Marlboro Red, перетворюючи хроніку життя в окупації на візуальний об’єкт із попередженням про небезпеку. Червоний колір тривоги тут римується з агресивним брендингом, а очікування повідомлень від мами з Маріуполя (2022–2026) стає метафорою залежності, від якої неможливо відмовитися. Це документація зв’язку, де буденні поради «поїсти супу» перемішані зі звуками вибухів, а любов до рідного дому межує з фатальним ризиком там залишатися.
        </p>

        <div className="text-base-custom font-bold mb-5">
          Дизайн та верстка: Володимир Хоменко<br />
          Видавництво: IDINAHUI PUBLISHING<br />
          Формат А5, 68 с.<br />
          Київ, 2026
        </div>
      </div>


      {/* --- DESKTOP PANEL (Текст збоку) --- */}
      <div className="desktop-panel hidden md:flex absolute top-0 right-0 flex-col z-10 w-[348px]">
        <div 
          className="bg-[#D9D9D9] text-black flex flex-col relative"
          style={{ height: '432px', padding: '15px 18px 15px 14px' }}
        >
          <h1 className="title-custom font-bold m-0 origin-left scale-x-125 w-[80%] mb-5">
            Зін «Мама»<br />
            Христина Новікова
          </h1>

          <div className="text-base-custom font-bold mb-3">
            Дизайн та верстка: Володимир Хоменко<br />
            Видавництво: IDINAHUI PUBLISHING<br />
            Формат А5, 68 с.<br />
            Київ, 2026
          </div>

          <p className="text-base-custom font-bold mb-auto">
            Цей зін апропріює естетику культової пачки Marlboro Red, перетворюючи хроніку життя в окупації на візуальний об’єкт із попередженням про небезпеку. Червоний колір тривоги тут римується з агресивним брендингом, а очікування повідомлень від мами з Маріуполя (2022–2026) стає метафорою залежності, від якої неможливо відмовитися. Це документація зв’язку, де буденні поради «поїсти супу» перемішані зі звуками вибухів, а любов до рідного дому межує з фатальним ризиком там залишатися.
          </p>
          <a href="ВСТАВ_СЮДИ_ЛІНК_НА_БАНКУ" target="_blank" rel="noopener noreferrer" className="bg-white text-black h-[82px] w-full flex justify-center items-center text-[25px] font-bold tracking-[-0.04em] no-underline hover:scale-[1.02] transition-transform mt-4">
            Monopay
          </a>
        </div>
        
        <div className="flex w-full" style={{ height: '63px' }}>
          <div className="w-1/2 bg-white text-black flex flex-col justify-center items-center">
             <div className="price-text">666₴</div>
             <div className="label-text">pre-order</div>
          </div>
          <div className="w-1/2 bg-[#ACACAC] text-black flex flex-col justify-center items-center">
             <div className="price-text relative">
                <span className="opacity-40">777₴</span>
                <span className="absolute left-0 top-1/2 w-full h-[2px] bg-black opacity-40 -translate-y-1/2"></span>
             </div>
             <div className="label-text">full price</div>
          </div>
        </div>
      </div>

    </div>
  );
}