import Image from "next/image";
import Link from "next/link";

export default function NewsPage() {
  return (
    // ГОЛОВНИЙ ЕКРАН (Фон)
    <main className="h-screen w-full bg-white flex justify-center items-center overflow-hidden font-sans py-10">
      
      {/* КАРТКА НОВИНИ (Центральний блок) */}
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
            <div className="flex-1 bg-xoma-purple flex items-center justify-center h-full">
                <h2 className="text-black text-[24px] font-bold leading-none">
                    News
                </h2>
            </div>
        </div>

        {/* === ROW 2: TITLE BAR (Заголовок новини) === */}
        <div className="bg-xoma-header w-full py-4 text-center shrink-0 border-t border-white/20">
            <h1 className="text-black text-[24px] font-bold leading-none">
                SMS Pommern: The Lost Giant
            </h1>
        </div>

        {/* === CONTENT AREA (Спліт 50/50) === */}
        <div className="flex flex-1 overflow-hidden">
            
            {/* ЛІВА КОЛОНА: Галерея (Скролиться) */}
            {/* Змінив bg-black на bg-xoma-bg (сірий) */}
            <div className="w-1/2 h-full overflow-y-auto custom-scrollbar bg-xoma-bg flex flex-col gap-[10px] p-[10px]">
                {/* Головне фото */}
                <div className="w-full aspect-video relative">
                    <Image src="/image 1.png" alt="SMS Pommern Main" fill className="object-cover" />
                </div>
                {/* Додаткові фото */}
                <div className="w-full aspect-video relative">
                    <Image src="/mock6 done 1.png" alt="Detail 1" fill className="object-cover" />
                </div>
                <div className="w-full aspect-video relative">
                    <Image src="/mock6 done 1-2.png" alt="Detail 2" fill className="object-cover" />
                </div>
                 <div className="w-full aspect-video relative">
                    <Image src="/IMG_3790 1.png" alt="Detail 3" fill className="object-cover" />
                </div>
            </div>

            {/* ПРАВА КОЛОНА: Текст (Скролиться ВЕСЬ блок) */}
            {/* overflow-y-auto на цьому рівні забезпечує скролбар праворуч на краю плашки */}
            <div className="w-1/2 h-full bg-xoma-bg border-l border-white overflow-y-auto custom-scrollbar">
                
                {/* Внутрішній контейнер з відступами */}
                <div className="flex flex-col gap-6 p-8">
                    
                    {/* Заголовок і Дата */}
                    <div className="flex flex-col gap-2">
                        <h2 className="text-black text-[24px] font-bold leading-tight">
                            SMS Pommern: The Lost Giant
                        </h2>
                        <span className="text-gray-500 text-[14px] font-mono">
                            02.12.2025 — 22:23
                        </span>
                    </div>

                    {/* Текст новини (Багато тексту для скролу) */}
                    <div className="flex flex-col gap-4 text-black text-[16px] leading-snug">
                        <p className="font-bold">
                            A Deutschland-class pre-dreadnought battleship built for the Imperial German Navy. Named after the Prussian province of Pomerania.
                        </p>
                        <p>
                            SMS Pommern was commissioned into the navy on 6 August 1907. The ship was armed with four 28 cm (11 in) guns in two twin turrets and had a top speed of 18 knots (33 km/h; 21 mph).
                        </p>
                        <p>
                            Pommern was assigned to the II Battle Squadron of the High Seas Fleet for most of her career, including World War I. She participated in the Battle of Jutland on 31 May – 1 June 1916.
                        </p>
                        <p>
                            During the battle, she was torpedoed by the British destroyer HMS Onslaught. One or two torpedoes hit the ship, detonating one of the 17 cm magazines. The resulting explosion broke the ship in half and killed the entire crew of 839 officers and enlisted men.
                        </p>
                        <p className="italic text-gray-600 mt-4">
                            Original photos provided by the Bundesarchiv. Digital reconstruction by XOMA.
                        </p>
                        
                        {/* Lorem Ipsum для довгого скролу */}
                        <hr className="border-gray-300 my-4"/>
                        
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <p>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. 
                        </p>
                        <p>
                            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
                        </p>
                        <p>
                            Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
                        </p>
                    </div>
                </div>

            </div>

        </div>

      </div>
    </main>
  );
}