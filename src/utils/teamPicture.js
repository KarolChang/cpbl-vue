// export const teamPicture = {
//   '統一7-ELEVEn獅': '../assets/lion.png',
//   '中信兄弟': '../assets/brother.png',
//   '樂天桃猿': '../assets/monkey.png',
//   '味全龍': '../assets/dragon.png',
//   '富邦悍將': '../assets/guardian.png'
// }

let teamPicture = {
  '統一7-ELEVEn獅': '/img/lion.3b5fa7ec.png',
  '中信兄弟': '/img/brother.31acade4.png',
  '樂天桃猿': '/img/monkey.ff863570.png',
  '味全龍': '/img/dragon.dca262ff.png',
  '富邦悍將': '/img/guardian.864556ae.png',
  '統一7-ELEVEn獅二軍': '/img/lion.3b5fa7ec.png',
  '中信兄弟二軍': '/img/brother.31acade4.png',
  '樂天桃猿二軍': '/img/monkey.ff863570.png',
  '味全龍二軍': '/img/dragon.dca262ff.png',
  '富邦悍將二軍': '/img/guardian.864556ae.png'
}

if(process.env.NODE_ENV === 'production') {
  teamPicture = {
    '統一7-ELEVEn獅': '/cpbl-vue/img/lion.3b5fa7ec.png',
    '中信兄弟': '/cpbl-vue/img/brother.31acade4.png',
    '樂天桃猿': '/cpbl-vue/img/monkey.ff863570.png',
    '味全龍': '/cpbl-vue/img/dragon.dca262ff.png',
    '富邦悍將': '/cpbl-vue/img/guardian.864556ae.png',
    '統一7-ELEVEn獅二軍': '/cpbl-vue/img/lion.3b5fa7ec.png',
    '中信兄弟二軍': '/cpbl-vue/img/brother.31acade4.png',
    '樂天桃猿二軍': '/cpbl-vue/img/monkey.ff863570.png',
    '味全龍二軍': '/cpbl-vue/img/dragon.dca262ff.png',
    '富邦悍將二軍': '/cpbl-vue/img/guardian.864556ae.png'
  }
}

export { teamPicture }