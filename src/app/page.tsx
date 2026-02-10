'use client';

import React, { useState, useRef, useEffect } from 'react';

export default function BookPage() {
  // --- Стан для крутіння (авто + ручне) ---
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(-30);
  const [isDragging, setIsDragging] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // --- Обробники подій для ручного крутіння ---
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    lastMousePos.current = { x: clientX, y: clientY };
  };

  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const deltaX = clientX - lastMousePos.current.x;
    const deltaY = clientY - lastMousePos.current.y;

    setRotY((prev) => prev + deltaX * 0.5); // Крутіння по горизонталі
    setRotX((prev) => Math.max(-45, Math.min(45, prev - deltaY * 0.5))); // Крутіння по вертикалі (з обмеженням)

    lastMousePos.current = { x: clientX, y: clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // --- Авто-крутіння ---
  useEffect(() => {
    let animationFrameId: number;
    const animate = () => {
      // Крутимо автоматично тільки якщо не тягнемо мишкою
      if (!isDragging) {
        setRotY(prev => prev + 0.15); 
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Підписуємось на глобальні події руху миші
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleMouseMove, { passive: false });
    window.addEventListener('touchend', handleMouseUp);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);


  return (
    // Головний контейнер relative для абсолютного позиціонування елементів
    <div className="relative min-h-screen w-full bg-[#FF0000] overflow-hidden">
      
      {/* Глобальні стилі для книги та шрифтів */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Helvetica+Neue:wght@400;700&display=swap');
        
        body { margin: 0; font-family: 'Helvetica Neue', sans-serif; }
        
        .book-scene {
          perspective: 1500px;
          cursor: grab;
        }
        .book-scene:active {
          cursor: grabbing;
        }
        .book {
          transform-style: preserve-3d;
          /* Тінь під книжкою прибрано */
        }
        .face {
          position: absolute;
          backface-visibility: visible;
        }

        /* --- НОВІ РОЗМІРИ (товщина 25px замість 50px) --- */
        /* Z-зсув = половина товщини = 12.5px */

        /* ОБКЛАДИНКИ */
        .front {
          transform: translateZ(12.5px);
          background: url('/cover_zine.png') center/cover no-repeat;
          /* Тінь на самій обкладинці прибрано */
        }
        .back {
          transform: rotateY(180deg) translateZ(12.5px);
          background: url('/cover_zine.png') center/cover no-repeat;
           /* Тінь прибрано */
        }
        /* КОРІНЕЦЬ (білий, без тексту) */
        .spine {
          width: 25px;
          transform: rotateY(-90deg) translateZ(12.5px);
          background: #fff;
        }
        /* СТОРІНКИ ЗБОКУ (червоно-біла текстура) */
        .right {
          width: 25px;
          transform: rotateY(90deg) translateZ(287.5px); /* Ширина 300 - Z-зсув 12.5 */
          background: repeating-linear-gradient(90deg, #fff, #fff 1px, #e60000 1px, #e60000 2px);
        }
        /* ВЕРХ І НИЗ */
        .top { 
          height: 25px;
          transform: rotateX(90deg) translateZ(12.5px); 
          background: #fff;
        }
        .bottom { 
          height: 25px;
          transform: rotateX(-90deg) translateZ(395px); /* Висота 420 - товщина 25 */
          background: #fff;
        }

        /* --- ТИПОГРАФІКА --- */
        .text-base-custom {
          font-size: 13px;
          line-height: 109.9%;
          letter-spacing: -0.04em; /* ≈ -4% */
        }
        .title-custom {
          font-size: 26px;
          line-height: 109.9%;
          letter-spacing: -0.04em;
        }
      `}</style>

      {/* 3D КНИГА (По центру) */}
      <div 
        className="book-scene absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[420px] z-0"
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div 
          className="book w-full h-full relative transition-transform duration-100 ease-out"
          style={{ transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)` }}
        >
          <div className="face front w-[300px] h-[420px]"></div>
          <div className="face back w-[300px] h-[420px]"></div>
          <div className="face spine h-[420px]"></div>
          <div className="face right h-[420px]"></div>
          <div className="face top w-[300px]"></div>
          <div className="face bottom w-[300px]"></div>
        </div>
      </div>

      {/* ПЛАШКА З ТЕКСТОМ (Правий верхній кут) */}
      <div 
        className="absolute top-0 right-0 bg-[#D9D9D9] text-black z-10 flex flex-col"
        style={{
          width: '348px',
          height: '432px',
          padding: '18px 18px 14px 14px'
        }}
      >
        {/* Заголовок */}
        <h1 className="title-custom font-bold m-0 origin-left scale-x-125 w-[80%] mb-5 leading-[1.1]">
          Зін «Мама»<br />
          Христина Новікова
        </h1>

        {/* Мета-інфо */}
        <div className="text-base-custom font-bold mb-3">
          Дизайн та верстка: Володимир Хоменко<br />
          Видавництво: IDINAHUI PUBLISHING<br />
          Формат А5, 68 с.<br />
          Київ, 2026
        </div>

        {/* Опис */}
        <p className="text-base-custom font-bold mb-auto">
          Цей зін апропріює естетику культової пачки Marlboro Red, перетворюючи хроніку життя в окупації на візуальний об’єкт із попередженням про небезпеку. Червоний колір тривоги тут римується з агресивним брендингом, а очікування повідомлень від мами з Маріуполя (2022–2026) стає метафорою залежності, від якої неможливо відмовитися. Це документація зв’язку, де буденні поради «поїсти супу» перемішані зі звуками вибухів, а любов до рідного дому межує з фатальним ризиком там залишатися.
        </p>

        {/* Кнопка Monopay */}
        <a 
          href="ВСТАВ_СЮДИ_ЛІНК_НА_БАНКУ" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white text-black h-[82px] w-full flex justify-center items-center text-[25px] font-bold tracking-[-0.04em] no-underline hover:scale-[1.02] transition-transform mt-4"
        >
          Monopay
        </a>
      </div>
    </div>
  );
}