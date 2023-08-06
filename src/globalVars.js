export const vehicleURL = "https://detect.roboflow.com/vehicles-q0x2v/1"
export const trafficURL = "https://api.data.gov.sg/v1/transport/traffic-images?date_time="

export let mainImage = ""

export const road = [
    { label: 'Ayer Rajah Expressway'},
    { label: 'Bukit Timah Expressway'},
    { label: 'Central Expressway'},
    { label: 'East Coast Parkway'},
    { label: 'Kallang-Paya Lebar Expressway'},
    { label: 'Kranji Expressway'},
    { label: 'Marina Coastal Expressway'},
    { label: 'Pan-Island Expressway'},
    { label: 'Seletar Expressway'},
    { label: 'Tampines Expressway'},
    { label: 'Tuas Checkpoint'},
    { label: 'Woodlands Checkpoint'},
];

export const lengthOfRoad = {
    "Ayer Rajah Expressway": 26.5,
    "Bukit Timah Expressway": 10.0,
    "Central Expressway": 15.8,
    "East Coast Parkway": 20.0,
    "Kallang-Paya Lebar Expressway": 12.0,
    "Kranji Expressway": 8.0,
    "Marina Coastal Expressway": 5.0,
    "Pan-Island Expressway": 42.8,
    "Seletar Expressway": 10.8,
    "Tampines Expressway": 14.0,
    "Tuas Checkpoint": 1.9,
    "Woodlands Checkpoint": 2.4,
}

export const geoLocation = {
    "Ayer Rajah Expressway": [
      {
        "expresswayName": "Towards Alexandra Road, Ayer Rajah Expressway, Queenstown, Singapore, Central, 118998, Singapore",
        "location": {
          "latitude": 1.2871,
          "longitude": 103.79633
        }
      },
      {
        "expresswayName": "2A, Ayer Rajah Expressway, Radin Mas, Bukit Merah, Singapore, Central, 099418, Singapore",
        "location": {
          "latitude": 1.27237,
          "longitude": 103.8324
        }
      },
      {
        "expresswayName": "Lower Delta Flyover, Ayer Rajah Expressway, Radin Mas, Bukit Merah, Singapore, Central, 169208, Singapore",
        "location": {
          "latitude": 1.27877,
          "longitude": 103.82375
        }
      },
      {
        "expresswayName": "Yuan Ching Road, Ayer Rajah Expressway, Jurong East, Southwest, 618274, Singapore",
        "location": {
          "latitude": 1.32618,
          "longitude": 103.73028
        }
      },
      {
        "expresswayName": "Near NUS, Ayer Rajah Expressway, Queenstown, Southwest, 117541, Singapore",
        "location": {
          "latitude": 1.29792,
          "longitude": 103.78205
        }
      },
      {
        "expresswayName": "Near Dover Drive, Ayer Rajah Expressway, Queenstown, Southwest, 138683, Singapore",
        "location": {
          "latitude": 1.29939,
          "longitude": 103.7799
        }
      },
      {
        "expresswayName": "Clementi Avenue 6 Entrance, Ayer Rajah Expressway, Westpeak Terrace, Clementi, Southwest, 120428, Singapore",
        "location": {
          "latitude": 1.312019,
          "longitude": 103.763002
        }
      },
      {
        "expresswayName": "Towards Pandan Gardens, Ayer Rajah Expressway, Faber Crest, Clementi, Southwest, 126754, Singapore",
        "location": {
          "latitude": 1.32153,
          "longitude": 103.75273
        }
      },
      {
        "expresswayName": "Near West Coast Walk, Ayer Rajah Expressway, The Clementview, Clementi, Southwest, 120426, Singapore",
        "location": {
          "latitude": 1.31023,
          "longitude": 103.76438
        }
      },
      {
        "expresswayName": "Benoi Road, Ayer Rajah Expressway, Pioneer, Southwest, 628117, Singapore",
        "location": {
          "latitude": 1.32227,
          "longitude": 103.67453
        }
      }
    ],
    "Bukit Timah Expressway": [
      {
        "expresswayName": "Woodlands Flyover (Towards Checkpoint), Bukit Timah Expressway, Sungei Kadut, Northwest, 738799, Singapore",
        "location": {
          "latitude": 1.429588536,
          "longitude": 103.769311
        }
      },
      {
        "expresswayName": "Dairy Farm Flyover, Bukit Timah Expressway, Central Water Catchment, Northwest, 679518, Singapore",
        "location": {
          "latitude": 1.36728572,
          "longitude": 103.7794698
        }
      },
      {
        "expresswayName": "Mandai Road Entrance, Bukit Timah Expressway, Sungei Kadut, Northwest, 728654, Singapore",
        "location": {
          "latitude": 1.414142,
          "longitude": 103.771168
        }
      },
      {
        "expresswayName": "Bukit Timah Expressway, Central Water Catchment, Northwest, 677721, Singapore",
        "location": {
          "latitude": 1.3983,
          "longitude": 103.774247
        }
      },
      {
        "expresswayName": "Exit 5 to KJE (Towards Checkpoint), Bukit Timah Expressway, Fajar, Bukit Panjang, Northwest, 679944, Singapore",
        "location": {
          "latitude": 1.3865,
          "longitude": 103.7747
        }
      },
      {
        "expresswayName": "Bukit Timah Expressway, Pan-Island Expressway, Central Water Catchment, Northwest, 286966, Singapore",
        "location": {
          "latitude": 1.349428893,
          "longitude": 103.7952799
        }
      },
      {
        "expresswayName": "Gali Batu Flyover, Bukit Timah Expressway, Fajar, Sungei Kadut, Northwest, 670485, Singapore",
        "location": {
          "latitude": 1.39059,
          "longitude": 103.7717
        }
      }
    ],
    "Central Expressway": [
      {
        "expresswayName": "Braddell Flyover, Central Expressway, Bishan, Southeast, 359363, Singapore",
        "location": {
          "latitude": 1.34355015,
          "longitude": 103.8601984
        }
      },
      {
        "expresswayName": "St George Road, Central Expressway, Kallang, Singapore, Central, 328704, Singapore",
        "location": {
          "latitude": 1.32814722194857,
          "longitude": 103.862203282048
        }
      },
      {
        "expresswayName": "Ang Mo Kio North Flyover, Central Expressway, Ang Mo Kio, Singapore, Central, 560551, Singapore",
        "location": {
          "latitude": 1.375925022,
          "longitude": 103.8587986
        }
      },
      {
        "expresswayName": "Yio Chu Kang Flyover, Central Expressway, Ang Mo Kio, Central, 806105, Singapore",
        "location": {
          "latitude": 1.38861,
          "longitude": 103.85806
        }
      },
      {
        "expresswayName": "Bukit Merah Flyover, Central Expressway, Radin Mas, Bukit Merah, Singapore, Central, 169545, Singapore",
        "location": {
          "latitude": 1.28036584335876,
          "longitude": 103.830451146503
        }
      },
      {
        "expresswayName": "Ang Mo Kio Ave 1 Flyover, Central Expressway, Mei Hwan, Serangoon, Southeast, 579828, Singapore",
        "location": {
          "latitude": 1.35296,
          "longitude": 103.85719
        }
      }
    ],
    "East Coast Parkway": [
      {
        "expresswayName": "KPE/ECP, East Coast Parkway, Tanjong Rhu, Kallang, Southeast, 437440, Singapore",
        "location": {
          "latitude": 1.29531332,
          "longitude": 103.871146
        }
      },
      {
        "expresswayName": "Entrance from PIE, East Coast Parkway, Changi, Southeast, 819665, Singapore",
        "location": {
          "latitude": 1.33831,
          "longitude": 103.98032
        }
      },
      {
        "expresswayName": "Entrance from MCE, East Coast Parkway, Tanjong Rhu, Kallang, Southeast, 431014, Singapore",
        "location": {
          "latitude": 1.2958550156561,
          "longitude": 103.880314665981
        }
      },
      {
        "expresswayName": "Exit 2A to Changi Coast Road, East Coast Parkway, Tampines, Southeast, 499739, Singapore",
        "location": {
          "latitude": 1.32743,
          "longitude": 103.97383
        }
      },
      {
        "expresswayName": "Laguna Flyover, East Coast Parkway, Bedok, Southeast, 449294, Singapore",
        "location": {
          "latitude": 1.309330837,
          "longitude": 103.9350504
        }
      },
      {
        "expresswayName": "Marine Parade Flyover, East Coast Parkway, Marine Parade, Southeast, 440078, Singapore",
        "location": {
          "latitude": 1.30145145166066,
          "longitude": 103.910596320237
        }
      },
      {
        "expresswayName": "Tanjong Rhu Flyover, East Coast Parkway, Marine Parade, Southeast, 437874, Singapore",
        "location": {
          "latitude": 1.29565733262976,
          "longitude": 103.885283049309
        }
      }
    ],
    "Kallang-Paya Lebar Expressway": [
      {
        "expresswayName": "Defu Flyover, Kallang-Paya Lebar Expressway, Paya Lebar, Northeast, 530325, Singapore",
        "location": {
          "latitude": 1.363519886,
          "longitude": 103.905394
        }
      },
      {
        "expresswayName": "Kallang-Paya Lebar Expressway, Paya Lebar, Northeast, 539356, Singapore",
        "location": {
          "latitude": 1.357098686,
          "longitude": 103.902042
        }
      },
      {
        "expresswayName": "Kallang Way, Kallang-Paya Lebar Expressway, Balam Gardens, Geylang, Southeast, 370079, Singapore",
        "location": {
          "latitude": 1.32036078126842,
          "longitude": 103.877174116489
        }
      }
    ],
    "Kranji Expressway": [
      {
        "expresswayName": "Choa Chu Kang West Flyover, Kranji Expressway, Western Water Catchment, Southwest, 680435, Singapore",
        "location": {
          "latitude": 1.38647,
          "longitude": 103.74143
        }
      },
      {
        "expresswayName": "Entrance From Choa Chu Kang Drive, Kranji Expressway, Choa Chu Kang, Southwest, 680766, Singapore",
        "location": {
          "latitude": 1.3899,
          "longitude": 103.74843
        }
      }
    ],
    "Marina Coastal Expressway": [
      {
        "expresswayName": "Maxwell Road, Marina Coastal Expressway, Downtown Central, Downtown Core, Singapore, Central, 018962, Singapore",
        "location": {
          "latitude": 1.27414394350065,
          "longitude": 103.851316802547
        }
      },
      {
        "expresswayName": "MCE 1.02km, Marina Coastal Expressway, Straits View, Singapore, Central, 018990, Singapore",
        "location": {
          "latitude": 1.27066408655104,
          "longitude": 103.856977943394
        }
      },
      {
        "expresswayName": "MCE/ECP, Marina Coastal Expressway, Marina East, Southeast, 437437, Singapore",
        "location": {
          "latitude": 1.29409891409364,
          "longitude": 103.876056196568
        }
      },
      {
        "expresswayName": "Marina Boulevard, Marina Coastal Expressway, Marina South, Singapore, Central, 018988, Singapore",
        "location": {
          "latitude": 1.2752977149006,
          "longitude": 103.866390381759
        }
      }
    ],
    "Pan-Island Expressway": [
      {
        "expresswayName": "KPE/PIE, Pan-Island Expressway, Geylang, Southeast, 339630, Singapore",
        "location": {
          "latitude": 1.323957439,
          "longitude": 103.8728576
        }
      },
      {
        "expresswayName": "Bedok North, Pan-Island Expressway, Chai Chee, Bedok, Southeast, 469032, Singapore",
        "location": {
          "latitude": 1.3309693,
          "longitude": 103.9168616
        }
      },
      {
        "expresswayName": "Eunos Flyover, Pan-Island Expressway, Bedok, Northeast, 419592, Singapore",
        "location": {
          "latitude": 1.326024822,
          "longitude": 103.905625
        }
      },
      {
        "expresswayName": "Kim Keat Link, Pan-Island Expressway, Novena, Singapore, Central, 328958, Singapore",
        "location": {
          "latitude": 1.329334,
          "longitude": 103.858222
        }
      },
      {
        "expresswayName": "Mount Pleasant Flyover, Pan-Island Expressway, Novena, Singapore, Central, 297834, Singapore",
        "location": {
          "latitude": 1.32657403632366,
          "longitude": 103.826857295633
        }
      },
      {
        "expresswayName": "Adam Road, Pan-Island Expressway, Novena, Singapore, Central, 289899, Singapore",
        "location": {
          "latitude": 1.332124,
          "longitude": 103.81768
        }
      },
      {
        "expresswayName": "Bukit Timah Expressway, Pan-Island Expressway, Central Water Catchment, Northwest, 286966, Singapore",
        "location": {
          "latitude": 1.349428893,
          "longitude": 103.7952799
        }
      },
      {
        "expresswayName": "Nanyang Flyover, Pan-Island Expressway, Western Water Catchment, Southwest, 640849, Singapore",
        "location": {
          "latitude": 1.345996,
          "longitude": 103.69016
        }
      },
      {
        "expresswayName": "Entrance to PIE from ECP Changi, Pan-Island Expressway, Tampines, Southeast, 499803, Singapore",
        "location": {
          "latitude": 1.33771,
          "longitude": 103.977827
        }
      },
      {
        "expresswayName": "Exit 27 to Clementi Avenue 6, Pan-Island Expressway, Bukit Timah, Northwest, 599435, Singapore",
        "location": {
          "latitude": 1.332691,
          "longitude": 103.770278
        }
      },
      {
        "expresswayName": "Entrance from Simei Avenue, Pan-Island Expressway, Picardy Gardens, Tampines, Southeast, 520112, Singapore",
        "location": {
          "latitude": 1.340298,
          "longitude": 103.945652
        }
      },
      {
        "expresswayName": "Hong Kah Flyover, Pan-Island Expressway, Hong Kah, Jurong West, Southwest, 640558, Singapore",
        "location": {
          "latitude": 1.356299,
          "longitude": 103.716071
        }
      }
    ],
    "Seletar Expressway": [
      {
        "expresswayName": "Upper Thomson Flyover, Seletar Expressway, Yishun, Central, 787110, Singapore",
        "location": {
          "latitude": 1.39474081,
          "longitude": 103.81797086
        }
      },
      {
        "expresswayName": "Seletar Expressway, Mandai, Northwest, 738581, Singapore",
        "location": {
          "latitude": 1.422857,
          "longitude": 103.773005
        }
      },
      {
        "expresswayName": "Ulu Sembawang Flyover, Seletar Expressway, Woodlands, Northwest, 737924, Singapore",
        "location": {
          "latitude": 1.42214311,
          "longitude": 103.79542062
        }
      },
      {
        "expresswayName": "Marsiling Flyover, Seletar Expressway, Woodlands, Northwest, 737913, Singapore",
        "location": {
          "latitude": 1.42627712,
          "longitude": 103.78716637
        }
      },
      {
        "expresswayName": "Mandai Lake Flyover, Seletar Expressway, Yishun, Northwest, 779393, Singapore",
        "location": {
          "latitude": 1.41270056,
          "longitude": 103.80642712
        }
      }
    ],
    "Tampines Expressway": [
      {
        "expresswayName": "Tampines Expressway, Pasir Ris, Northeast, 510126, Singapore",
        "location": {
          "latitude": 1.365434,
          "longitude": 103.953997
        }
      },
      {
        "expresswayName": "Tampines Avenue 10 Entrance, Tampines Expressway, Pasir Ris, Northeast, 510759, Singapore",
        "location": {
          "latitude": 1.37704704,
          "longitude": 103.92946983
        }
      },
      {
        "expresswayName": "TPE(KPE) Exit, Tampines Expressway, Paya Lebar, Northeast, 520175, Singapore",
        "location": {
          "latitude": 1.37988658,
          "longitude": 103.92009174
        }
      },
      {
        "expresswayName": "Entrance To Tampines Flyover, Tampines Expressway, Pasir Ris, Northeast, 520175, Singapore",
        "location": {
          "latitude": 1.38432741,
          "longitude": 103.91585701
        }
      },
      {
        "expresswayName": "Exit to Punggol Flyover, Tampines Expressway, Seng Kang, Northeast, 820136, Singapore",
        "location": {
          "latitude": 1.39559294,
          "longitude": 103.90515712
        }
      }
    ],
    "Tuas Checkpoint": [
      {
        "expresswayName": "Tuas Checkpoint, Tuas Checkpoint - Block A1, Tuas, Southwest, 639937, Singapore",
        "location": {
          "latitude": 1.348697862,
          "longitude": 103.6350413
        }
      }
    ],
    "Woodlands Checkpoint": [
      {
        "expresswayName": "Woodlands Checkpoint, 21, Woodlands Crossing, Woodlands, Singapore, Northwest, 738203, Singapore",
        "location": {
          "latitude": 1.445554109,
          "longitude": 103.7683397
        }
      }
    ]
  }