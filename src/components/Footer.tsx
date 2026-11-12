import { links } from '../data.ts';

export const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-secundary">
      <p className="py-8 text-center font-medium">
        Desenvolvido por <span className="text-orange-600">Cristian Daniel</span>
      </p>
      <ul className="flex justify-center gap-6 pb-10">
        {links.map((link) => (
          <li key={link.alt}>
            <a href={link.url} target={link.url.endsWith('@gmail.com') ? '' : '_blank'}>
              <img src={link.img} alt={link.alt} width={40} height={40} className="w-10" />
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
};
