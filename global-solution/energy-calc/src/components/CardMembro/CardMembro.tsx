import Image from "next/image";
import { FaGithubSquare, FaLinkedin } from "react-icons/fa";

type CardMembroProps = {
  name: string;
  rm: string;
  githubLink: string;
  image: string;
};

export default function CardMembro({ name, rm, githubLink, image }: CardMembroProps) {
  return (
    <div className="flex flex-col pt-10 sm:pt-4 sm:flex-row items-center justify-around gap-4 relative bg-black text-white p-4 group even:sm:flex-row-reverse rounded-2xl">
      <div className="flex flex-col items-center w-full sm:w-2/4 ">
        <h1 className="font-semibold">{name}</h1>
        <h2>RM {rm}</h2>
        <h2>1TDSPO</h2>
      </div>

      <a
        className="flex flex-col items-center justify-center gap-2 w-full sm:w-2/4 transition hover:text-green-600 "
        href={githubLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithubSquare size={32} />
        <span>Github</span>
      </a>
      <Image
        className="absolute -top-16 sm:-right-6 group-even:sm:-left-6 rounded-full w-24 sm:w-32 shadow-md shadow-gray-900 transition hover:scale-105 "
        src={image}
        alt={`Foto de perfil de ${name}`}
        width={200}
        height={200}
      />
    </div>
  );
}