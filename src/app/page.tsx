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

    setRotY((prev) => prev + deltaX * 0.5);
    setRotX((prev) => Math.max(-45, Math.min(45, prev - deltaY * 0.5)));

    lastMousePos.current = { x: clientX, y: clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // --- Авто-крутіння ---
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
    <div className="relative min-h-screen w-full bg-[#FF0000] overflow-hidden">
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Helvetica+Neue:wght@400;700&display=swap');
        
        body { margin: 0; font-family: 'Helvetica Neue', sans-serif; }
        
        .book-scene {
          perspective: 1500px;
          cursor: grab;
          transform: scale(1.16); /* Збільшено на 16% */
        }
        .book-scene:active {
          cursor: grabbing;
        }
        .book {
          transform-style: preserve-3d;
        }
        .face {
          position: absolute;
          backface-visibility: visible;
        }

        /* --- РОЗМІРИ КНИГИ (товщина 25px) --- */
        
        /* ОБКЛАДИНКИ */
        .front {
          transform: translateZ(12.5px);
          background: url('/cover_zine.png') center/cover no-repeat;
        }
        .back {
          transform: rotateY(180deg) translateZ(12.5px);
          background: url('/cover_zine.png') center/cover no-repeat;
        }
        
        /* КОРІНЕЦЬ (білий) */
        .spine {
          width: 25px;
          transform: rotateY(-90deg) translateZ(12.5px);
          background: #fff;
        }
        
        /* БІЧНИЙ ЗРІЗ (смужки вертикальні) */
        .right {
          width: 25px;
          transform: rotateY(90deg) translateZ(287.5px);
          /* Градієнт 90deg створює вертикальні лінії вздовж висоти */
          background: repeating-linear-gradient(90deg, #fff, #fff 1px, #e60000 1px, #e60000 2px);
        }
        
        /* ВЕРХНІЙ І НИЖНІЙ ЗРІЗ (смужки горизонтальні вздовж товщини) */
        .top { 
          height: 25px;
          transform: rotateX(90deg) translateZ(12.5px); 
          /* Градієнт 0deg створює лінії, що йдуть вздовж довгої сторони (паралельно обкладинці) */
          background: repeating-linear-gradient(0deg, #fff, #fff 1px, #e60000 1px, #e60000 2px);
        }
        .bottom { 
          height: 25px;
          transform: rotateX(-90deg) translateZ(395px);
          background: repeating-linear-gradient(0deg, #fff, #fff 1px, #e60000 1px, #e60000 2px);
        }

        /* --- ТИПОГРАФІКА --- */
        .text-base-custom {
          font-size: 13px;
          line-height: 109.9%;
          letter-spacing: -0.04em;
        }
        .title-custom {
          font-size: 26px;
          line-height: 109.9%;
          letter-spacing: -0.04em;
        }
        
        /* Стилі для цін */
        .price-text {
          font-size: 23px;
          font-weight: bold;
          line-height: 1;
          transform: scaleX(1.25); /* Розтягування тексту як у заголовку */
          transform-origin: center;
        }
        .label-text {
          font-size: 13px;
          letter-spacing: -0.04em;
          font-weight: bold;
          line-height: 1;
          margin-top: 4px; /* Невеликий відступ від ціни */
        }
      `}</style>

      {/* 3D КНИГА */}
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

      {/* ПРАВА КОЛОНКА (Фіксована ширина 348px) */}
      <div className="absolute top-0 right-0 flex flex-col z-10 w-[348px]">
        
        {/* ОСНОВНА ПАНЕЛЬ */}
        <div 
          className="bg-[#D9D9D9] text-black flex flex-col relative"
          style={{
            height: '432px',
            padding: '15px 18px 15px 14px'
          }}
        >
          <h1 className="title-custom font-bold m-0 origin-left scale-x-125 w-[80%] mb-5 leading-[1.1]">
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

          <a 
            href="ВСТАВ_СЮДИ_ЛІНК_НА_БАНКУ" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white text-black h-[82px] w-full flex justify-center items-center text-[25px] font-bold tracking-[-0.04em] no-underline hover:scale-[1.02] transition-transform mt-4"
          >
            Monopay
          </a>
        </div>

        {/* БЛОК ЦІН (Знизу) - Висота ~63px */}
        <div className="flex w-full" style={{ height: '63px' }}>
          {/* Pre-order (White) */}
          <div className="w-1/2 bg-white text-black flex flex-col justify-center items-center">
             <div className="price-text">666₴</div>
             <div className="label-text">pre-order</div>
          </div>
          
          {/* Full price (Grey) */}
          <div className="w-1/2 bg-[#ACACAC] text-black flex flex-col justify-center items-center">
             <div className="price-text relative">
                <span className="opacity-40">777₴</span>
                {/* Лінія перекреслення */}
                <span className="absolute left-0 top-1/2 w-full h-[2px] bg-black opacity-40 -translate-y-1/2"></span>
             </div>
             <div className="label-text">full price</div>
          </div>
        </div>

      </div>
    </div>
  );
}