import CardMembro from "@/components/CardMembro/CardMembro";

export default function membros() {
  const people = [
    {
      name: "Lucas Rodrigues de Souza",
      rm: "557951",
      githubLink: "https://github.com/Lucasrodrigues0101",
      image: "/imgs/membros/lucas.jpg"
    },
    {
      name: "Raphaela Oliveira Tatto",
      rm: "554983",
      githubLink: "https://github.com/raphatatto",
      image: "/imgs/membros/raphatatto.jpg"
    },
    {
      name: "Tiago Ribeiro Capela",
      rm: "558021",
      githubLink: "https://github.com/TCapela",
      image: "/imgs/membros/capela.jpg"
    },
  ];
  
  return (
    <main className="max-w-6xl mx-auto p-4">
      <ul className="flex flex-col justify-between gap-20 w-full mt-20">
        {
          people.map(person => (
            <CardMembro key={person.rm} {...person} />
          ))
        }
      </ul>
    </main>
  );
}