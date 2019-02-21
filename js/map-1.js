const backgrounds = [{
    "name": "grass",
    "space": [
      [
        0, 16,
        0, 16
      ]
    ],
    "overlay": false
  },
  {
    "name": "stone",
    "space": [
      [
        3, 13,
        2, 10
      ],
      [
        0, 16,
        7, 10
      ],
      [
        6, 10,
        0, 12
      ],[
        1, 5,
        0, 5
      ],[
        11, 15,
        0, 5
      ],
    ],
    "overlay": true
  },
  {
    "name": "water",
    "space": [
      [
        0, 16,
        12, 16
      ]
    ],
    "overlay": true
  },
  {
    "name": "boat",
    "space": [
      [
        4, 5,
        14, 15
      ]
    ],
    "overlay": false
  },
  {
    "name": "market",
    "space": [
      [
        13, 14,
        4, 5
      ]
    ],
    "overlay": false
  }
]








const colitionBoxxes = [
  {
    "type": "stop",
    "why": "watter",
    "space": [
      [
        0, 16,
        13, 3
      ]
    ]
  },
  {
    "type": "stop",
    "why": "market",
    "space": [
      [
        14, 2,
        4, 3
      ]
    ]
  }
]
