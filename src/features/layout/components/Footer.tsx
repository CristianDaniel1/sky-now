import { SOCIAL_LINKS } from '../data/social-links';

export const Footer = () => (
  <footer className="border-t border-gray-200 bg-secundary">
    <p className="py-8 text-center font-medium">
      Desenvolvido por <span className="text-orange-600">Cristian Daniel</span>
    </p>
    <ul className="flex justify-center gap-6 pb-10">
      {SOCIAL_LINKS.map((link) => (
        <li key={link.url}>
          <a
            href={link.url}
            target={link.isExternal ? '_blank' : undefined}
            rel={link.isExternal ? 'noopener noreferrer' : undefined}
          >
            <img src={link.icon.src} alt={link.icon.alt} width={40} height={40} className="w-10" />
          </a>
        </li>
      ))}
    </ul>
  </footer>
);
