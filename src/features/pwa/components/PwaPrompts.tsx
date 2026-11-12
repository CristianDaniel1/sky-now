import { InstallOffer } from './InstallOffer';
import { UpdatePrompt } from './UpdatePrompt';

export const PwaPrompts = () => (
  <div className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex flex-col gap-3 *:pointer-events-auto sm:left-auto sm:w-96">
    <UpdatePrompt />
    <InstallOffer />
  </div>
);
