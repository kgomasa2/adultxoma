import Image from "next/image";
import Link from "next/link";

export default function ItemPage() {
  return (
    // ГОЛОВНИЙ ЕКРАН (Фон)
    <main className="h-screen w-full bg-white flex justify-center items-center overflow-hidden font-sans py-10">
      
      {/* КАРТКА ТОВАРУ (Центральний блок) */}
      <div className="flex flex-col w-full max-w-[1000px] h-full shadow-2xl bg-white overflow-hidden">
        
        {/* === ROW 1: HEADER (Arrow + Category) === */}
        <div className="flex w-full shrink-0 h-[60px]">
            {/* Кнопка НАЗАД */}
            <Link href="/" className="w-[80px] h-full bg-[#bfbfbf] hover:bg-[#a6a6a6] transition-colors flex items-center justify-center shrink-0">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
                    <path d="M19 12H5" />
                    <path d="M12 19L5 12L12 5" />
                </svg>
            </Link>

            {/* Назва розділу */}
            <div className="flex-1 bg-xoma-header flex items-center justify-center h-full">
                <h2 className="text-black text-[24px] font-bold leading-none">
                    Free Items
                </h2>
            </div>
        </div>

        {/* === ROW 2: TITLE BAR (Назва Айтему) === */}
        <div className="bg-xoma-green w-full py-4 text-center shrink-0 border-t border-white/20">
            <h1 className="text-black text-[24px] font-bold leading-none">
                Soul-Trade Mockup Pack I
            </h1>
        </div>

        {/* === CONTENT AREA (Спліт 50/50) === */}
        <div className="flex flex-1 overflow-hidden">
            
            {/* ЛІВА КОЛОНА: Картинки (Скролиться) */}
            <div className="w-1/2 h-full overflow-y-auto custom-scrollbar bg-black flex flex-col gap-[10px] p-[10px]">
                {/* Картинка 1 */}
                <div className="w-full aspect-[4/5] relative">
                    <Image src="/mock6 done 1-2.png" alt="Detail 1" fill className="object-cover" />
                </div>
                {/* Картинка 2 */}
                <div className="w-full aspect-[4/5] relative">
                    <Image src="/mock6 done 1-2.png" alt="Detail 2" fill className="object-cover" />
                </div>
                {/* Картинка 3 */}
                <div className="w-full aspect-[4/5] relative">
                    <Image src="/mock6 done 1.png" alt="Detail 3" fill className="object-cover" />
                </div>
            </div>

            {/* ПРАВА КОЛОНА: Інфо (Скролиться ВЕСЬ блок) */}
            {/* overflow-y-auto тут гарантує скролбар на самому краю плашки */}
            <div className="w-1/2 h-full bg-xoma-bg border-l border-white overflow-y-auto custom-scrollbar">
                
                {/* Внутрішній контейнер з відступами та розтягуванням на всю висоту */}
                <div className="flex flex-col justify-between min-h-full p-8 gap-6">
                    
                    {/* Верх: Текст */}
                    <div className="flex flex-col gap-6">
                        <h2 className="text-black text-[24px] font-bold leading-none">
                            Soul-Trade Mockup Pack I
                        </h2>

                        <div className="flex flex-col gap-4 text-black text-[16px] leading-snug">
                            <p className="font-bold">
                                This free collection gives designers the only honest way to showcase morally questionable projects (тіпа казінопка, сумнівні політ. партії, скамерські кріптостартапи...): by presenting them exactly where they belong — in hell.
                            </p>
                            <p>
                                Не моральфаг, глобально похуй, але мокапи угарні. Качайте.
                            </p>
                            <p>
                                Available for both personal and commercial use — completely free.
                            </p>
                            <p className="font-bold">
                                Пак безкоштовний, але отримати лінк можна ТІЛЬКИ ПІСЛЯ ДОНАТУ 100₴ на банку у шапці профілю)
                            </p>

                            {/* Додатковий текст для скролу */}
                            <hr className="border-gray-400 opacity-20 my-2" />
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            </p>
                            <p>
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                            </p>
                            <p>
                                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                            </p>
                        </div>
                    </div>

                    {/* Низ: Кнопка */}
                    <div className="mt-8">
                        <a 
                            href="#" 
                            className="block w-full bg-xoma-blue text-white text-[24px] font-bold py-4 text-center hover:bg-blue-700 transition-colors"
                        >
                            Free download
                        </a>
                    </div>
                </div>

            </div>

        </div>

      </div>
    </main>
  );
}