import Image from 'next/image';

export default function Review({ name, review, rating, imageUrl }) {
  return (
    <div className="hover:scale-105 ease-in-out duration-100">
      <div className=" rounded-xl p-3">
        <div className="relative h-28 bg-gray-100 border shadow-xl max-w-lg  rounded-xl flex items-center gap-10 ">
          <div className="absolute -left-6 w-28 h-28 rounded-full shadow-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={`Profile image of ${name}`}
              layout="fill" 
              objectFit="cover"
     
              className="rounded-full "
            />
          </div>
          <div className="flex flex-col py-5 pl-24">
            <strong className="text-slate-500 text-sm md:text-md font-large ">{name}</strong>
            <span className="text-sm md:text-md text-gray-900  ">{rating}</span>
            <p>{review}</p>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none border border-black/5 rounded-xl dark:border-white/5"></div>
    </div>
  );
}
