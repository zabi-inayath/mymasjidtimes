import { useEffect, useState } from 'react';

export default function useInstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isInstallable, setIsInstallable] = useState(false);

    useEffect(() => {
        const handler = (e) => {
            console.log('🔥 beforeinstallprompt fired');
            e.preventDefault();
            setDeferredPrompt(e);
            setIsInstallable(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const promptInstall = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const choiceResult = await deferredPrompt.userChoice;
            // console.log('User choice', choiceResult);
            setDeferredPrompt(null);
            setIsInstallable(false);
        }
    };

    return { isInstallable, promptInstall, dismissInstall: () => setIsInstallable(false) };
}
