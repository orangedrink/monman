import Phaser from 'phaser';
import config from './config';
import GameScene from './scenes/Game';
import VillageScene from './scenes/Village';

new Phaser.Game(
  Object.assign(config, {
    scene: [VillageScene]
  })
);
