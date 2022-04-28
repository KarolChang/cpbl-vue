export const teamEnglish = function(team) {
  switch(team) {
    case '樂天桃猿':
      return {nameEN: 'MONKEYS', color: 'text-danger'}
    case '味全龍':
      return {nameEN: 'DRAGONS', color: 'text-danger'}
    case '中信兄弟':
      return {nameEN: 'BROTHERS', color: 'text-warning'}
    case '富邦悍將':
      return {nameEN: 'GUARDIANS', color: 'text-primary'}
    case '統一7-ELEVEn獅':
      return {nameEN: 'UNILIONS', color: 'text-orange'}
  }
}