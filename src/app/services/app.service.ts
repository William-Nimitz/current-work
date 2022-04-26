import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private supportedLanguages = [
    {label: 'LANG.ENGLISH', code: 'en'},
    {label: 'LANG.FRENCH', code: 'fr'},
    {label: 'LANG.SPANISH', code: 'es'},
    {label: 'LANG.ITALIAN', code: 'it'}];

  // private intenalUrls = ['builder-dev-interne.adn.ai', 'app-adnai-preprod.talk-in.com',  'app-adnai.talk-in.com', 'localhost'];
  private intenalUrls = ['builder-dev-interne.adn.ai', 'app-adnai-preprod.talk-in.com', 'app-adnai.talk-in.com'];

  private productionUrls = ['app-adnai.talk-in.com', 'app.talk-in.com'];

  constructor() { }

  /**
   * Internal Urls management and functions
   */
  public get internalUri(): any {
    return this.intenalUrls;
  }

  isInternalUrl(hostname: string): boolean {
    return this.intenalUrls.includes(hostname);
  }

  isProduction(hostname: string): boolean {
    return this.productionUrls.includes(hostname);
  }

  /**
   * Language list and functions
   */
  public get langCode(): any {
    const codes = [];
    this.supportedLanguages.forEach(e => { codes.push(e.code); });
    return codes;
  }

  public get langList(): any {
    return this.supportedLanguages;
  }

  isSupportedLanguage(lang: string): boolean {
    return this.langCode.includes(lang);
  }

  macroUrlRegex(url: string, regex?: any): boolean {
    console.log(regex);
    if (!regex) {
      regex = /^(\${.*})?(%%.*%%)?(\[.*\])?(https:\/\/)/gm;
    }
    return regex.test(url);
  }

  emailLinkValidator(email: string): boolean {
    const regex = /^mailto:(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm;
    return regex.test(email);
  }
}
