import emailIcon from '@/assets/img/email.png';
import githubIcon from '@/assets/img/github-icon.svg';
import linkedinIcon from '@/assets/img/linkedin.svg';
import type { SocialLink } from '../interfaces/social-link';

/** Author contact links shown in the footer. */
export const SOCIAL_LINKS: SocialLink[] = [
  {
    url: 'https://www.linkedin.com/in/cristiandaniel1',
    icon: { src: linkedinIcon, alt: 'Ícone do LinkedIn' },
    isExternal: true,
  },
  {
    url: 'https://github.com/CristianDaniel1',
    icon: { src: githubIcon, alt: 'Ícone do GitHub' },
    isExternal: true,
  },
  {
    url: 'mailto:cristiandaniel.1050@gmail.com',
    icon: { src: emailIcon, alt: 'Ícone de e-mail' },
    isExternal: false,
  },
];
