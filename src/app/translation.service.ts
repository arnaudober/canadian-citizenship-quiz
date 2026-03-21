import {computed, Injectable, signal} from '@angular/core';
import {Lang, TRANSLATIONS} from './translations';

@Injectable({providedIn: 'root'})
export class TranslationService {
  private readonly STORAGE_KEY = 'quiz-lang';

  lang = signal<Lang>(this.loadLang());
  t = computed(() => TRANSLATIONS[this.lang()]);

  toggleLang(): void {
    const next = this.lang() === 'en' ? 'fr' : 'en';
    this.lang.set(next);
    localStorage.setItem(this.STORAGE_KEY, next);
  }

  private loadLang(): Lang {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored === 'fr' ? 'fr' : 'en';
  }
}
