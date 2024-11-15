import { FaFacebookSquare, FaGithubSquare, FaInstagram } from "react-icons/fa";
import { FaLinkedin, FaSquareXTwitter } from "react-icons/fa6";

export default function Footer() {
  const links = [
    {
      text: 'Instagram',
      icon: <FaInstagram size={24} />
    },
    {
      text: 'Facebook',
      icon: <FaFacebookSquare size={24} />
    },
    {
      text: 'Twitter',
      icon: <FaSquareXTwitter size={24} />
    },
    {
      text: 'Github',
      icon: <FaGithubSquare size={24} />
    },
    {
      text: 'Linkedin',
      icon: <FaLinkedin size={24} />
    }
  ];
  
  return (
    <footer className="flex flex-col items-center gap-6 bg-green-200 mx-auto p-4">
      <h1
        className="font-semibold text-3xl text-black"
      >
       Entre em contato e se torne um parceiro!
      </h1>

      <ul className="flex gap-8 flex-wrap">
        {
          links.map(link => (
            <li key={link.text}>
              <a href="/" className="flex flex-col items-center text-xl" target="_blank">
                {link.icon}
                {link.text}
              </a>
            </li>
          ))
        }
      </ul>
    </footer>
  );
}