export interface InstallChoice {
  outcome: 'accepted' | 'dismissed';
  platform: string;
}

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<InstallChoice>;
}

export interface InstallPromptState {
  promptEvent: BeforeInstallPromptEvent | null;
  setPromptEvent: (promptEvent: BeforeInstallPromptEvent | null) => void;
}

export interface InstallOfferState {
  dismissedAt: number | null;
  dismiss: () => void;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}
