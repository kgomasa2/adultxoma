import React from 'react';

export default function BookPage() {
  return (
    <div className="min-h-screen bg-[#FF0000] font-sans text-black overflow-x-hidden flex flex-col lg:flex-row justify-center items-center gap-12 p-5">
      {/* Стилі для анімації та 3D, які Tailwind не покриває повністю */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes rotateBook {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        .book-scene {
          perspective: 1500px;
        }
        .book {
          transform-style: preserve-3d;
          transform: rotateY(-30deg);
          animation: rotateBook 15s infinite linear;
        }
        .book:hover {
          animation-play-state: paused;
        }
        .face {
          position: absolute;
          backface-visibility: visible;
        }
        /* ОБКЛАДИНКИ З КАРТИНКОЮ */
        .front {
          transform: translateZ(25px);
          background: url('/cover_zine.png') center/cover no-repeat;
          box-shadow: -5px 5px 20px rgba(0,0,0,0.3);
        }
        .back {
          transform: rotateY(180deg) translateZ(25px);
          background: url('/cover_zine.png') center/cover no-repeat;
          box-shadow: 5px 5px 20px rgba(0,0,0,0.3);
        }
        /* ІНШІ ГРАНІ */
        .spine {
          transform: rotateY(-90deg) translateZ(25px);
        }
        .right {
          transform: rotateY(90deg) translateZ(275px);
        }
        .top { transform: rotateX(90deg) translateZ(25px); }
        .bottom { transform: rotateX(-90deg) translateZ(395px); }
      `}} />

      {/* 3D КНИГА */}
      <div className="book-scene w-[300px] h-[420px] flex-shrink-0 scale-90 lg:scale-100">
        <div className="book w-full h-full relative">
          
          {/* Передня частина (Картинка) */}
          <div className="face front w-[300px] h-[420px] bg-white"></div>

          {/* Задня частина (Картинка) */}
          <div className="face back w-[300px] h-[420px] bg-white"></div>

          {/* Корінець */}
          <div className="face spine w-[50px] h-[420px] bg-white flex justify-center items-center border-l border-r border-gray-300">
            <span className="writing-vertical rotate-180 font-bold text-sm tracking-widest block" style={{ writingMode: 'vertical-rl' }}>
              MAMA — ZINE 2026
            </span>
          </div>

          {/* Сторінки (текстура) */}
          <div className="face right w-[50px] h-[420px] bg-[repeating-linear-gradient(90deg,#fff,#f0f0f0_2px,#fff_4px)]"></div>
          
          {/* Верх і низ */}
          <div className="face top w-[300px] h-[50px] bg-white"></div>
          <div className="face bottom w-[300px] h-[50px] bg-white"></div>
        </div>
      </div>

      {/* ТЕКСТОВИЙ БЛОК */}
      <div className="bg-[#D9D9D9] w-full max-w-[400px] p-8 md:p-10 shadow-xl flex flex-col gap-5 relative z-10">
        <h1 className="text-3xl md:text-4xl font-black leading-none m-0 origin-left scale-x-125 w-[80%]">
          Зін «Мама»<br />
          Христина Новікова
        </h1>

        <div className="text-sm font-bold leading-snug mt-2">
          Дизайн та верстка: Володимир Хоменко<br />
          Видавництво: IDINAHUI PUBLISHING<br />
          Формат А5, 68 с.<br />
          Київ, 2026
        </div>

        <p className="text-sm md:text-base leading-tight tracking-tight">
          Цей зін апропріює естетику культової пачки Marlboro Red, перетворюючи хроніку життя в окупації на візуальний об’єкт із попередженням про небезпеку. Червоний колір тривоги тут римується з агресивним брендингом, а очікування повідомлень від мами з Маріуполя (2022–2026) стає метафорою залежності, від якої неможливо відмовитися. Це документація зв’язку, де буденні поради «поїсти супу» перемішані зі звуками вибухів, а любов до рідного дому межує з фатальним ризиком там залишатися.
        </p>

        {/* КНОПКА MONOPAY */}
        <a 
          href="ВСТАВ_СЮДИ_ЛІНК_НА_БАНКУ" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white text-black p-4 text-center text-xl md:text-2xl font-bold border-2 border-transparent hover:border-black hover:scale-[1.02] transition-all cursor-pointer block no-underline mt-2"
        >
          Monopay
        </a>
      </div>
    </div>
  );
}