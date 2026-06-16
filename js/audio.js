class AudioManager {
  constructor() {
    this.bgm = new Audio("Asset/music/mystery ambience.mp3");
    this.bgm.loop = true;
    this.bgm.volume = 0.7;

    this.sfxClick = new Audio("Asset/music/click sfx.mp3");
    this.sfxCorrect = new Audio("Asset/music/correct sfx.mp3");
    this.sfxError = new Audio("Asset/music/error sfx.mp3");
    
    this.sfxTyping = new Audio("Asset/music/typing sfx.mp3");
    this.sfxTyping.loop = true;

    this.sfxReboot = new Audio("Asset/music/server reboot sfx.mp3");
    
    this.sfxGlitch = new Audio("Asset/music/glitch sfx.mp3");
    this.sfxGlitch.loop = true;

    // A flag to prevent multiple typing plays overlapping
    this.isTyping = false;
  }

  playBGM() {
    this.bgm.play().catch(e => console.log("BGM play failed:", e));
  }
  
  stopBGM() {
    this.bgm.pause();
    this.bgm.currentTime = 0;
  }

  playClick() {
    this.sfxClick.currentTime = 0;
    this.sfxClick.play().catch(e => console.log("Click SFX failed:", e));
  }

  playCorrect() {
    this.sfxCorrect.currentTime = 0;
    this.sfxCorrect.play().catch(e => console.log("Correct SFX failed:", e));
  }

  playError() {
    this.sfxError.currentTime = 0;
    this.sfxError.play().catch(e => console.log("Error SFX failed:", e));
  }

  startTyping() {
    if (!this.isTyping) {
      this.isTyping = true;
      this.sfxTyping.currentTime = 0;
      this.sfxTyping.play().catch(e => console.log("Typing SFX failed:", e));
    }
  }

  stopTyping() {
    if (this.isTyping) {
      this.isTyping = false;
      this.sfxTyping.pause();
    }
  }

  playReboot() {
    this.sfxReboot.currentTime = 0;
    this.sfxReboot.play().catch(e => console.log("Reboot SFX failed:", e));
  }

  startGlitch() {
    this.sfxGlitch.play().catch(e => console.log("Glitch SFX failed:", e));
  }

  stopGlitch() {
    this.sfxGlitch.pause();
  }
}

export const audio = new AudioManager();
