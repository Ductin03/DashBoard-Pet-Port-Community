import { ElementRef } from '@angular/core';

export class loginAnimation {
  private username: HTMLElement;
  private password: HTMLElement;
  private eyeL: HTMLElement;
  private eyeR: HTMLElement;
  private handL: HTMLElement;
  private handR: HTMLElement;

  constructor(
    usernameRef: ElementRef,
    passwordRef: ElementRef,
    eyeLRef: ElementRef,
    eyeRRef: ElementRef,
    handLRef: ElementRef,
    handRRef: ElementRef
  ) {
    this.username = usernameRef.nativeElement;
    this.password = passwordRef.nativeElement;
    this.eyeL = eyeLRef.nativeElement;
    this.eyeR = eyeRRef.nativeElement;
    this.handL = handLRef.nativeElement;
    this.handR = handRRef.nativeElement;
    this.initListeners();
  }

  private normalEyeStyle() {
    this.eyeL.style.cssText = `
      left: 0.6em;
      top: 0.6em;
    `;
    this.eyeR.style.cssText = `
      right: 0.6em;
      top: 0.6em;
    `;
  }

  private normalHandStyle() {
    this.handL.style.cssText = `
      height: 2.81em;
      top: 8.4em;
      left: 7.5em;
      transform: rotate(0deg);
    `;
    this.handR.style.cssText = `
      height: 2.81em;
      top: 8.4em;
      right: 7.5em;
      transform: rotate(0deg);
    `;
  }

  private initListeners() {
    this.username.addEventListener('focus', () => {
      this.eyeL.style.cssText = `
        left: 1.37em;
    transform: rotate(-20deg);
      `;
      this.eyeR.style.cssText = `
        right: 1.37em;
    transform: rotate(20deg);
      `;
      this.normalHandStyle();
    });

    this.password.addEventListener('focus', () => {
      this.handL.style.cssText = `
        height: 6.56em;
        top: 3.87em;
        left: 11.75em;
        transform: rotate(-155deg);
      `;
      this.handR.style.cssText = `
        height: 6.56em;
        top: 3.87em;
        right: 11.75em;
        transform: rotate(155deg);
      `;
     
    });

    document.addEventListener('click', (e) => {
      const clickedElem = e.target as HTMLElement;
      if (clickedElem !== this.username && clickedElem !== this.password) {
        
      }
    });
  }
}