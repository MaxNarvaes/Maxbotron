import { stadiumInfo } from "../stadiumInfo";

export const stadium: stadiumInfo = {
    name: "6v6",
    minPlayers: 9,
    maxPlayers: 12,
    stadiumText: `
    {
        "name": "SINDICATO 6V6",
        "width": 1025,
        "height": 490,
        "spawnDistance": 450,
        "bg": {
            "color": "2a3a40"
        },
        "vertexes": [
            {
                "x": -950,
                "y": 460,
                "bCoef": 1.15,
                "cMask": [
                    "ball"
                ],
                "trait": "ballArea",
                "curve": 0,
                "color": "b3b6b6"
            },
            {
                "x": -950,
                "y": 95,
                "bCoef": 1.15,
                "cMask": [
                    "red",
                    "blue",
                    "ball"
                ],
                "trait": "ballArea",
                "curve": 0,
                "color": "b3b6b6"
            },
            {
                "x": -950,
                "y": -95,
                "bCoef": 1.15,
                "cMask": [
                    "red",
                    "blue",
                    "ball"
                ],
                "trait": "ballArea",
                "curve": 0,
                "color": "b3b6b6"
            },
            {
                "x": -950,
                "y": -460,
                "bCoef": 1.15,
                "cMask": [
                    "ball"
                ],
                "trait": "ballArea",
                "curve": 0,
                "color": "b3b6b6"
            },
            {
                "x": 950,
                "y": 456,
                "bCoef": 1.15,
                "cMask": [
                    "ball"
                ],
                "trait": "ballArea",
                "curve": 0,
                "color": "b3b6b6"
            },
            {
                "x": 950,
                "y": 95,
                "bCoef": 1.15,
                "cMask": [
                    "red",
                    "blue",
                    "ball"
                ],
                "trait": "ballArea",
                "curve": 0,
                "color": "b3b6b6"
            },
            {
                "x": 950,
                "y": -95,
                "bCoef": 1.15,
                "cMask": [
                    "red",
                    "blue",
                    "ball"
                ],
                "trait": "ballArea",
                "curve": 0,
                "color": "b3b6b6"
            },
            {
                "x": 950,
                "y": -456,
                "bCoef": 1.15,
                "cMask": [
                    "ball"
                ],
                "trait": "ballArea",
                "curve": 0,
                "color": "b3b6b6"
            },
            {
                "x": 0,
                "y": 495,
                "trait": "kickOffBarrier"
            },
            {
                "x": 0,
                "y": 130,
                "trait": "kickOffBarrier",
                "color": "b3b6b6"
            },
            {
                "x": 0,
                "y": -130,
                "trait": "line",
                "color": "b3b6b6"
            },
            {
                "x": 0,
                "y": -495,
                "trait": "kickOffBarrier"
            },
            {
                "x": -1000,
                "y": -95,
                "bCoef": 0.1,
                "cMask": [
                    "red",
                    "blue",
                    "ball"
                ],
                "trait": "goalNet",
                "curve": 0
            },
            {
                "x": 1000,
                "y": -95,
                "bCoef": 0.1,
                "cMask": [
                    "red",
                    "blue",
                    "ball"
                ],
                "trait": "goalNet",
                "curve": 0
            },
            {
                "x": -1000,
                "y": 95,
                "bCoef": 0.1,
                "cMask": [
                    "red",
                    "blue",
                    "ball"
                ],
                "trait": "goalNet",
                "curve": 0
            },
            {
                "x": 1000,
                "y": 95,
                "bCoef": 0.1,
                "cMask": [
                    "red",
                    "blue",
                    "ball"
                ],
                "trait": "goalNet",
                "curve": 0
            },
            {
                "x": 951,
                "y": 460,
                "bCoef": 1,
                "trait": "ballArea",
                "color": "b3b6b6"
            },
            {
                "x": 951,
                "y": -460,
                "bCoef": 1,
                "trait": "ballArea",
                "color": "b3b6b6"
            },
            {
                "x": 0,
                "y": 130,
                "trait": "kickOffBarrier",
                "color": "b3b6b6"
            },
            {
                "x": 0,
                "y": -130,
                "trait": "kickOffBarrier",
                "color": "b3b6b6"
            },
            {
                "x": 956.75,
                "y": -101.5,
                "bCoef": 1,
                "cMask": [
                    "ball"
                ],
                "trait": "line",
                "curve": 0
            },
            {
                "x": 956.75,
                "y": -460,
                "bCoef": 1,
                "cMask": [
                    "ball"
                ],
                "trait": "ballArea",
                "curve": 0
            },
            {
                "x": -956.75,
                "y": -101.5,
                "bCoef": 1,
                "cMask": [
                    "ball"
                ],
                "trait": "line",
                "curve": 0
            },
            {
                "x": -956.75,
                "y": -460,
                "bCoef": 1,
                "cMask": [
                    "ball"
                ],
                "trait": "ballArea",
                "curve": 0
            },
            {
                "x": -956.75,
                "y": 101.5,
                "bCoef": 1,
                "cMask": [
                    "ball"
                ],
                "trait": "line",
                "curve": 0
            },
            {
                "x": -956.75,
                "y": 460,
                "bCoef": 1,
                "cMask": [
                    "ball"
                ],
                "trait": "ballArea",
                "curve": 0
            },
            {
                "x": 956.75,
                "y": 101.5,
                "bCoef": 1,
                "cMask": [
                    "ball"
                ],
                "trait": "line",
                "curve": 0
            },
            {
                "x": 956.75,
                "y": 460,
                "bCoef": 1,
                "cMask": [
                    "ball"
                ],
                "trait": "ballArea",
                "curve": 0
            },
            {
                "x": 640,
                "y": 100,
                "bCoef": 0,
                "cMask": [
                    ""
                ],
                "trait": "line",
                "curve": -90,
                "color": "b3b6b6"
            },
            {
                "x": 850,
                "y": 330,
                "bCoef": 0,
                "cMask": [
                    ""
                ],
                "trait": "line",
                "curve": -90,
                "color": "b3b6b6"
            },
            {
                "x": 640,
                "y": -100,
                "bCoef": 0,
                "cMask": [
                    ""
                ],
                "trait": "line",
                "curve": 90,
                "color": "b3b6b6"
            },
            {
                "x": -450,
                "y": 460,
                "bCoef": 0.1,
                "trait": "line"
            },
            {
                "x": 950,
                "y": 200,
                "bCoef": 0.1,
                "trait": "line"
            },
            {
                "x": 950,
                "y": -200,
                "bCoef": 0.1,
                "trait": "line"
            },
            {
                "x": -450,
                "y": -460,
                "bCoef": 0.1,
                "trait": "line"
            },
            {
                "x": 450,
                "y": 460,
                "bCoef": 0.1,
                "trait": "line"
            },
            {
                "x": 450,
                "y": -460,
                "bCoef": 0.1,
                "trait": "line"
            },
            {
                "x": -950,
                "y": -200,
                "bCoef": 0.1,
                "trait": "line"
            },
            {
                "x": -950,
                "y": 200,
                "bCoef": 0.1,
                "trait": "line"
            },
            {
                "x": -950,
                "y": 435,
                "bCoef": 0.1,
                "trait": "line",
                "curve": -90
            },
            {
                "x": -925,
                "y": 460,
                "bCoef": 0.1,
                "trait": "line",
                "curve": -90
            },
            {
                "x": -950,
                "y": -435,
                "bCoef": 0.1,
                "trait": "line",
                "curve": 90
            },
            {
                "x": -925,
                "y": -460,
                "bCoef": 0.1,
                "trait": "line",
                "curve": 90
            },
            {
                "x": 950,
                "y": -435,
                "bCoef": 0.1,
                "trait": "line",
                "curve": -90
            },
            {
                "x": 925,
                "y": -460,
                "bCoef": 0.1,
                "trait": "line",
                "curve": -90
            },
            {
                "x": 950,
                "y": 435,
                "bCoef": 0.1,
                "trait": "line",
                "curve": 90
            },
            {
                "x": 925,
                "y": 460,
                "bCoef": 0.1,
                "trait": "line",
                "curve": 90
            },
            {
                "x": 850,
                "y": -330,
                "bCoef": 0,
                "trait": "line",
                "curve": 90,
                "color": "b3b6b6"
            },
            {
                "x": -640,
                "y": 100,
                "bCoef": 0,
                "cMask": [
                    ""
                ],
                "trait": "line",
                "curve": 90,
                "color": "b3b6b6"
            },
            {
                "x": -850,
                "y": 330,
                "bCoef": 0,
                "trait": "line",
                "curve": 90,
                "color": "b3b6b6"
            },
            {
                "x": -640,
                "y": -100,
                "bCoef": 0,
                "cMask": [
                    ""
                ],
                "trait": "line",
                "curve": -90,
                "color": "b3b6b6"
            },
            {
                "x": -850,
                "y": -330,
                "bCoef": 0,
                "cMask": [
                    ""
                ],
                "trait": "line",
                "curve": -90,
                "color": "b3b6b6"
            },
            {
                "x": -950,
                "y": 330,
                "bCoef": 0,
                "trait": "line",
                "color": "b3b6b6"
            },
            {
                "x": -950,
                "y": -330,
                "bCoef": 0,
                "trait": "line",
                "color": "b3b6b6"
            },
            {
                "x": 950,
                "y": 330,
                "bCoef": 0,
                "trait": "line",
                "color": "b3b6b6"
            },
            {
                "x": 950,
                "y": -330,
                "bCoef": 0,
                "trait": "line",
                "color": "b3b6b6"
            },
            {
                "x": -640,
                "y": -4.7,
                "bCoef": 0.1,
                "trait": "line",
                "curve": 180
            },
            {
                "x": -640,
                "y": 4.7,
                "bCoef": 0.1,
                "trait": "line",
                "curve": 180
            },
            {
                "x": 640,
                "y": -4.7,
                "bCoef": 0.1,
                "trait": "line",
                "curve": 180
            },
            {
                "x": 640,
                "y": 4.7,
                "bCoef": 0.1,
                "trait": "line",
                "curve": 180
            },
            {
                "x": 950,
                "y": -30,
                "bCoef": 0.1,
                "trait": "line",
                "color": "33B4FF"
            },
            {
                "x": 950,
                "y": 30,
                "bCoef": 0.1,
                "trait": "line",
                "color": "33B4FF"
            },
            {
                "x": -950,
                "y": -30,
                "cMask": [
                    "wall"
                ],
                "color": "ff3030"
            },
            {
                "x": -950,
                "y": 30,
                "cMask": [
                    "wall"
                ],
                "color": "ff3030"
            },
            {
                "x": -1006.5,
                "y": 101.5,
                "bCoef": 1,
                "cMask": [
                    "ball"
                ]
            },
            {
                "x": -1006.5,
                "y": -101.5,
                "bCoef": 1,
                "cMask": [
                    "ball"
                ]
            },
            {
                "x": 1006.5,
                "y": -101.5,
                "bCoef": 1,
                "cMask": [
                    "ball"
                ]
            },
            {
                "x": 1006.5,
                "y": 101.5,
                "bCoef": 1,
                "cMask": [
                    "ball"
                ]
            },
            {
                "x": 0,
                "y": -460,
                "cMask": [
                    "wall"
                ],
                "vis": true,
                "color": "b3b6b6"
            },
            {
                "x": 0,
                "y": -130,
                "cMask": [
                    "wall"
                ],
                "vis": true,
                "color": "b3b6b6"
            },
            {
                "x": 0,
                "y": 460,
                "cMask": [
                    "wall"
                ],
                "vis": true,
                "color": "b3b6b6"
            },
            {
                "x": 0,
                "y": 130,
                "cMask": [
                    "wall"
                ],
                "vis": true,
                "color": "b3b6b6"
            },
            {
                "x": -957.25,
                "y": 101.5,
                "bCoef": 1,
                "cMask": [
                    "ball"
                ],
                "trait": "line",
                "curve": 0
            },
            {
                "x": -957.25,
                "y": 460,
                "bCoef": 1,
                "cMask": [
                    "ball"
                ],
                "trait": "ballArea",
                "curve": 0
            },
            {
                "x": 957.25,
                "y": 101.5,
                "bCoef": 1,
                "cMask": [
                    "ball"
                ],
                "trait": "line",
                "curve": 0
            },
            {
                "x": 957.25,
                "y": 460,
                "bCoef": 1,
                "cMask": [
                    "ball"
                ],
                "trait": "ballArea",
                "curve": 0
            },
            {
                "x": 957.25,
                "y": -101.5,
                "bCoef": 1,
                "cMask": [
                    "ball"
                ],
                "trait": "line",
                "curve": 0
            },
            {
                "x": 957.25,
                "y": -460,
                "bCoef": 1,
                "cMask": [
                    "ball"
                ],
                "trait": "ballArea",
                "curve": 0
            },
            {
                "x": -957.25,
                "y": -101.5,
                "bCoef": 1,
                "cMask": [
                    "ball"
                ],
                "trait": "line",
                "curve": 0
            },
            {
                "x": -957.25,
                "y": -460,
                "bCoef": 1,
                "cMask": [
                    "ball"
                ],
                "trait": "ballArea",
                "curve": 0
            },
            {
                "x": 52.071777835492554,
                "y": 83.67217489691612,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "color": "4fff4f"
            },
            {
                "x": 76.81510337895645,
                "y": 63.50249783549256,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "color": "4fff4f"
            },
            {
                "x": 25.678486266524413,
                "y": 37.585969881826955,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "color": "4fff4f"
            },
            {
                "x": -22.607353158766433,
                "y": 41.279276533048815,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "color": "4fff4f"
            },
            {
                "x": -21.67559364080677,
                "y": -62.574819763653906,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "color": "4fff4f"
            },
            {
                "x": -24.53827851978661,
                "y": -19.937960676726103,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "color": "4fff4f"
            },
            {
                "x": 20.991036330575643,
                "y": -19.725612702128736,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "color": "4fff4f"
            },
            {
                "x": -19.29409691774627,
                "y": -111.79241870690441,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "color": "4fff4f"
            },
            {
                "x": -4.677164097342876,
                "y": -99.14320077874305,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "color": "4fff4f"
            },
            {
                "x": -9.440157543463894,
                "y": -84.06038819935983,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "color": "4fff4f"
            },
            {
                "x": -0.24212313326219714,
                "y": -70.5131421738556,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "color": "4fff4f"
            },
            {
                "x": -23.12533084590762,
                "y": -75.60408810201695,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "color": "4fff4f"
            },
            {
                "x": 40.31078400000002,
                "y": 89.43955200000003,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ]
            },
            {
                "x": -47.86905600000002,
                "y": -8.817984000000004,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ]
            },
            {
                "x": 44.08992000000002,
                "y": 88.17984000000003,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ]
            },
            {
                "x": -44.08992000000002,
                "y": -10.077696000000012,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ]
            },
            {
                "x": 28.197910266524413,
                "y": 40.105393881826956,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "color": "4fff4f"
            },
            {
                "x": -20.087929158766432,
                "y": 43.798700533048816,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "color": "4fff4f"
            },
            {
                "x": -20.087929158766432,
                "y": 41.279276533048815,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "color": "4fff4f"
            },
            {
                "x": -19.15616964080677,
                "y": -62.574819763653906,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "color": "4fff4f"
            },
            {
                "x": -26.10032139978661,
                "y": -14.8991126767261,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "color": "4fff4f"
            },
            {
                "x": 20.789482410575644,
                "y": -14.686764702128732,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "color": "4fff4f"
            },
            {
                "x": 55.850913835492555,
                "y": 83.67217489691612,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "color": "4fff4f"
            },
            {
                "x": 29.457622266524414,
                "y": 37.585969881826955,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "color": "4fff4f"
            },
            {
                "x": 57.110625835492556,
                "y": 83.67217489691612,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "color": "4fff4f"
            },
            {
                "x": 81.85395137895645,
                "y": 63.50249783549256,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "color": "4fff4f"
            },
            {
                "x": -19.15616964080677,
                "y": -61.315107763653906,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "color": "4fff4f"
            },
            {
                "x": -16.77467291774627,
                "y": -110.5327067069044,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "color": "4fff4f"
            },
            {
                "x": -19.15616964080677,
                "y": -61.315107763653906,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "color": "4fff4f"
            },
            {
                "x": -16.77467291774627,
                "y": -110.5327067069044,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "color": "4fff4f"
            },
            {
                "x": -0.24212313326219714,
                "y": -70.5131421738556,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "color": "4fff4f"
            },
            {
                "x": -23.12533084590762,
                "y": -75.60408810201695,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "color": "4fff4f"
            }
        ],
        "segments": [
            {
                "v0": 0,
                "v1": 1,
                "curve": 0,
                "trait": "ballArea"
            },
            {
                "v0": 2,
                "v1": 3,
                "trait": "ballArea"
            },
            {
                "v0": 4,
                "v1": 5,
                "trait": "ballArea",
                "x": 951
            },
            {
                "v0": 6,
                "v1": 7,
                "trait": "ballArea",
                "x": 951
            },
            {
                "v0": 8,
                "v1": 9,
                "trait": "kickOffBarrier",
                "x": 0
            },
            {
                "v0": 9,
                "v1": 10,
                "curve": 180,
                "cGroup": [
                    "blueKO"
                ],
                "trait": "kickOffBarrier"
            },
            {
                "v0": 9,
                "v1": 10,
                "curve": -180,
                "cGroup": [
                    "redKO"
                ],
                "trait": "kickOffBarrier"
            },
            {
                "v0": 10,
                "v1": 11,
                "trait": "kickOffBarrier",
                "x": 0
            },
            {
                "v0": 2,
                "v1": 12,
                "curve": 0,
                "vis": true,
                "color": "FFFFFF",
                "bCoef": 0.1,
                "cMask": [
                    "red",
                    "blue",
                    "ball"
                ],
                "trait": "goalNet",
                "y": -95
            },
            {
                "v0": 6,
                "v1": 13,
                "curve": 0,
                "vis": true,
                "color": "FFFFFF",
                "bCoef": 0.1,
                "cMask": [
                    "red",
                    "blue",
                    "ball"
                ],
                "trait": "goalNet",
                "y": -95
            },
            {
                "v0": 1,
                "v1": 14,
                "curve": 0,
                "vis": true,
                "color": "FFFFFF",
                "bCoef": 0.1,
                "cMask": [
                    "red",
                    "blue",
                    "ball"
                ],
                "trait": "goalNet",
                "y": 95
            },
            {
                "v0": 5,
                "v1": 15,
                "curve": 0,
                "vis": true,
                "color": "FFFFFF",
                "bCoef": 0.1,
                "cMask": [
                    "red",
                    "blue",
                    "ball"
                ],
                "trait": "goalNet",
                "y": 95
            },
            {
                "v0": 12,
                "v1": 14,
                "curve": 0,
                "vis": true,
                "color": "FFFFFF",
                "bCoef": 0.1,
                "cMask": [
                    "red",
                    "blue",
                    "ball"
                ],
                "trait": "goalNet",
                "x": -1000
            },
            {
                "v0": 13,
                "v1": 15,
                "curve": 0,
                "vis": true,
                "color": "FFFFFF",
                "bCoef": 0.1,
                "cMask": [
                    "red",
                    "blue",
                    "ball"
                ],
                "trait": "goalNet",
                "x": 1000
            },
            {
                "v0": 1,
                "v1": 0,
                "curve": 0,
                "vis": true,
                "color": "b3b6b6",
                "bCoef": 1.15,
                "cMask": [
                    "ball"
                ],
                "trait": "ballArea",
                "x": -950
            },
            {
                "v0": 5,
                "v1": 4,
                "curve": 0,
                "vis": true,
                "color": "b3b6b6",
                "bCoef": 1.15,
                "cMask": [
                    "ball"
                ],
                "trait": "ballArea",
                "x": 950
            },
            {
                "v0": 2,
                "v1": 3,
                "curve": 0,
                "vis": true,
                "color": "b3b6b6",
                "bCoef": 1.15,
                "cMask": [
                    "ball"
                ],
                "trait": "ballArea",
                "x": -950
            },
            {
                "v0": 6,
                "v1": 7,
                "curve": 0,
                "vis": true,
                "color": "b3b6b6",
                "bCoef": 1.15,
                "cMask": [
                    "ball"
                ],
                "trait": "ballArea",
                "x": 950
            },
            {
                "v0": 0,
                "v1": 16,
                "vis": true,
                "color": "b3b6b6",
                "bCoef": 1,
                "trait": "ballArea",
                "y": 460
            },
            {
                "v0": 3,
                "v1": 17,
                "vis": true,
                "color": "b3b6b6",
                "bCoef": 1,
                "trait": "ballArea",
                "y": -460
            },
            {
                "v0": 10,
                "v1": 9,
                "curve": -180,
                "vis": true,
                "color": "b3b6b6",
                "bCoef": 0,
                "trait": "line"
            },
            {
                "v0": 19,
                "v1": 18,
                "curve": 180,
                "vis": true,
                "color": "b3b6b6",
                "bCoef": 0,
                "trait": "line"
            },
            {
                "v0": 2,
                "v1": 1,
                "curve": 0,
                "vis": true,
                "color": "ff3030",
                "bCoef": 0,
                "trait": "line",
                "x": -950
            },
            {
                "v0": 6,
                "v1": 5,
                "curve": 0,
                "vis": true,
                "color": "33B4FF",
                "bCoef": 0,
                "trait": "line"
            },
            {
                "v0": 20,
                "v1": 21,
                "curve": 0,
                "vis": false,
                "color": "FFFFFF",
                "bCoef": 1,
                "cMask": [
                    "ball"
                ],
                "trait": "ballArea",
                "x": 956.75
            },
            {
                "v0": 22,
                "v1": 23,
                "curve": 0,
                "vis": false,
                "color": "FFFFFF",
                "bCoef": 1,
                "cMask": [
                    "ball"
                ],
                "trait": "ballArea",
                "x": -956.75
            },
            {
                "v0": 24,
                "v1": 25,
                "curve": 0,
                "vis": false,
                "color": "FFFFFF",
                "bCoef": 1,
                "cMask": [
                    "ball"
                ],
                "trait": "ballArea",
                "x": -956.75
            },
            {
                "v0": 26,
                "v1": 27,
                "curve": 0,
                "vis": false,
                "color": "FFFFFF",
                "bCoef": 1,
                "cMask": [
                    "ball"
                ],
                "trait": "ballArea",
                "x": 956.75
            },
            {
                "v0": 28,
                "v1": 29,
                "curve": -90,
                "vis": true,
                "color": "b3b6b6",
                "bCoef": 0,
                "cMask": [
                    ""
                ],
                "trait": "line"
            },
            {
                "v0": 40,
                "v1": 39,
                "curve": -90,
                "vis": true,
                "color": "F8F8F8",
                "bCoef": 0.1,
                "trait": "line"
            },
            {
                "v0": 42,
                "v1": 41,
                "curve": 90,
                "vis": true,
                "color": "F8F8F8",
                "bCoef": 0.1,
                "trait": "line"
            },
            {
                "v0": 44,
                "v1": 43,
                "curve": -90,
                "vis": true,
                "color": "F8F8F8",
                "bCoef": 0.1,
                "trait": "line"
            },
            {
                "v0": 46,
                "v1": 45,
                "curve": 90,
                "vis": true,
                "color": "F8F8F8",
                "bCoef": 0.1,
                "trait": "line"
            },
            {
                "v0": 30,
                "v1": 47,
                "curve": 90,
                "vis": true,
                "color": "b3b6b6",
                "bCoef": 0,
                "trait": "line"
            },
            {
                "v0": 48,
                "v1": 49,
                "curve": 90,
                "vis": true,
                "color": "b3b6b6",
                "bCoef": 0,
                "trait": "line"
            },
            {
                "v0": 50,
                "v1": 51,
                "curve": -90,
                "vis": true,
                "color": "b3b6b6",
                "bCoef": 0,
                "cMask": [
                    ""
                ],
                "trait": "line"
            },
            {
                "v0": 49,
                "v1": 52,
                "curve": 0,
                "vis": true,
                "color": "b3b6b6",
                "bCoef": 0,
                "trait": "line",
                "y": 330
            },
            {
                "v0": 51,
                "v1": 53,
                "curve": 0,
                "vis": true,
                "color": "b3b6b6",
                "bCoef": 0,
                "trait": "line",
                "y": -330
            },
            {
                "v0": 48,
                "v1": 50,
                "curve": 0,
                "vis": true,
                "color": "b3b6b6",
                "bCoef": 0,
                "trait": "line",
                "x": -640
            },
            {
                "v0": 29,
                "v1": 54,
                "curve": 0,
                "vis": true,
                "color": "b3b6b6",
                "bCoef": 0,
                "trait": "line",
                "y": 330
            },
            {
                "v0": 47,
                "v1": 55,
                "curve": 0,
                "vis": true,
                "color": "b3b6b6",
                "bCoef": 0,
                "trait": "line",
                "y": -330
            },
            {
                "v0": 28,
                "v1": 30,
                "curve": 0,
                "vis": true,
                "color": "b3b6b6",
                "bCoef": 0,
                "trait": "line",
                "x": 640
            },
            {
                "v0": 56,
                "v1": 57,
                "curve": 120,
                "vis": true,
                "color": "F8F8F8",
                "bCoef": 0.1,
                "trait": "line",
                "x": -640
            },
            {
                "v0": 57,
                "v1": 56,
                "curve": 180,
                "vis": true,
                "color": "F8F8F8",
                "bCoef": 0.1,
                "trait": "line",
                "x": -640
            },
            {
                "v0": 56,
                "v1": 57,
                "curve": 180,
                "vis": true,
                "color": "F8F8F8",
                "bCoef": 0.1,
                "trait": "line",
                "x": -640
            },
            {
                "v0": 57,
                "v1": 56,
                "curve": 120,
                "vis": true,
                "color": "F8F8F8",
                "bCoef": 0.1,
                "trait": "line",
                "x": -640
            },
            {
                "v0": 58,
                "v1": 59,
                "curve": 120,
                "vis": true,
                "color": "F8F8F8",
                "bCoef": 0.1,
                "trait": "line",
                "x": 640
            },
            {
                "v0": 59,
                "v1": 58,
                "curve": 180,
                "vis": true,
                "color": "F8F8F8",
                "bCoef": 0.1,
                "trait": "line",
                "x": 640
            },
            {
                "v0": 58,
                "v1": 59,
                "curve": 180,
                "vis": true,
                "color": "F8F8F8",
                "bCoef": 0.1,
                "trait": "line",
                "x": 640
            },
            {
                "v0": 59,
                "v1": 58,
                "curve": 120,
                "vis": true,
                "color": "F8F8F8",
                "bCoef": 0.1,
                "trait": "line",
                "x": 640
            },
            {
                "v0": 60,
                "v1": 61,
                "curve": 0,
                "vis": true,
                "color": "33B4FF",
                "bCoef": 0.1,
                "trait": "line",
                "x": 950
            },
            {
                "v0": 62,
                "v1": 63,
                "curve": 0,
                "vis": true,
                "color": "ff3030",
                "cMask": [
                    "wall"
                ],
                "x": -950
            },
            {
                "v0": 24,
                "v1": 64,
                "curve": 0,
                "vis": false,
                "color": "FFFFFF",
                "bCoef": 1,
                "cMask": [
                    "ball"
                ],
                "y": 101.5
            },
            {
                "v0": 64,
                "v1": 65,
                "curve": 0,
                "vis": false,
                "color": "FFFFFF",
                "bCoef": 1,
                "cMask": [
                    "ball"
                ],
                "x": -1006.5
            },
            {
                "v0": 65,
                "v1": 22,
                "curve": 0,
                "vis": false,
                "color": "FFFFFF",
                "bCoef": 1,
                "cMask": [
                    "ball"
                ],
                "y": -101.5
            },
            {
                "v0": 20,
                "v1": 66,
                "curve": 0,
                "vis": false,
                "color": "FFFFFF",
                "bCoef": 1,
                "cMask": [
                    "ball"
                ],
                "y": -101.5
            },
            {
                "v0": 66,
                "v1": 67,
                "curve": 0,
                "vis": false,
                "color": "FFFFFF",
                "bCoef": 1,
                "cMask": [
                    "ball"
                ],
                "x": 1006.5
            },
            {
                "v0": 67,
                "v1": 26,
                "curve": 0,
                "vis": false,
                "color": "FFFFFF",
                "bCoef": 1,
                "cMask": [
                    "ball"
                ],
                "y": 101.5
            },
            {
                "v0": 68,
                "v1": 69,
                "vis": true,
                "color": "b3b6b6",
                "cMask": [
                    "wall"
                ],
                "x": 0
            },
            {
                "v0": 70,
                "v1": 71,
                "vis": true,
                "color": "b3b6b6",
                "cMask": [
                    "wall"
                ],
                "x": 0
            },
            {
                "v0": 72,
                "v1": 73,
                "curve": 0,
                "vis": false,
                "color": "FFFFFF",
                "bCoef": 1,
                "cMask": [
                    "ball"
                ],
                "trait": "ballArea",
                "x": -957.25
            },
            {
                "v0": 74,
                "v1": 75,
                "curve": 0,
                "vis": false,
                "color": "FFFFFF",
                "bCoef": 1,
                "cMask": [
                    "ball"
                ],
                "trait": "ballArea",
                "x": 957.25
            },
            {
                "v0": 76,
                "v1": 77,
                "curve": 0,
                "vis": false,
                "color": "FFFFFF",
                "bCoef": 1,
                "cMask": [
                    "ball"
                ],
                "trait": "ballArea",
                "x": 957.25
            },
            {
                "v0": 78,
                "v1": 79,
                "curve": 0,
                "vis": false,
                "color": "FFFFFF",
                "bCoef": 1,
                "cMask": [
                    "ball"
                ],
                "trait": "ballArea",
                "x": -957.25
            },
            {
                "v0": 80,
                "v1": 81,
                "curve": -18.080284135948165,
                "color": "4fff4f",
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ]
            },
            {
                "v0": 80,
                "v1": 82,
                "color": "4fff4f",
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ]
            },
            {
                "v0": 82,
                "v1": 83,
                "color": "4fff4f",
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ]
            },
            {
                "v0": 83,
                "v1": 84,
                "color": "4fff4f",
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ]
            },
            {
                "v0": 85,
                "v1": 86,
                "color": "4fff4f",
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ]
            },
            {
                "v0": 84,
                "v1": 87,
                "curve": 192.2249265157342,
                "color": "4fff4f",
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ]
            },
            {
                "v0": 87,
                "v1": 84,
                "curve": 184.05714559779435,
                "color": "4fff4f",
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ]
            },
            {
                "v0": 88,
                "v1": 89,
                "curve": 190,
                "color": "4fff4f",
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ]
            },
            {
                "v0": 88,
                "v1": 89,
                "curve": 190,
                "color": "4fff4f",
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ]
            },
            {
                "v0": 89,
                "v1": 88,
                "curve": 187.26362863061175,
                "color": "4fff4f",
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ]
            },
            {
                "v0": 90,
                "v1": 91,
                "curve": 50,
                "color": "4fff4f",
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ]
            },
            {
                "v0": 92,
                "v1": 93,
                "curve": 190,
                "color": "4fff4f",
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ]
            },
            {
                "v0": 94,
                "v1": 95,
                "curve": 190,
                "color": "4fff4f",
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ]
            },
            {
                "v0": 96,
                "v1": 97,
                "color": "4fff4f",
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ]
            },
            {
                "v0": 98,
                "v1": 99,
                "color": "4fff4f",
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ]
            },
            {
                "v0": 100,
                "v1": 101,
                "color": "4fff4f",
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ]
            },
            {
                "v0": 102,
                "v1": 103,
                "color": "4fff4f",
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ]
            },
            {
                "v0": 104,
                "v1": 105,
                "curve": -18.080284135948165,
                "color": "4fff4f",
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ]
            },
            {
                "v0": 106,
                "v1": 107,
                "curve": 192.2249265157342,
                "color": "4fff4f",
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ]
            },
            {
                "v0": 109,
                "v1": 108,
                "curve": 184.05714559779435,
                "color": "4fff4f",
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ]
            },
            {
                "v0": 110,
                "v1": 111,
                "curve": 50,
                "color": "4fff4f",
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ]
            }
        ],
        "goals": [
            {
                "p0": [
                    -958.1,
                    -95
                ],
                "p1": [
                    -958.1,
                    95
                ],
                "team": "red"
            },
            {
                "p0": [
                    958.1,
                    95
                ],
                "p1": [
                    958.1,
                    -95
                ],
                "team": "blue"
            }
        ],
        "discs": [
            {
                "radius": 5.4,
                "pos": [
                    -950,
                    95
                ],
                "color": "ff3030",
                "bCoef": 0.55,
                "trait": "goalPost"
            },
            {
                "radius": 5.4,
                "pos": [
                    -950,
                    -95
                ],
                "color": "ff3030",
                "bCoef": 0.55,
                "trait": "goalPost"
            },
            {
                "radius": 5.4,
                "pos": [
                    950,
                    95
                ],
                "color": "33B4FF",
                "bCoef": 0.55,
                "trait": "goalPost"
            },
            {
                "radius": 5.4,
                "pos": [
                    950,
                    -95
                ],
                "color": "33B4FF",
                "bCoef": 0.55,
                "trait": "goalPost"
            },
            {
                "radius": 3,
                "invMass": 0,
                "pos": [
                    -950,
                    460
                ],
                "color": "FFCC00",
                "bCoef": 0.1,
                "trait": "line"
            },
            {
                "radius": 3,
                "invMass": 0,
                "pos": [
                    -950,
                    -460
                ],
                "color": "FFCC00",
                "bCoef": 0.1,
                "trait": "line"
            },
            {
                "radius": 3,
                "invMass": 0,
                "pos": [
                    950,
                    -460
                ],
                "color": "FFCC00",
                "bCoef": 0.1,
                "trait": "line"
            },
            {
                "radius": 3,
                "invMass": 0,
                "pos": [
                    950,
                    460
                ],
                "color": "FFCC00",
                "bCoef": 0.1,
                "trait": "line"
            }
        ],
        "planes": [
            {
                "normal": [
                    0,
                    1
                ],
                "dist": -460,
                "trait": "ballArea"
            },
            {
                "normal": [
                    0,
                    -1
                ],
                "dist": -460,
                "trait": "ballArea"
            },
            {
                "normal": [
                    0,
                    1
                ],
                "dist": -495,
                "bCoef": 0.2,
                "cMask": [
                    "all"
                ]
            },
            {
                "normal": [
                    0,
                    -1
                ],
                "dist": -495,
                "bCoef": 0.2,
                "cMask": [
                    "all"
                ]
            },
            {
                "normal": [
                    1,
                    0
                ],
                "dist": -1030,
                "bCoef": 0.2,
                "cMask": [
                    "all"
                ]
            },
            {
                "normal": [
                    -1,
                    0
                ],
                "dist": -1030,
                "bCoef": 0.2,
                "cMask": [
                    "all"
                ]
            }
        ],
        "traits": {
            "ballArea": {
                "vis": false,
                "bCoef": 1,
                "cMask": [
                    "ball"
                ]
            },
            "goalPost": {
                "radius": 8,
                "invMass": 0,
                "bCoef": 1
            },
            "goalNet": {
                "vis": true,
                "bCoef": 0.1,
                "cMask": [
                    "all"
                ]
            },
            "kickOffBarrier": {
                "vis": false,
                "bCoef": 0.1,
                "cGroup": [
                    "redKO",
                    "blueKO"
                ],
                "cMask": [
                    "red",
                    "blue"
                ]
            },
            "line": {
                "vis": true,
                "bCoef": 0,
                "cMask": [
                    ""
                ]
            },
            "arco": {
                "radius": 2,
                "cMask": [
                    "n/d"
                ],
                "color": "cccccc"
            },
            "rusito": {
                "color": "444749"
            },
            "assad": {
                "color": "444749"
            }
        },
        "playerPhysics": {
            "acceleration": 0.11,
            "kickingAcceleration": 0.083,
            "kickStrength": 5.2,
            "bCoef": 0
        },
        "ballPhysics": {
            "radius": 6.25,
            "bCoef": 0.35,
            "invMass": 1.5,
            "color": "4fff4f"
        },
        "canBeStored": false,
        "joints": [],
        "redSpawnPoints": [],
        "blueSpawnPoints": []
    }
    `
};