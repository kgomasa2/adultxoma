'use client';

import React, { useState, useRef, useEffect } from 'react';

export default function BookPage() {
  // --- Логіка крутіння (З твоєї стабільної версії) ---
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(-30);
  const [isDragging, setIsDragging] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    // Блокуємо крутіння, якщо клікаємо по інтерфейсу, а не по червоному фону
    const target = e.target as HTMLElement;
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

    setRotY((prev) => prev + deltaX * 0.5);
    setRotX((prev) => Math.max(-45, Math.min(45, prev - deltaY * 0.5)));

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
    <div className="relative min-h-screen w-full bg-[#FF0000] overflow-x-hidden flex flex-col md:block">
      
      {/* CSS (Використовуємо dangerouslySetInnerHTML для Vercel) */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Helvetica+Neue:wght@400;700&display=swap');
        
        body { margin: 0; font-family: 'Helvetica Neue', sans-serif; }
        
        .book-scene {
          perspective: 1500px;
          cursor: grab;
          /* Стандартний scale */
        }
        .book-scene:active {
          cursor: grabbing;
        }
        .book {
          transform-style: preserve-3d;
          position: relative;
          width: 100%;
          height: 100%;
        }
        .face {
          position: absolute;
          backface-visibility: visible; /* Як у твоїй робочій версії */
        }

        /* Front & Back */
        .front {
          transform: translateZ(12.5px);
          background: url('/cover_zine.png') center/cover no-repeat;
        }
        .back {
          transform: rotateY(180deg) translateZ(12.5px);
          background: url('/cover_zine.png') center/cover no-repeat;
        }
        
        /* Spine */
        .spine {
          width: 25px;
          transform: rotateY(-90deg) translateZ(12.5px);
          background: #fff;
        }
        
        /* Pages Texture */
        .right {
          width: 25px;
          transform: rotateY(90deg) translateZ(287.5px);
          background: repeating-linear-gradient(90deg, #fff, #fff 1px, #e60000 1px, #e60000 2px);
        }
        .top { 
          height: 25px;
          top: 0;
          transform: rotateX(90deg) translateZ(12.5px); 
          background: repeating-linear-gradient(0deg, #fff, #fff 1px, #e60000 1px, #e60000 2px);
        }
        .bottom { 
          height: 25px;
          bottom: 0; 
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

      {/* --- КНИГА (Спільна) --- */}
      <div 
        className="book-wrapper 
                   relative z-0 flex justify-center items-center w-full
                   /* Mobile: висота 65% екрану, щоб текст був знизу */
                   h-[65vh] 
                   /* Desktop: абсолютне позиціонування по центру */
                   md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[300px] md:h-[420px] md:h-auto"
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div className="book-scene w-[300px] h-[420px] scale-[1.1] md:scale-[1.16]">
          <div 
            className="book"
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
      </div>

      {/* ========================================= */}
      {/* MOBILE LAYOUT (< 768px) */}
      {/* ========================================= */}
      {/* Цей блок йде ПІСЛЯ блоку книги в потоці (flex-col), тому він буде знизу, а не поверх */}
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


      {/* ========================================= */}
      {/* DESKTOP LAYOUT (>= 768px) */}
      {/* ========================================= */}
      {/* Абсолютне позиціонування, як було раніше */}
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