import { links } from '../data.ts';

export const Footer = () => {
  return (
    <footer className="bg-secundary border-t">
      <p className="text-center py-8 font-medium">
        Desenvolvido por{' '}
        <span className="text-orange-600">Cristian Daniel</span>
      </p>
      <ul className="flex gap-6 justify-center pb-10">
        {links.map(link => (
          <li key={link.alt}>
            <a
              href={link.url}
              target={link.url.endsWith('@gmail.com') ? '' : '_blank'}
            >
              <img
                src={link.img}
                alt={link.alt}
                width={40}
                height={40}
                className="w-10"
              />
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
};
