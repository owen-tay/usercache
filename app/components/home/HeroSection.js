import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="relative text-center">
      <div className="h-96">
        <Image
          src="/images/hero.jpg"
          alt="Descriptive Alt Text"
          className=" h-1/2"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 	 ">
        <h1 className="text-md sm:text-xl md:text-2xl font-bold text-black drop-shadow-lg py-3 ">
          <span className="text-primary stroke-stone-700">Usercache </span> is
          your new admin solution 🚀
        </h1>
        <p className="text-xs sm:text-sm md:text-lg font-light text-black drop-shadow-lg pb-3">
          Discover our advanced record-keeping and document storage solution,
          designed for the modern workplace. With dynamic databasing and
          intuitive ease-of-use features, it enables your team to work more
          efficiently.
        </p>

        <button className="btn btn-primary">Find out more</button>
      </div>
    </div>
  );
}
