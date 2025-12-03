import Image from "next/image";

export default function Home() {
  return (
    // MAIN:
    // Mobile: h-auto min-h-screen (розтягується вниз), overflow-y-auto (скрол сторінки)
    // Desktop (lg:): h-screen (фіксований), overflow-hidden (без скролу сторінки)
    <main className="h-auto min-h-screen lg:h-screen w-full bg-white flex justify-center lg:items-center font-sans py-4 lg:py-10 overflow-y-auto lg:overflow-hidden">
      
      {/* КОНТЕЙНЕР:
          Mobile: flex-col (вертикально), h-auto (висота по контенту), gap-8 (відступи між блоками)
          Desktop (lg:): flex-row (горизонтально), h-full (фіксована висота), gap-[10px]
      */}
      <div className="flex flex-col lg:flex-row w-full max-w-[1400px] h-auto lg:h-full gap-8 lg:gap-[10px] px-4">
        
        {/* === БЛОК 1: SHOP === */}
        {/* Mobile: w-full (на всю ширину), h-auto (висота по контенту)
            Desktop: w-1/4 (чверть), h-full (фікс) */}
        <div className="w-full lg:w-1/4 h-auto lg:h-full flex flex-col shadow-xl bg-white overflow-hidden shrink-0">
           {/* Внутрішній скрол тільки для Desktop (lg:overflow-y-auto) */}
           <div className="h-auto lg:h-full lg:overflow-y-auto custom-scrollbar flex flex-col gap-0">
              
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
              <div className="bg-xoma-bg flex flex-col items-center gap-8 px-4 py-8">
                {/* Item 1 */}
                <div className="flex flex-col items-center gap-2 w-full">
                  <div className="w-full aspect-[443/590] relative shadow-sm">
                    <Image src="/mock6 done 1-2.png" alt="Soul-Trade" fill className="object-cover" />
                  </div>
                  <p className="text-xoma-blue text-[14px] font-bold text-center leading-tight">Soul-Trade Mockup Pack I</p>
                </div>
                {/* Item 2 */}
                <div className="flex flex-col items-center gap-2 w-full">
                  <div className="w-full aspect-[481/285] relative shadow-sm">
                    <Image src="/Screenshot 2025-12-02 at 00.47.26 1-1.png" alt="Kunstkammer" fill className="object-cover" />
                  </div>
                  <p className="text-xoma-blue text-[14px] font-bold text-center leading-tight">Kunstkammer Typeface</p>
                </div>
                 {/* Item 3 */}
                 <div className="flex flex-col items-center gap-2 w-full">
                  <div className="w-full aspect-[414/457] relative shadow-sm">
                    <Image src="/Screenshot 2025-12-02 at 00.51.44 1.png" alt="Lava Generator" fill className="object-cover" />
                  </div>
                  <p className="text-xoma-blue text-[14px] font-bold text-center leading-tight">Lava Generator Tool</p>
                </div>
              </div>
           </div>
        </div>

        {/* === БЛОК 2: NEWS === */}
        <div className="w-full lg:w-1/4 h-auto lg:h-full flex flex-col shadow-xl bg-white overflow-hidden shrink-0">
           <div className="h-auto lg:h-full lg:overflow-y-auto custom-scrollbar flex flex-col gap-0 bg-xoma-bg">
               <div className="bg-xoma-purple w-full py-2 text-center sticky top-0 z-10">
                  <h2 className="text-black text-[20px] font-bold leading-none">News</h2>
               </div>

               <div className="p-5 flex flex-col gap-6">
                  {/* Featured News */}
                  <div className="flex flex-col gap-3 w-full border-b border-gray-300 pb-6">
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
                  </div>

                  {/* Standard News */}
                  <div className="flex gap-3 items-start">
                      <div className="w-[80px] h-[60px] bg-gray-400 shrink-0 relative shadow-sm">
                          <Image src="/image 128.png" alt="news" fill className="object-cover" />
                      </div>
                      <div className="flex flex-col">
                          <p className="text-black text-[12px] leading-tight">
                             <span className="font-bold">New Exhibition</span> starting soon in Kyiv. Don't miss the chance...
                          </p>
                          <span className="text-gray-500 text-[10px] mt-1">02/12 22:23</span>
                      </div>
                  </div>

                  {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <div className="w-[80px] h-[60px] bg-gray-400 shrink-0 relative shadow-sm">
                            <Image src="/mock6 done 1.png" alt="news" fill className="object-cover" />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-black text-[12px] leading-tight">
                               <span className="font-bold">Update {i}</span>. The archive has been updated with new materials.
                            </p>
                            <span className="text-gray-500 text-[10px] mt-1">01/12 10:00</span>
                        </div>
                    </div>
                   ))}
               </div>
           </div>
        </div>

        {/* === БЛОК 3: PROJECTS === */}
        <div className="w-full lg:w-1/4 h-auto lg:h-full flex flex-col shadow-xl bg-white overflow-hidden shrink-0">
           <div className="h-auto lg:h-full lg:overflow-y-auto custom-scrollbar flex flex-col gap-0">
              <div className="bg-xoma-header w-full py-2 text-center sticky top-0 z-10">
                 <h2 className="text-black text-[20px] font-bold leading-none">Projects</h2>
              </div>
              <div className="bg-xoma-bg flex flex-col items-center gap-8 px-4 py-8">
                 <div className="flex flex-col items-center gap-2 w-full">
                  <div className="w-full aspect-[443/590] relative shadow-sm">
                    <Image src="/mock6 done 1.png" alt="Solar Wind" fill className="object-cover" />
                  </div>
                  <p className="text-xoma-blue text-[14px] font-bold text-center leading-tight">“Solar Wind” Khomenko x Shmurak</p>
                </div>
                 <div className="flex flex-col items-center gap-2 w-full">
                  <div className="w-full aspect-[481/285] relative shadow-sm">
                    <Image src="/Screenshot 2025-12-02 at 00.47.26 1.png" alt="Plural Bodies" fill className="object-cover" />
                  </div>
                  <p className="text-xoma-blue text-[14px] font-bold text-center leading-tight">“Plural Bodies” Khomenko x Shmurak</p>
                </div>
                 <div className="flex flex-col items-center gap-2 w-full">
                  <div className="w-full aspect-[374/412] relative shadow-sm">
                    <Image src="/image 128.png" alt="Idi Nahui" fill className="object-cover" />
                  </div>
                  <p className="text-xoma-blue text-[14px] font-bold text-center leading-tight">Артпроєкт “Іді Нахуй”</p>
                </div>
                 <div className="flex flex-col items-center gap-2 w-full">
                  <div className="w-full aspect-[473/314] relative shadow-sm">
                     <Image src="/IMG_3790 1.png" alt="Artist" fill className="object-cover" />
                  </div>
                  <p className="text-xoma-blue text-[14px] font-bold text-center leading-tight">“Independent Multidisciplinary Artist”</p>
                </div>
              </div>
           </div>
        </div>

        {/* === БЛОК 4: ABOUT === */}
        <div className="w-full lg:w-1/4 h-auto lg:h-full flex flex-col shadow-xl bg-white overflow-hidden shrink-0">
           <div className="h-auto lg:h-full lg:overflow-y-auto custom-scrollbar flex flex-col gap-0 bg-xoma-bg">
               <div className="bg-xoma-green w-full py-2 text-center sticky top-0 z-10">
                  <h2 className="text-black text-[20px] font-bold leading-none">About</h2>
               </div>
               
               <div className="flex flex-col items-center p-6 gap-6 w-full">
                    <div className="w-full aspect-square bg-red-600 relative">
                        <Image src="/mock6 done 1-1.png" alt="me" fill className="object-cover mix-blend-multiply" />
                        <div className="absolute inset-0 bg-red-600 mix-blend-multiply opacity-90"></div>
                    </div>

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
               </div>
           </div>
        </div>

      </div>
    </main>
  );
}