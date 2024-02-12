export const ButtonsData = (status, selectedButton) => [
  {
    title: 'CHEKOUT.BARRIER.BUTTON',
    img: `media/buttons/${selectedButton[0] ? 'new-' : ''}Barrier.svg`,
  },
  {
    title: status === 'ink_out' ? 'Error' : 'CHEKOUT.PRINT.BUTTON',
    img: status === 'ink_out' ? 'media/buttons/innkoutprinter.svg' : `media/buttons/${selectedButton[1] ? 'new-' : ''}Print.svg`,
  },
  {
    title: 'CHEKOUT.RECEIPT.BUTTON',
    img: `media/buttons/${selectedButton[2] ? 'new-' : ''}Receipt.svg`,
  },
];