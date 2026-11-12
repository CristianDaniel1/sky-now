import emailIcon from '@/assets/img/email.png';
import githubIcon from '@/assets/img/github-icon.svg';
import linkedinIcon from '@/assets/img/linkedin.svg';
import type { SocialLink } from '../interfaces/social-link';

/** Author contact links shown in the footer. */
export const SOCIAL_LINKS: SocialLink[] = [
  {
    url: 'https://www.linkedin.com/in/cristiandaniel1',
    name: 'LinkedIn',
    icon: linkedinIcon,
    isExternal: true,
    invertOnDark: false,
  },
  {
    url: 'https://github.com/CristianDaniel1',
    name: 'GitHub',
    icon: githubIcon,
    isExternal: true,
    invertOnDark: true,
  },
  {
    url: 'mailto:cristiandaniel.1050@gmail.com',
    name: 'E-mail',
    icon: emailIcon,
    isExternal: false,
    invertOnDark: false,
  },
];
