export default [
  // market accessibility
  {
    id: 'ctrl_market_accessibility_vn_layer',
    label: 'Market accessibility',
    defaultVisibility: false,
    legend: 'none',
    legendMap: [
      {
        value: '<=3 hours',
        color: '#d6eaf8'
      },
      {
        value: '<=6 hours',
        color: '#aed6f1'
      },
      {
        value: '<=12 hours',
        color: '#85c1e9'
      },
      {
        value: '<=1 day',
        color: '#5dade2'
      },
      {
        value: '>1 day',
        color: '#2e86c1'
      }
    ],
    layerIds: ['market_accessibility_vn_layer'],
    chartsIds: ['market_acc_stat'],
    info: 'Market accessibility'
  }
]
