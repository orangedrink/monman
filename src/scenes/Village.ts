import Phaser from 'phaser';

export default class Demo extends Phaser.Scene {
  constructor() {
    super('VillageScene');
  }

  preload() {
    this.load.image('logo', 'assets/phaser3-logo.png');
  }

  create() {
    const logo = this.add.image(400, 70, 'logo');

    this.tweens.add({
      targets: logo,
      y: 350,
      duration: 1500,
    });
  }
}
