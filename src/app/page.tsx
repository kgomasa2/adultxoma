'use client';

import React, { useState, useRef, useEffect } from 'react';

export default function BookPage() {
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(-30);
  const [isDragging, setIsDragging] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    // Ігноруємо кліки на панелі з текстом, дозволяємо тільки на фоні/книзі
    const target = e.target as HTMLElement;
    if (target.closest('.info-panel')) return;

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
    // MAIN CONTAINER:
    // Mobile: flex-col (книжка зверху, текст знизу)
    // Desktop: block (дозволяє absolute positioning для елементів)
    <div className="relative min-h-screen w-full bg-[#FF0000] overflow-x-hidden flex flex-col md:block">
      
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Helvetica+Neue:wght@400;700&display=swap');
        
        body { margin: 0; font-family: 'Helvetica Neue', sans-serif; }
        
        .book-scene {
          perspective: 1500px;
          cursor: grab;
          transform: translate3d(0,0,0); /* GPU trigger */
        }
        .book-scene:active { cursor: grabbing; }
        
        .book {
          transform-style: preserve-3d;
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
          outline: 1px solid transparent; 
        }

        /* --- РОЗМІРИ --- */
        /* Обкладинки */
        .front, .back {
          width: 300px; height: 420px;
        }

        /* ANTI-FLICKER TRICK:
           Зменшуємо висоту/ширину граней "товщини" на 2px (418px замість 420px).
           Це створює мікро-зазор, і грані не "б'ються" одна об одну при рендері. 
        */
        .spine, .right {
          width: 25px; height: 418px; /* <--- 418px */
          top: 1px; /* Центруємо по висоті */
        }
        .top, .bottom {
          width: 298px; /* <--- 298px замість 300px */
          height: 25px; 
          left: 1px; /* Центруємо по ширині */
        }

        /* --- ПОЗИЦІОНУВАННЯ --- */
        /* Z = 12.5px (половина товщини) */
        
        .front {
          transform: rotateY(0deg) translateZ(12.5px);
          background: url('/cover_zine.png') center/cover no-repeat;
        }
        .back {
          transform: rotateY(180deg) translateZ(12.5px);
          background: url('/cover_zine.png') center/cover no-repeat;
        }
        
        .spine {
          transform: rotateY(-90deg) translateZ(12.5px);
          background: #fff;
        }
        
        .right {
          transform: rotateY(90deg) translateZ(287.5px); /* 300 - 12.5 */
          background: repeating-linear-gradient(90deg, #fff, #fff 1px, #e60000 1px, #e60000 2px);
        }

        .top { 
          transform: rotateX(90deg) translateZ(12.5px); 
          /* Важливо: коригуємо top, бо ми змінили висоту на 2px менше */
          top: -12.5px; 
          background: repeating-linear-gradient(0deg, #fff, #fff 1px, #e60000 1px, #e60000 2px);
        }
        
        .bottom { 
          transform: rotateX(-90deg) translateZ(407.5px); /* 420 - 12.5 */
          /* Важливо: коригуємо bottom позицію */
          top: auto; 
          bottom: -12.5px;
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

      {/* --- КНИГА (Спільний елемент) --- */}
      <div 
        className="book-wrapper relative z-0 flex justify-center items-center w-full
                   /* Mobile: велика висота для книги */
                   h-[70vh] 
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
            <div className="face front"></div>
            <div className="face back"></div>
            <div className="face spine"></div>
            <div className="face right"></div>
            <div className="face top"></div>
            <div className="face bottom"></div>
          </div>
        </div>
      </div>

      {/* --- ІНФО ПАНЕЛЬ (Спільний елемент) --- */}
      {/* Mobile: relative (йде в потоці ПІСЛЯ книги)
         Desktop: absolute (прибитий до правого верхнього кута)
      */}
      <div className="info-panel relative w-full bg-[#D9D9D9] flex flex-col z-10 
                      md:absolute md:top-0 md:right-0 md:w-[348px]">
        
        {/* Main Content */}
        <div className="p-[13px] md:p-[15px_18px_15px_14px] md:h-[432px] flex flex-col">
          <h1 className="title-custom font-bold m-0 origin-left scale-x-125 w-[80%] mb-[18px] md:mb-5">
            Зін «Мама»<br />
            Христина Новікова
          </h1>

          {/* Desktop Only: Credits block moved here */}
          <div className="hidden md:block text-base-custom font-bold mb-3">
            Дизайн та верстка: Володимир Хоменко<br />
            Видавництво: IDINAHUI PUBLISHING<br />
            Формат А5, 68 с.<br />
            Київ, 2026
          </div>

          {/* Buttons Block (Mobile: Top priority, Desktop: Bottom priority) */}
          <div className="flex flex-col gap-[5px] mb-[18px] md:mt-auto md:mb-0">
             {/* Monopay Button */}
             <a 
                href="ВСТАВ_СЮДИ_ЛІНК_НА_БАНКУ" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-black w-full h-[82px] flex justify-center items-center text-[25px] font-bold tracking-[-0.04em] no-underline hover:scale-[1.01] transition-transform order-1 md:order-2 md:mt-4"
            >
                Monopay
            </a>
            
            {/* Prices (Mobile: below Monopay. Desktop: OUTSIDE main panel logic below) */}
            {/* На мобільному ціни всередині основного блоку, на десктопі ми їх винесемо візуально через flex order або окремим дівом, але для спрощення лишимо тут адаптив */}
            <div className="flex w-full gap-[5px] md:hidden order-2">
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

          {/* Description */}
          <p className="text-base-custom font-bold mb-[18px] md:mb-auto order-3 md:order-1">
            Цей зін апропріює естетику культової пачки Marlboro Red, перетворюючи хроніку життя в окупації на візуальний об’єкт із попередженням про небезпеку. Червоний колір тривоги тут римується з агресивним брендингом, а очікування повідомлень від мами з Маріуполя (2022–2026) стає метафорою залежності, від якої неможливо відмовитися. Це документація зв’язку, де буденні поради «поїсти супу» перемішані зі звуками вибухів, а любов до рідного дому межує з фатальним ризиком там залишатися.
          </p>

          {/* Mobile Only: Credits */}
          <div className="md:hidden text-base-custom font-bold mb-5 order-4">
            Дизайн та верстка: Володимир Хоменко<br />
            Видавництво: IDINAHUI PUBLISHING<br />
            Формат А5, 68 с.<br />
            Київ, 2026
          </div>
        </div>

        {/* DESKTOP ONLY: Ціни приліплені знизу до плашки */}
        <div className="hidden md:flex w-full h-[63px]">
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