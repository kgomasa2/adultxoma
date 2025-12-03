import Image from "next/image";
import Link from "next/link";

export default function ProjectPage() {
  return (
    // ГОЛОВНИЙ ЕКРАН (Фон)
    <main className="h-screen w-full bg-white flex justify-center items-center overflow-hidden font-sans py-10">
      
      {/* КАРТКА ПРОЄКТУ */}
      <div className="flex flex-col w-full max-w-[1200px] h-full shadow-2xl bg-white overflow-hidden">
        
        {/* === ROW 1: HEADER (Arrow + Category) === */}
        <div className="flex w-full shrink-0 h-[60px]">
            {/* Кнопка НАЗАД */}
            <Link href="/" className="w-[80px] h-full bg-[#bfbfbf] hover:bg-[#a6a6a6] transition-colors flex items-center justify-center shrink-0">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
                    <path d="M19 12H5" />
                    <path d="M12 19L5 12L12 5" />
                </svg>
            </Link>

            {/* Назва розділу (Змінив колір на #AED9B0) */}
            <div className="flex-1 bg-[#AED9B0] flex items-center justify-center h-full">
                <h2 className="text-black text-[24px] font-bold leading-none">
                    Projects
                </h2>
            </div>
        </div>

        {/* === ROW 2: TITLE BAR (Назва Проєкту) === */}
        {/* Змінив фон на #C7B48D та текст на чорний */}
        <div className="bg-[#C7B48D] w-full py-4 text-center shrink-0 border-t border-white/20">
            <h1 className="text-black text-[24px] font-bold leading-none">
                “Solar Wind” Khomenko x Shmurak
            </h1>
        </div>

        {/* === CONTENT AREA (Спліт 50/50) === */}
        <div className="flex flex-1 overflow-hidden">
            
            {/* ЛІВА КОЛОНА: Текст (Скролиться) */}
            <div className="w-1/2 h-full bg-xoma-bg border-r border-white overflow-y-auto custom-scrollbar">
                <div className="flex flex-col gap-8 p-8">
                    
                    {/* Мета-дані */}
                    <div className="flex flex-col gap-4 border-b border-gray-300 pb-6">
                        <h2 className="text-black text-[32px] font-bold leading-tight">
                            Interactive Installation<br/> "Solar Wind"
                        </h2>
                        
                        <div className="flex gap-6 text-[14px] font-mono text-gray-600">
                            <div className="flex flex-col">
                                <span className="font-bold text-black">Year</span>
                                <span>2025</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-black">Type</span>
                                <span>Installation, Digital Art</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-black">Collaboration</span>
                                <span>Anton Shmurak</span>
                            </div>
                        </div>
                    </div>

                    {/* Основний текст */}
                    <div className="flex flex-col gap-4 text-black text-[16px] leading-snug">
                        <p className="font-bold">
                            Solar Wind is an artistic exploration of the invisible forces that shape our digital and physical realities.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </p>
                        <p>
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                        </p>
                        <hr className="border-gray-300 my-2"/>
                        <p>
                            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                        </p>
                        <p>
                            Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                        </p>
                        <p>
                            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
                        </p>
                    </div>
                </div>
            </div>

            {/* ПРАВА КОЛОНА: Галерея (Скролиться) */}
            {/* Сітка: 1 широка, 2 вузькі, повтор */}
            <div className="w-1/2 h-full bg-xoma-bg overflow-y-auto custom-scrollbar p-[10px]">
                <div className="grid grid-cols-2 gap-[10px]">
                    
                    {/* 1. Горизонтальна (на всю ширину) */}
                    <div className="col-span-2 w-full aspect-video relative">
                        <Image src="/mock6 done 1.png" alt="Project 1" fill className="object-cover" />
                    </div>

                    {/* 2. Вертикальна */}
                    <div className="col-span-1 w-full aspect-[3/4] relative">
                        <Image src="/Screenshot 2025-12-02 at 00.47.26 1.png" alt="Project 2" fill className="object-cover" />
                    </div>
                    {/* 3. Вертикальна */}
                    <div className="col-span-1 w-full aspect-[3/4] relative">
                        <Image src="/image 128.png" alt="Project 3" fill className="object-cover" />
                    </div>

                    {/* 4. Горизонтальна */}
                    <div className="col-span-2 w-full aspect-video relative">
                        <Image src="/image 1.png" alt="Project 4" fill className="object-cover" />
                    </div>

                    {/* 5. Вертикальна */}
                    <div className="col-span-1 w-full aspect-[3/4] relative">
                        <Image src="/IMG_3790 1.png" alt="Project 5" fill className="object-cover" />
                    </div>
                    {/* 6. Вертикальна */}
                    <div className="col-span-1 w-full aspect-[3/4] relative">
                        <Image src="/mock6 done 1-2.png" alt="Project 6" fill className="object-cover" />
                    </div>

                    {/* 7. Горизонтальна */}
                    <div className="col-span-2 w-full aspect-video relative">
                        <Image src="/Screenshot 2025-12-02 at 00.57.09 1.png" alt="Project 7" fill className="object-cover" />
                    </div>

                    {/* 8. Вертикальна */}
                    <div className="col-span-1 w-full aspect-[3/4] relative">
                        <Image src="/mock6 done 1.png" alt="Project 8" fill className="object-cover" />
                    </div>
                    {/* 9. Вертикальна */}
                    <div className="col-span-1 w-full aspect-[3/4] relative">
                        <Image src="/image 128.png" alt="Project 9" fill className="object-cover" />
                    </div>

                    {/* 10. Горизонтальна */}
                    <div className="col-span-2 w-full aspect-video relative">
                        <Image src="/image 1.png" alt="Project 10" fill className="object-cover" />
                    </div>

                </div>
            </div>

        </div>

      </div>
    </main>
  );
}