'use client';

import React, { useState, useRef, useEffect } from 'react';

export default function BookPage() {
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(-30);
  const [isDragging, setIsDragging] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    const target = e.target as HTMLElement;
    // Блокуємо обертання при кліку на інтерфейс
    if (target.closest('.mobile-panel') || target.closest('.desktop-panel')) return;

    setIsDragging(true);
    const clientX = 'touches' in e ? (e as React.TouchEvent).touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? (e as React.TouchEvent).touches[0].clientY : (e as React.MouseEvent).clientY;
    lastMousePos.current = { x: clientX, y: clientY };
  };

  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    
    // @ts-ignore
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    // @ts-ignore
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const deltaX = clientX - lastMousePos.current.x;
    const deltaY = clientY - lastMousePos.current.y;

    setRotY((prev) => prev + deltaX * 0.4);
    setRotX((prev) => Math.max(-60, Math.min(60, prev - deltaY * 0.4)));

    lastMousePos.current = { x: clientX, y: clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    let animationFrameId: number;
    const animate = () => {
      if (!isDragging) {
        setRotY(prev => prev + 0.15); 
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

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
    <div className="relative min-h-[100dvh] w-full bg-[#FF0000] flex flex-col md:block">
      
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Helvetica+Neue:wght@400;700&display=swap');
        
        body { 
            margin: 0; 
            font-family: 'Helvetica Neue', sans-serif;
            background-color: #FF0000;
            overflow-x: hidden; /* Важливо для мобілки */
        }
        
        .book-wrapper {
            -webkit-tap-highlight-color: transparent;
            touch-action: none; 
        }

        .book-scene {
          perspective: 1200px;
          cursor: grab;
          transform: translateZ(0); /* Вмикає GPU */
        }
        
        .book-scene:active {
          cursor: grabbing;
        }
        
        .book {
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d;
          position: relative;
          width: 100%;
          height: 100%;
          will-change: transform; 
        }

        .face {
          position: absolute;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden; 
          background-color: #fff;
          
          /* Цей хак краще для iOS ніж box-shadow, прибирає "зубчики" */
          outline: 1px solid transparent; 
          
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d;
        }

        /* Front & Back */
        .front {
          width: 300px; height: 420px;
          transform: rotateY(0deg) translateZ(12.5px);
          background: url('/cover_zine.png') center/cover no-repeat;
          image-rendering: -webkit-optimize-contrast;
        }
        .back {
          width: 300px; height: 420px;
          transform: rotateY(180deg) translateZ(12.5px);
          background: url('/cover_zine.png') center/cover no-repeat;
        }
        
        /* Spine (Корінець) - трохи зменшуємо ширину на 0.5px щоб уникнути накладання */
        .spine {
          width: 24px; height: 420px; 
          left: 1px; /* Центруємо через зменшення */
          transform: rotateY(-90deg) translateZ(12.5px);
          background: #fff;
        }
        
        /* Right (Торцева сторона) */
        .right {
          width: 24px; height: 420px;
          left: 1px;
          transform: rotateY(90deg) translateZ(287.5px); 
          background: repeating-linear-gradient(90deg, #fff, #fff 1px, #e60000 1px, #e60000 2px);
        }

        /* Top & Bottom - теж трохи вужчі */
        .top { 
          width: 300px; height: 24px;
          top: 1px;
          transform: rotateX(90deg) translateZ(12.5px); 
          background: repeating-linear-gradient(0deg, #fff, #fff 1px, #e60000 1px, #e60000 2px);
        }
        .bottom { 
          width: 300px; height: 24px;
          bottom: 1px;
          transform: rotateX(-90deg) translateZ(12.5px);
          background: repeating-linear-gradient(0deg, #fff, #fff 1px, #e60000 1px, #e60000 2px);
        }

        /* Typography */
        .text-base-custom {
          font-size: 13px;
          line-height: 103%;
          letter-spacing: -0.04em;
        }
        .title-custom {
          font-size: 26px;
          line-height: 103%;
          letter-spacing: -0.04em;
        }
        .price-text {
          font-size: 23px;
          font-weight: bold;
          line-height: 1;
          transform: scaleX(1.25);
          transform-origin: center;
        }
        .label-text {
          font-size: 13px;
          letter-spacing: -0.04em;
          font-weight: bold;
          line-height: 1;
          margin-top: 4px;
        }
      `}} />

      {/* --- КНИГА --- */}
      <div 
        className="book-wrapper 
                   relative z-0 flex justify-center items-center w-full
                   h-[55vh] flex-shrink-0
                   md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[300px] md:h-[420px] md:h-auto"
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {/* DESKTOP SCALE ЗБІЛЬШЕНО: md:scale-[1.35] */}
        <div className="book-scene w-[300px] h-[420px] scale-[0.9] md:scale-[1.35]">
          <div 
            className="book"
            style={{ transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)` }}
          >
            <div className="face front"></div>
            <div className="face back"></div>
            <div className="face spine"></div>
            <div className="face right"></div>
            <div className="face top"></div>
            <div className="face bottom"></div>
          </div>
        </div>
      </div>

      {/* --- MOBILE PANEL --- */}
      {/* Додано pb-20 для безпечного скролу внизу */}
      <div className="mobile-panel md:hidden relative w-full bg-[#D9D9D9] p-[13px] pb-24 flex flex-col z-10 min-h-min">
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


      {/* --- DESKTOP PANEL --- */}
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