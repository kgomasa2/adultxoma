"use client"; // Важливо: перетворюємо на клієнтський компонент для роботи з камерою

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [streamActive, setStreamActive] = useState(false);

  useEffect(() => {
    // Функція для запуску камери
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: false // Без мікрофону, як ти просив
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setStreamActive(true);
        }
      } catch (err) {
        console.log("Webcam permission denied or error:", err);
      }
    };

    startWebcam();
  }, []);

  return (
    <main className="h-screen w-full bg-white flex justify-center items-center overflow-hidden font-sans py-10">
      
      {/* ЦЕНТРАЛЬНИЙ КОНТЕЙНЕР */}
      <div className="flex w-full max-w-[1400px] h-full gap-[10px] px-4">
        
        {/* === КОЛОНА 1: SHOP === */}
        <div className="w-1/4 h-full flex flex-col shadow-xl bg-white overflow-hidden">
           <div className="h-full overflow-y-auto custom-scrollbar flex flex-col gap-0">
              
              {/* Header + Logo */}
              <div className="bg-xoma-header w-full py-2 text-center sticky top-0 z-10 border-b border-white/20">
                <h1 className="text-black text-[20px] font-bold leading-none">xoma.shop</h1>
              </div>
              <div className="bg-xoma-bg w-full flex justify-center items-center py-4">
                 <div className="w-[220px] aspect-square relative">
                    <Image src="/logo.png" alt="xoma logo" fill className="object-contain" />
                 </div>
              </div>

              {/* Free Items */}
              <div className="bg-xoma-header w-full py-2 text-center sticky top-0 z-10 border-t border-white/20">
                 <h2 className="text-black text-[20px] font-bold leading-none">Free Items</h2>
              </div>
              <div className="bg-xoma-bg flex flex-col items-center gap-8 px-4 py-8 min-h-full">
                
                {/* Item 1 */}
                <Link href="/soul-trade" className="flex flex-col items-center gap-2 w-full hover:opacity-80 transition-opacity">
                  <div className="w-full aspect-[443/590] relative shadow-sm">
                    <Image src="/mock6 done 1-2.png" alt="Soul-Trade" fill className="object-cover" />
                  </div>
                  <p className="text-xoma-blue text-[14px] font-bold text-center leading-tight">Soul-Trade Mockup Pack I</p>
                </Link>

                {/* Item 2 */}
                <Link href="/kunstkammer" className="flex flex-col items-center gap-2 w-full hover:opacity-80 transition-opacity">
                  <div className="w-full aspect-[481/285] relative shadow-sm">
                    <Image src="/Screenshot 2025-12-02 at 00.47.26 1-1.png" alt="Kunstkammer" fill className="object-cover" />
                  </div>
                  <p className="text-xoma-blue text-[14px] font-bold text-center leading-tight">Kunstkammer Typeface</p>
                </Link>
                 
                 {/* Item 3 */}
                 <Link href="/lava-generator" className="flex flex-col items-center gap-2 w-full hover:opacity-80 transition-opacity">
                  <div className="w-full aspect-[414/457] relative shadow-sm">
                    <Image src="/Screenshot 2025-12-02 at 00.51.44 1.png" alt="Lava Generator" fill className="object-cover" />
                  </div>
                  <p className="text-xoma-blue text-[14px] font-bold text-center leading-tight">Lava Generator Tool</p>
                </Link>

                 {/* Item 4 */}
                 <Link href="/3d-gallery" className="flex flex-col items-center gap-2 w-full hover:opacity-80 transition-opacity">
                  <div className="w-full aspect-[444/270] relative shadow-sm">
                    <Image src="/Screenshot 2025-12-02 at 00.57.09 1.png" alt="3d Gallery" fill className="object-cover" />
                  </div>
                  <p className="text-xoma-blue text-[14px] font-bold text-center leading-tight">3d Gallery Tool</p>
                </Link>
              </div>
           </div>
        </div>

        {/* === КОЛОНА 2: NEWS === */}
        <div className="w-1/4 h-full flex flex-col shadow-xl bg-white overflow-hidden">
           <div className="h-full overflow-y-auto custom-scrollbar flex flex-col gap-0 bg-xoma-bg">
               <div className="bg-xoma-purple w-full py-2 text-center sticky top-0 z-10">
                  <h2 className="text-black text-[20px] font-bold leading-none">News</h2>
               </div>

               <div className="p-5 flex flex-col gap-6">
                  
                  {/* Featured News */}
                  <Link href="/news-pommern" className="flex flex-col gap-3 w-full border-b border-gray-300 pb-6 hover:opacity-80 transition-opacity">
                      <div className="w-full aspect-video bg-gray-400 relative shadow-sm">
                         <Image src="/image 1.png" alt="featured news" fill className="object-cover" /> 
                      </div>
                      <div className="flex flex-col gap-1">
                          <h3 className="text-black text-[16px] font-bold leading-tight">
                             SMS Pommern: The Lost Giant
                          </h3>
                          <p className="text-black text-[13px] leading-snug">
                             A Deutschland-class pre-dreadnought battleship built for the Imperial German Navy.
                          </p>
                          <span className="text-gray-500 text-[11px] mt-1">02/12 22:23</span>
                      </div>
                  </Link>

                  {/* Standard News */}
                  <Link href="/news-exhibition" className="flex gap-3 items-start hover:opacity-70 transition-opacity">
                      <div className="w-[80px] h-[60px] bg-gray-400 shrink-0 relative shadow-sm">
                          <Image src="/image 128.png" alt="news" fill className="object-cover" />
                      </div>
                      <div className="flex flex-col">
                          <p className="text-black text-[12px] leading-tight">
                             <span className="font-bold">New Exhibition</span> starting soon in Kyiv. Don't miss the chance...
                          </p>
                          <span className="text-gray-500 text-[10px] mt-1">02/12 22:23</span>
                      </div>
                  </Link>

                  {/* Other News */}
                  {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex gap-3 items-start opacity-70">
                        <div className="w-[80px] h-[60px] bg-gray-400 shrink-0 relative shadow-sm">
                            <Image src="/mock6 done 1.png" alt="news" fill className="object-cover" />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-black text-[12px] leading-tight">
                               <span className="font-bold">Update {i}</span>. The archive has been updated with new materials from 2024.
                            </p>
                            <span className="text-gray-500 text-[10px] mt-1">01/12 10:00</span>
                        </div>
                    </div>
                   ))}
               </div>
           </div>
        </div>

        {/* === КОЛОНА 3: PROJECTS === */}
        <div className="w-1/4 h-full flex flex-col shadow-xl bg-white overflow-hidden">
           <div className="h-full overflow-y-auto custom-scrollbar flex flex-col gap-0">
              <div className="bg-xoma-header w-full py-2 text-center sticky top-0 z-10">
                 <h2 className="text-black text-[20px] font-bold leading-none">Projects</h2>
              </div>
              <div className="bg-xoma-bg flex flex-col items-center gap-8 px-4 py-8 min-h-full">
                 
                 {/* Projects Links */}
                 <Link href="/solar-wind" className="flex flex-col items-center gap-2 w-full hover:opacity-80 transition-opacity">
                  <div className="w-full aspect-[443/590] relative shadow-sm">
                    <Image src="/mock6 done 1.png" alt="Solar Wind" fill className="object-cover" />
                  </div>
                  <p className="text-xoma-blue text-[14px] font-bold text-center leading-tight">“Solar Wind” Khomenko x Shmurak</p>
                </Link>

                 <Link href="/plural-bodies" className="flex flex-col items-center gap-2 w-full hover:opacity-80 transition-opacity">
                  <div className="w-full aspect-[481/285] relative shadow-sm">
                    <Image src="/Screenshot 2025-12-02 at 00.47.26 1.png" alt="Plural Bodies" fill className="object-cover" />
                  </div>
                  <p className="text-xoma-blue text-[14px] font-bold text-center leading-tight">“Plural Bodies” Khomenko x Shmurak</p>
                </Link>

                 <Link href="/idi-nahui" className="flex flex-col items-center gap-2 w-full hover:opacity-80 transition-opacity">
                  <div className="w-full aspect-[374/412] relative shadow-sm">
                    <Image src="/image 128.png" alt="Idi Nahui" fill className="object-cover" />
                  </div>
                  <p className="text-xoma-blue text-[14px] font-bold text-center leading-tight">Артпроєкт “Іді Нахуй”</p>
                </Link>

                 <Link href="/independent-artist" className="flex flex-col items-center gap-2 w-full hover:opacity-80 transition-opacity">
                  <div className="w-full aspect-[473/314] relative shadow-sm">
                     <Image src="/IMG_3790 1.png" alt="Artist" fill className="object-cover" />
                  </div>
                  <p className="text-xoma-blue text-[14px] font-bold text-center leading-tight">“Independent Multidisciplinary Artist”</p>
                </Link>

                 <Link href="/machine" className="flex flex-col items-center gap-2 w-full hover:opacity-80 transition-opacity">
                  <div className="w-full aspect-[362/540] relative shadow-sm">
                    <Image src="/image 1.png" alt="Machine" fill className="object-cover" />
                  </div>
                  <p className="text-xoma-blue text-[14px] font-bold text-center leading-tight">“Машина Надлишкової Насолоди”</p>
                </Link>
              </div>
           </div>
        </div>

        {/* === КОЛОНА 4: ABOUT (з Веб-камерою) === */}
        <div className="w-1/4 h-full flex flex-col shadow-xl bg-white overflow-hidden">
           <div className="h-full overflow-y-auto custom-scrollbar flex flex-col gap-0 bg-xoma-bg">
               <div className="bg-xoma-green w-full py-2 text-center sticky top-0 z-10">
                  <h2 className="text-black text-[20px] font-bold leading-none">About</h2>
               </div>
               
               <div className="flex flex-col items-center p-6 gap-6 w-full">
                    {/* Фото */}
                    <div className="w-full aspect-square bg-red-600 relative">
                        <Image src="/mock6 done 1-1.png" alt="me" fill className="object-cover mix-blend-multiply" />
                        <div className="absolute inset-0 bg-red-600 mix-blend-multiply opacity-90"></div>
                    </div>

                    {/* Інфо */}
                    <div className="text-center w-full">
                        <h3 className="text-xoma-blue text-[16px] font-bold mb-4">Volodymyr Khomenko</h3>
                        <div className="flex flex-col gap-3 text-left text-[13px]">
                            <div className="flex gap-2"><span className="w-[90px] shrink-0 font-bold">Повне імʼя</span><span>Володимир Хоменко</span></div>
                            <div className="flex gap-2"><span className="w-[90px] shrink-0 font-bold">Народження</span><span>10 липня 1999<br/>Коростень, Україна</span></div>
                            <div className="flex gap-2"><span className="w-[90px] shrink-0 font-bold">Жанр</span><span>візуальне мистецтво</span></div>
                            <div className="flex gap-2"><span className="w-[90px] shrink-0 font-bold">Стиль</span><span>маргінальний гламур</span></div>
                            <div className="flex gap-2"><span className="w-[90px] shrink-0 font-bold">Імейл</span><span>xomashop@gmail.com</span></div>
                        </div>
                    </div>

                    {/* === WEBCAM STREAM === */}
                    <div className="w-full mt-4 bg-black aspect-video relative shadow-inner overflow-hidden border border-gray-400">
                        {!streamActive && (
                            <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xs">
                                Connecting...
                            </div>
                        )}
                        <video 
                            ref={videoRef}
                            autoPlay 
                            playsInline 
                            muted 
                            className="w-full h-full object-cover transform scale-x-[-1]" // scale-x-[-1] робить дзеркальне відображення
                        />
                        {/* Індикатор запису */}
                        <div className="absolute top-2 left-2 flex items-center gap-1 bg-red-600/80 px-2 py-0.5 rounded-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                            <span className="text-[9px] font-bold text-white tracking-widest">LIVE</span>
                        </div>
                    </div>

               </div>
           </div>
        </div>

      </div>
    </main>
  );
}