import { Lang_Symbols } from '@/app/languages.d';
import { SectionType } from '@/app/types';
import { SPEAKER_STATE } from '@/components/textarea-footer';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Textarea
export const getPlaceHolder = ({
  type,
  loading,
}: {
  type: SectionType;
  loading?: boolean;
}) => {
  if (type === 'from') return 'Introducir texto';
  if (type === 'to' && loading === true) return 'Traduciendo...';
  if (type === 'to') return 'Traducción';
};

export const getValue = (type: SectionType, value?: string, text?: string) => {
  if (type === 'to') return value;

  return text;
};

// Speech Synthesis
let navigator_sppech: any;

if (typeof window !== 'undefined') {
  navigator_sppech = new SpeechSynthesisUtterance();
}

export const handleHearSound = (
  text: string,
  lang: Lang_Symbols,
  callback: (type: string) => void
) => {
  if (typeof window === 'undefined' || !text) return;
  if (speechSynthesis.speaking) return speechSynthesis.cancel();

  callback(SPEAKER_STATE.loading);

  // On start
  navigator_sppech.onstart = () => {
    callback(SPEAKER_STATE.ON);
  };

  // On end
  navigator_sppech.onend = () => {
    callback(SPEAKER_STATE.OFF);
  };

  // On error
  navigator_sppech.onerror = () => {
    callback(SPEAKER_STATE.OFF);
  };

  navigator_sppech.lang = lang;
  navigator_sppech.text = text;
  navigator_sppech.rate = 0.8;

  speechSynthesis.speak(navigator_sppech);
};

export const handleCopy = (
  text: string,
  callback: (boolean: boolean) => void
) => {
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    callback(true);

    const timer = setTimeout(() => {
      callback(false);
    }, 1000);

    return () => clearTimeout(timer);
  });
};
