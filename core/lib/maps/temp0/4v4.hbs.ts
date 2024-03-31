import { stadiumInfo } from "../stadiumInfo";

export const stadium: stadiumInfo = {
    name: "4v4",
    minPlayers: 7,
    maxPlayers: 8,
    stadiumText: `
    {
        "name": "SINDICATO 4V4",
        "width": 780,
        "height": 350,
        "spawnDistance": 350,
        "bg": {
            "type": "",
            "color": "2a3a40",
            "width": 0,
            "height": 0
        },
        "vertexes": [
            {
                "x": -700,
                "y": 320,
                "trait": "ballArea",
                "bias": -15,
                "color": "a3acc2"
            },
            {
                "x": -700,
                "y": 80,
                "trait": "ballArea",
                "bias": -15,
                "color": "a3acc2"
            },
            {
                "x": -700,
                "y": -80,
                "trait": "ballArea",
                "bias": -15,
                "color": "a3acc2"
            },
            {
                "x": -700,
                "y": -320,
                "trait": "ballArea",
                "bias": -15,
                "color": "a3acc2"
            },
            {
                "x": 700,
                "y": 320,
                "trait": "ballArea",
                "bias": 15,
                "color": "a3acc2"
            },
            {
                "x": 700,
                "y": 80,
                "trait": "ballArea",
                "bias": 15,
                "color": "a3acc2"
            },
            {
                "x": 700,
                "y": -80,
                "trait": "ballArea",
                "bias": 15,
                "color": "a3acc2"
            },
            {
                "x": 700,
                "y": -320,
                "trait": "ballArea",
                "bias": 15,
                "color": "a3acc2"
            },
            {
                "x": 0,
                "y": 320,
                "trait": "kickOffBarrier",
                "color": "a3acc2"
            },
            {
                "x": 0,
                "y": 80,
                "trait": "kickOffBarrier",
                "color": "a3acc2",
                "_data": {
                    "mirror": {}
                }
            },
            {
                "x": 0,
                "y": -80,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "trait": "kickOffBarrier",
                "color": "a3acc2",
                "_data": {
                    "mirror": {}
                }
            },
            {
                "x": 0,
                "y": -320,
                "trait": "kickOffBarrier",
                "color": "a3acc2"
            },
            {
                "x": -700,
                "y": -80,
                "trait": "goalNet",
                "color": "FFFFFF",
                "_data": {
                    "mirror": {}
                }
            },
            {
                "x": -730,
                "y": -60,
                "trait": "goalNet",
                "color": "FFFFFF",
                "_data": {
                    "mirror": {}
                }
            },
            {
                "x": -730,
                "y": 60,
                "trait": "goalNet",
                "color": "FFFFFF",
                "_data": {
                    "mirror": {}
                }
            },
            {
                "x": -700,
                "y": 80,
                "trait": "goalNet",
                "color": "FFFFFF",
                "_data": {
                    "mirror": {}
                }
            },
            {
                "x": 700,
                "y": -80,
                "trait": "goalNet",
                "color": "FFFFFF",
                "_data": {
                    "mirror": {}
                }
            },
            {
                "x": 730,
                "y": -60,
                "trait": "goalNet",
                "color": "FFFFFF",
                "_data": {
                    "mirror": {}
                }
            },
            {
                "x": 730,
                "y": 60,
                "trait": "goalNet",
                "color": "FFFFFF",
                "_data": {
                    "mirror": {}
                }
            },
            {
                "x": 700,
                "y": 80,
                "trait": "goalNet",
                "color": "FFFFFF",
                "_data": {
                    "mirror": {}
                }
            },
            {
                "x": 700,
                "y": -320,
                "trait": "line",
                "bias": 15,
                "color": "a3acc2"
            },
            {
                "x": -700,
                "y": -320,
                "trait": "line",
                "bias": 15,
                "color": "a3acc2"
            },
            {
                "x": 700,
                "y": 320,
                "trait": "line",
                "bias": -15,
                "color": "a3acc2"
            },
            {
                "x": -700,
                "y": 320,
                "trait": "line",
                "bias": -15,
                "color": "a3acc2"
            },
            {
                "x": -700,
                "y": -80,
                "trait": "line",
                "color": "ff3030",
                "_data": {
                    "mirror": {}
                }
            },
            {
                "x": -700,
                "y": 80,
                "trait": "line",
                "color": "ff3030",
                "_data": {
                    "mirror": {}
                }
            },
            {
                "x": 700,
                "y": -80,
                "trait": "line",
                "color": "33B4FF",
                "_data": {
                    "mirror": {}
                }
            },
            {
                "x": 700,
                "y": 80,
                "trait": "line",
                "color": "33B4FF",
                "_data": {
                    "mirror": {}
                }
            },
            {
                "x": 0,
                "y": 320,
                "trait": "kickOffBarrier"
            },
            {
                "x": 0,
                "y": 350,
                "trait": "kickOffBarrier"
            },
            {
                "x": 0,
                "y": -320,
                "trait": "kickOffBarrier"
            },
            {
                "x": 0,
                "y": -350,
                "trait": "kickOffBarrier"
            },
            {
                "x": -700,
                "y": 275,
                "trait": "line"
            },
            {
                "x": 700,
                "y": 275,
                "trait": "line"
            },
            {
                "x": 700,
                "y": -275,
                "trait": "line"
            },
            {
                "x": -690,
                "y": -320,
                "trait": "line",
                "color": "007D11"
            },
            {
                "x": -700,
                "y": -310,
                "trait": "line",
                "color": "007D11"
            },
            {
                "x": -700,
                "y": 310,
                "trait": "line",
                "color": "007D11"
            },
            {
                "x": -690,
                "y": 320,
                "trait": "line",
                "color": "007D11"
            },
            {
                "x": 700,
                "y": 310,
                "trait": "line",
                "color": "007D11"
            },
            {
                "x": 690,
                "y": 320,
                "trait": "line",
                "color": "007D11"
            },
            {
                "x": 690,
                "y": -320,
                "trait": "line",
                "color": "007D11"
            },
            {
                "x": 700,
                "y": -310,
                "trait": "line",
                "color": "007D11"
            },
            {
                "x": -700,
                "y": -80,
                "trait": "ballArea"
            },
            {
                "x": -700,
                "y": -320,
                "trait": "ballArea"
            },
            {
                "x": -700,
                "y": 320,
                "trait": "ballArea"
            },
            {
                "x": -700,
                "y": 80,
                "trait": "ballArea"
            },
            {
                "x": 700,
                "y": 320,
                "trait": "ballArea"
            },
            {
                "x": 700,
                "y": 80,
                "trait": "ballArea"
            },
            {
                "x": 700,
                "y": -80,
                "trait": "ballArea"
            },
            {
                "x": 700,
                "y": -320,
                "trait": "ballArea"
            },
            {
                "x": -450,
                "y": -321.59374237060547,
                "bCoef": -0.5,
                "cMask": [
                    "ball"
                ],
                "trait": "line",
                "color": "a3a3a3"
            },
            {
                "x": -450,
                "y": 319.40625762939453,
                "bCoef": -0.5,
                "cMask": [
                    "ball"
                ],
                "trait": "line",
                "color": "a3a3a3"
            },
            {
                "x": 450,
                "y": -321.59374237060547,
                "bCoef": -0.5,
                "cMask": [
                    "ball"
                ],
                "trait": "goalNet",
                "color": "a3a3a3"
            },
            {
                "x": 450,
                "y": 319.40625762939453,
                "bCoef": -0.5,
                "cMask": [
                    "ball"
                ],
                "trait": "goalNet",
                "color": "a3a3a3"
            },
            {
                "x": -400,
                "y": -319,
                "trait": "line",
                "curve": 0,
                "color": "a3acc2"
            },
            {
                "x": -400,
                "y": 318,
                "trait": "line",
                "curve": 0,
                "color": "a3acc2"
            },
            {
                "x": 400,
                "y": -319,
                "trait": "line",
                "curve": 0,
                "color": "a3acc2"
            },
            {
                "x": 400,
                "y": 318,
                "trait": "line",
                "curve": 0,
                "color": "a3acc2"
            },
            {
                "x": -700,
                "y": -130,
                "trait": "line",
                "curve": 0,
                "color": "a3acc2"
            },
            {
                "x": -595,
                "y": -130,
                "trait": "line",
                "curve": 50,
                "color": "a3acc2"
            },
            {
                "x": 700,
                "y": -130,
                "trait": "line",
                "color": "a3acc2"
            },
            {
                "x": 595,
                "y": -130,
                "trait": "line",
                "color": "a3acc2"
            },
            {
                "x": -700,
                "y": 130,
                "trait": "line",
                "color": "a3acc2"
            },
            {
                "x": -595,
                "y": 130,
                "trait": "line",
                "curve": 0,
                "color": "a3acc2"
            },
            {
                "x": 700,
                "y": 130,
                "trait": "line",
                "color": "a3acc2"
            },
            {
                "x": 595,
                "y": 130,
                "trait": "line",
                "color": "a3acc2"
            },
            {
                "x": -399,
                "y": -136,
                "trait": "line",
                "color": "a3acc2"
            },
            {
                "x": -402,
                "y": 130,
                "trait": "line",
                "color": "a3acc2"
            },
            {
                "x": 399,
                "y": -136,
                "trait": "line",
                "color": "a3acc2"
            },
            {
                "x": 402,
                "y": 130,
                "trait": "line",
                "color": "a3acc2"
            },
            {
                "x": 21.6,
                "y": 54.00000000000002,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "_data": {
                    "mirror": {}
                },
                "color": "4fff4f"
            },
            {
                "x": -32.40000000000001,
                "y": -4.319999999999996,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "_data": {
                    "mirror": {}
                },
                "color": "4fff4f"
            },
            {
                "x": 30.240000000000006,
                "y": 45.360000000000014,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "_data": {
                    "mirror": {}
                },
                "color": "4fff4f"
            },
            {
                "x": 43.28000000000001,
                "y": 36.24000000000001,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "_data": {
                    "mirror": {}
                },
                "color": "4fff4f"
            },
            {
                "x": 15.88,
                "y": 24.680000000000007,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "_data": {
                    "mirror": {}
                },
                "color": "4fff4f"
            },
            {
                "x": -11.120000000000005,
                "y": 29.160000000000007,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "_data": {
                    "mirror": {}
                },
                "color": "4fff4f"
            },
            {
                "x": -17.520000000000003,
                "y": -30.720000000000006,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "_data": {
                    "mirror": {}
                },
                "color": "4fff4f"
            },
            {
                "x": -15.440000000000005,
                "y": -4.32,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "_data": {
                    "mirror": {}
                },
                "color": "4fff4f"
            },
            {
                "x": 14.56,
                "y": -8.800000000000002,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "_data": {
                    "mirror": {}
                },
                "color": "4fff4f"
            },
            {
                "x": -16.200000000000003,
                "y": -64.80000000000001,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "_data": {
                    "mirror": {}
                },
                "color": "4fff4f"
            },
            {
                "x": -8.800000000000004,
                "y": -36.12000000000001,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "_data": {
                    "mirror": {}
                },
                "color": "4fff4f",
                "curve": 35
            },
            {
                "x": -21.680000000000007,
                "y": -41.52000000000001,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "_data": {
                    "mirror": {}
                },
                "color": "4fff4f",
                "curve": 35
            },
            {
                "x": -6.640000000000002,
                "y": -56.48000000000001,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "_data": {
                    "mirror": {}
                },
                "color": "4fff4f"
            },
            {
                "x": -13.120000000000003,
                "y": -47.84000000000001,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "_data": {
                    "mirror": {}
                },
                "color": "4fff4f"
            },
            {
                "x": 25.6,
                "y": 55.00000000000002,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "color": "4fff4f",
                "_data": {
                    "mirror": {}
                }
            },
            {
                "x": -32.40000000000001,
                "y": -3.319999999999996,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "color": "4fff4f",
                "_data": {
                    "mirror": {}
                }
            },
            {
                "x": 33.24000000000001,
                "y": 45.360000000000014,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "color": "4fff4f",
                "_data": {
                    "mirror": {}
                }
            },
            {
                "x": 49.28000000000001,
                "y": 37.24000000000001,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "color": "4fff4f",
                "_data": {
                    "mirror": {}
                }
            },
            {
                "x": 32.24000000000001,
                "y": 48.360000000000014,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "color": "4fff4f",
                "_data": {
                    "mirror": {}
                }
            },
            {
                "x": 17.880000000000003,
                "y": 27.680000000000007,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "color": "4fff4f",
                "_data": {
                    "mirror": {}
                }
            },
            {
                "x": 17.880000000000003,
                "y": 26.680000000000007,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "color": "4fff4f",
                "_data": {
                    "mirror": {}
                }
            },
            {
                "x": -9.120000000000005,
                "y": 31.160000000000007,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "color": "4fff4f",
                "_data": {
                    "mirror": {}
                }
            },
            {
                "x": -10.120000000000005,
                "y": 29.160000000000007,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "color": "4fff4f",
                "_data": {
                    "mirror": {}
                }
            },
            {
                "x": -16.520000000000003,
                "y": -30.720000000000006,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "color": "4fff4f",
                "_data": {
                    "mirror": {}
                }
            },
            {
                "x": -13.440000000000005,
                "y": 0.6799999999999997,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "color": "4fff4f",
                "_data": {
                    "mirror": {}
                }
            },
            {
                "x": 15.56,
                "y": -5.8000000000000025,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "color": "4fff4f",
                "_data": {
                    "mirror": {}
                }
            },
            {
                "x": -16.520000000000003,
                "y": -30.720000000000006,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "color": "4fff4f",
                "_data": {
                    "mirror": {}
                }
            },
            {
                "x": -15.200000000000003,
                "y": -64.80000000000001,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "color": "4fff4f",
                "_data": {
                    "mirror": {}
                }
            },
            {
                "x": -16.520000000000003,
                "y": -31.720000000000006,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "color": "4fff4f",
                "_data": {
                    "mirror": {}
                }
            },
            {
                "x": -15.200000000000003,
                "y": -65.80000000000001,
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "color": "4fff4f",
                "_data": {
                    "mirror": {}
                }
            }
        ],
        "segments": [
            {
                "v0": 43,
                "v1": 44,
                "trait": "ballArea"
            },
            {
                "v0": 45,
                "v1": 46,
                "trait": "ballArea"
            },
            {
                "v0": 47,
                "v1": 48,
                "trait": "ballArea"
            },
            {
                "v0": 49,
                "v1": 50,
                "trait": "ballArea"
            },
            {
                "v0": 0,
                "v1": 1,
                "vis": true,
                "color": "a3acc2",
                "trait": "ballArea",
                "bias": -15
            },
            {
                "v0": 2,
                "v1": 3,
                "vis": true,
                "color": "a3acc2",
                "trait": "ballArea",
                "bias": -15
            },
            {
                "v0": 4,
                "v1": 5,
                "vis": true,
                "color": "a3acc2",
                "trait": "ballArea",
                "bias": 15
            },
            {
                "v0": 6,
                "v1": 7,
                "vis": true,
                "color": "a3acc2",
                "trait": "ballArea",
                "bias": 15
            },
            {
                "v0": 16,
                "v1": 17,
                "curve": 90,
                "color": "FFFFFF",
                "trait": "goalNet",
                "_data": {
                    "mirror": {},
                    "arc": {
                        "a": [
                            700,
                            -80
                        ],
                        "b": [
                            730,
                            -60
                        ],
                        "curve": 90,
                        "radius": 25.49509756796392,
                        "center": [
                            705,
                            -55
                        ],
                        "from": -1.7681918866447774,
                        "to": -0.19739555984988078
                    }
                }
            },
            {
                "v0": 18,
                "v1": 19,
                "curve": 90,
                "color": "FFFFFF",
                "trait": "goalNet",
                "_data": {
                    "mirror": {},
                    "arc": {
                        "a": [
                            730,
                            60
                        ],
                        "b": [
                            700,
                            80
                        ],
                        "curve": 90,
                        "radius": 25.49509756796392,
                        "center": [
                            705,
                            55
                        ],
                        "from": 0.19739555984988078,
                        "to": 1.7681918866447774
                    }
                }
            },
            {
                "v0": 12,
                "v1": 13,
                "curve": -90,
                "color": "FFFFFF",
                "trait": "goalNet",
                "_data": {
                    "mirror": {},
                    "arc": {
                        "a": [
                            -700,
                            -80
                        ],
                        "b": [
                            -730,
                            -60
                        ],
                        "curve": -90,
                        "radius": 25.49509756796392,
                        "center": [
                            -705,
                            -55
                        ],
                        "from": -2.9441970937399127,
                        "to": -1.373400766945016
                    }
                }
            },
            {
                "v0": 14,
                "v1": 15,
                "curve": -90,
                "color": "FFFFFF",
                "trait": "goalNet",
                "_data": {
                    "mirror": {},
                    "arc": {
                        "a": [
                            -730,
                            60
                        ],
                        "b": [
                            -700,
                            80
                        ],
                        "curve": -90,
                        "radius": 25.49509756796392,
                        "center": [
                            -705,
                            55
                        ],
                        "from": 1.373400766945016,
                        "to": 2.9441970937399127
                    }
                }
            },
            {
                "v0": 13,
                "v1": 14,
                "color": "FFFFFF",
                "trait": "goalNet",
                "_data": {
                    "mirror": {},
                    "arc": {
                        "a": [
                            -730,
                            -60
                        ],
                        "b": [
                            -730,
                            60
                        ],
                        "radius": null,
                        "center": [
                            null,
                            null
                        ],
                        "from": null,
                        "to": null
                    }
                }
            },
            {
                "v0": 17,
                "v1": 18,
                "color": "FFFFFF",
                "trait": "goalNet",
                "_data": {
                    "mirror": {},
                    "arc": {
                        "a": [
                            730,
                            -60
                        ],
                        "b": [
                            730,
                            60
                        ],
                        "radius": null,
                        "center": [
                            null,
                            null
                        ],
                        "from": null,
                        "to": null
                    }
                }
            },
            {
                "v0": 9,
                "v1": 10,
                "curve": 180,
                "color": "a3acc2",
                "cGroup": [
                    "blueKO"
                ],
                "trait": "kickOffBarrier",
                "_data": {
                    "mirror": {},
                    "arc": {
                        "a": [
                            0,
                            80
                        ],
                        "b": [
                            0,
                            -80
                        ],
                        "curve": 180,
                        "radius": 80,
                        "center": [
                            0,
                            0
                        ],
                        "from": 1.5707963267948966,
                        "to": -1.5707963267948966
                    }
                }
            },
            {
                "v0": 9,
                "v1": 10,
                "curve": -180,
                "color": "a3acc2",
                "cGroup": [
                    "redKO"
                ],
                "trait": "kickOffBarrier",
                "_data": {
                    "mirror": {},
                    "arc": {
                        "a": [
                            0,
                            80
                        ],
                        "b": [
                            0,
                            -80
                        ],
                        "curve": -180,
                        "radius": 80,
                        "center": [
                            0,
                            0
                        ],
                        "from": -1.5707963267948966,
                        "to": 1.5707963267948966
                    }
                }
            },
            {
                "v0": 28,
                "v1": 29,
                "vis": false,
                "trait": "kickOffBarrier"
            },
            {
                "v0": 30,
                "v1": 31,
                "vis": false,
                "trait": "kickOffBarrier"
            },
            {
                "v0": 8,
                "v1": 9,
                "color": "a3acc2",
                "trait": "kickOffBarrier"
            },
            {
                "v0": 10,
                "v1": 11,
                "color": "a3acc2",
                "trait": "kickOffBarrier"
            },
            {
                "v0": 35,
                "v1": 36,
                "curve": 90,
                "color": "007D11",
                "trait": "line"
            },
            {
                "v0": 37,
                "v1": 38,
                "curve": 90,
                "color": "007D11",
                "trait": "line"
            },
            {
                "v0": 39,
                "v1": 40,
                "curve": -90,
                "color": "007D11",
                "trait": "line"
            },
            {
                "v0": 41,
                "v1": 42,
                "curve": -90,
                "color": "007D11",
                "trait": "line"
            },
            {
                "v0": 20,
                "v1": 21,
                "color": "a3acc2",
                "trait": "line",
                "bias": 15
            },
            {
                "v0": 22,
                "v1": 23,
                "color": "a3acc2",
                "trait": "line",
                "bias": -15
            },
            {
                "v0": 24,
                "v1": 25,
                "color": "ff3030",
                "trait": "line",
                "_data": {
                    "mirror": {},
                    "arc": {
                        "a": [
                            -700,
                            -80
                        ],
                        "b": [
                            -700,
                            80
                        ],
                        "radius": null,
                        "center": [
                            null,
                            null
                        ],
                        "from": null,
                        "to": null
                    }
                }
            },
            {
                "v0": 26,
                "v1": 27,
                "color": "33B4FF",
                "trait": "line",
                "_data": {
                    "mirror": {},
                    "arc": {
                        "a": [
                            700,
                            -80
                        ],
                        "b": [
                            700,
                            80
                        ],
                        "radius": null,
                        "center": [
                            null,
                            null
                        ],
                        "from": null,
                        "to": null
                    }
                }
            },
            {
                "v0": 55,
                "v1": 56,
                "curve": 0,
                "color": "a3acc2",
                "trait": "line",
                "x": -400
            },
            {
                "v0": 57,
                "v1": 58,
                "curve": 0,
                "color": "a3acc2",
                "trait": "line",
                "x": 400
            },
            {
                "v0": 59,
                "v1": 60,
                "curve": 0,
                "color": "a3acc2",
                "trait": "line"
            },
            {
                "v0": 61,
                "v1": 62,
                "curve": 0,
                "color": "a3acc2",
                "trait": "line"
            },
            {
                "v0": 63,
                "v1": 64,
                "curve": 0,
                "color": "a3acc2",
                "trait": "line"
            },
            {
                "v0": 65,
                "v1": 66,
                "curve": 0,
                "color": "a3acc2",
                "trait": "line"
            },
            {
                "v0": 60,
                "v1": 64,
                "curve": 0,
                "color": "a3acc2",
                "trait": "line"
            },
            {
                "v0": 62,
                "v1": 66,
                "curve": 0,
                "color": "a3acc2",
                "trait": "line"
            },
            {
                "v0": 67,
                "v1": 68,
                "curve": 140,
                "color": "a3acc2",
                "trait": "line"
            },
            {
                "v0": 69,
                "v1": 70,
                "curve": -140,
                "color": "a3acc2",
                "trait": "line"
            },
            {
                "v0": 71,
                "v1": 72,
                "curve": 180,
                "color": "4fff4f",
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "bias": 2,
                "_data": {
                    "mirror": {},
                    "arc": {
                        "a": [
                            21.6,
                            54.00000000000002
                        ],
                        "b": [
                            -32.40000000000001,
                            -4.319999999999996
                        ],
                        "curve": 180,
                        "radius": 39.740478104824064,
                        "center": [
                            -5.400000000000006,
                            24.840000000000014
                        ],
                        "from": 0.8238407534186363,
                        "to": -2.317751900171157
                    }
                }
            },
            {
                "v0": 73,
                "v1": 74,
                "color": "4fff4f",
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "bias": 2,
                "_data": {
                    "mirror": {},
                    "arc": {
                        "a": [
                            30.240000000000006,
                            45.360000000000014
                        ],
                        "b": [
                            43.28000000000001,
                            36.24000000000001
                        ],
                        "radius": null,
                        "center": [
                            null,
                            null
                        ],
                        "from": null,
                        "to": null
                    }
                }
            },
            {
                "v0": 73,
                "v1": 75,
                "color": "4fff4f",
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "bias": 2,
                "_data": {
                    "mirror": {},
                    "arc": {
                        "a": [
                            30.240000000000006,
                            45.360000000000014
                        ],
                        "b": [
                            15.88,
                            24.680000000000007
                        ],
                        "radius": null,
                        "center": [
                            null,
                            null
                        ],
                        "from": null,
                        "to": null
                    }
                }
            },
            {
                "v0": 75,
                "v1": 76,
                "color": "4fff4f",
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "bias": 2,
                "_data": {
                    "mirror": {},
                    "arc": {
                        "a": [
                            15.88,
                            24.680000000000007
                        ],
                        "b": [
                            -11.120000000000005,
                            29.160000000000007
                        ],
                        "radius": null,
                        "center": [
                            null,
                            null
                        ],
                        "from": null,
                        "to": null
                    }
                }
            },
            {
                "v0": 76,
                "v1": 77,
                "color": "4fff4f",
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "bias": 2,
                "_data": {
                    "mirror": {},
                    "arc": {
                        "a": [
                            -11.120000000000005,
                            29.160000000000007
                        ],
                        "b": [
                            -17.520000000000003,
                            -30.720000000000006
                        ],
                        "radius": null,
                        "center": [
                            null,
                            null
                        ],
                        "from": null,
                        "to": null
                    }
                }
            },
            {
                "v0": 78,
                "v1": 79,
                "color": "4fff4f",
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "bias": 2,
                "_data": {
                    "mirror": {},
                    "arc": {
                        "a": [
                            -15.440000000000005,
                            -4.32
                        ],
                        "b": [
                            14.56,
                            -8.800000000000002
                        ],
                        "curve": -27.912150068155377,
                        "radius": 62.8843988412607,
                        "center": [
                            -9.453581576071556,
                            -66.91880519690771
                        ],
                        "from": 1.1789789796041643,
                        "to": 1.6661378996042353
                    }
                },
                "curve": -27.912150068155377
            },
            {
                "v0": 77,
                "v1": 80,
                "curve": 190,
                "color": "4fff4f",
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "bias": 2,
                "_data": {
                    "mirror": {},
                    "arc": {
                        "a": [
                            -17.520000000000003,
                            -30.720000000000006
                        ],
                        "b": [
                            -16.200000000000003,
                            -64.80000000000001
                        ],
                        "curve": 190,
                        "radius": 17.117915737386415,
                        "center": [
                            -18.350806826481737,
                            -47.817742517927115
                        ],
                        "from": 1.5222429072185644,
                        "to": -1.444816821171797
                    }
                }
            },
            {
                "v0": 80,
                "v1": 77,
                "curve": 172.93541083221805,
                "color": "4fff4f",
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "bias": 2,
                "_data": {
                    "mirror": {},
                    "arc": {
                        "a": [
                            -16.200000000000003,
                            -64.80000000000001
                        ],
                        "b": [
                            -17.520000000000003,
                            -30.720000000000006
                        ],
                        "curve": 172.93541083221805,
                        "radius": 17.085234915745225,
                        "center": [
                            -17.911851851851857,
                            -47.80074074074074
                        ],
                        "from": -1.4704331131322539,
                        "to": 1.5478591991790212
                    }
                }
            },
            {
                "v0": 81,
                "v1": 82,
                "curve": 75.7565603265911,
                "color": "4fff4f",
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "bias": 2,
                "_data": {
                    "mirror": {},
                    "arc": {
                        "a": [
                            -8.800000000000004,
                            -36.12000000000001
                        ],
                        "b": [
                            -21.680000000000007,
                            -41.52000000000001
                        ],
                        "curve": 75.7565603265911,
                        "radius": 11.373375863944041,
                        "center": [
                            -11.76898353649656,
                            -47.099017046282306
                        ],
                        "from": 1.306689867530197,
                        "to": 2.628891275214923
                    }
                }
            },
            {
                "v0": 83,
                "v1": 84,
                "curve": 153.02382148568336,
                "color": "4fff4f",
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "bias": 2,
                "_data": {
                    "mirror": {},
                    "arc": {
                        "a": [
                            -6.640000000000002,
                            -56.48000000000001
                        ],
                        "b": [
                            -13.120000000000003,
                            -47.84000000000001
                        ],
                        "curve": 153.02382148568336,
                        "radius": 5.5531650185597705,
                        "center": [
                            -10.91619047619046,
                            -52.93714285714285
                        ],
                        "from": -0.6918836506613238,
                        "to": 1.9788858682478927
                    }
                }
            },
            {
                "v0": 84,
                "v1": 83,
                "curve": 190,
                "color": "4fff4f",
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "bias": 2,
                "_data": {
                    "mirror": {},
                    "arc": {
                        "a": [
                            -13.120000000000003,
                            -47.84000000000001
                        ],
                        "b": [
                            -6.640000000000002,
                            -56.48000000000001
                        ],
                        "curve": 190,
                        "radius": 5.42062712273408,
                        "center": [
                            -10.257951026431991,
                            -52.443463269824
                        ],
                        "from": 2.1270309729884653,
                        "to": -0.8400287554018966
                    }
                }
            },
            {
                "v0": 85,
                "v1": 86,
                "curve": 173.10458705401058,
                "color": "4fff4f",
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "bias": 2,
                "_data": {
                    "mirror": {},
                    "arc": {
                        "a": [
                            25.6,
                            55.00000000000002
                        ],
                        "b": [
                            -32.40000000000001,
                            -3.319999999999996
                        ],
                        "curve": 173.10458705401058,
                        "radius": 41.200053937983256,
                        "center": [
                            -1.6432102362639613,
                            24.092849686270753
                        ],
                        "from": 0.848323017690326,
                        "to": -2.4136172950916244
                    }
                }
            },
            {
                "v0": 87,
                "v1": 88,
                "color": "4fff4f",
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "bias": 2,
                "_data": {
                    "mirror": {},
                    "arc": {
                        "a": [
                            33.24000000000001,
                            45.360000000000014
                        ],
                        "b": [
                            49.28000000000001,
                            37.24000000000001
                        ],
                        "radius": null,
                        "center": [
                            null,
                            null
                        ],
                        "from": null,
                        "to": null
                    }
                }
            },
            {
                "v0": 89,
                "v1": 90,
                "color": "4fff4f",
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "bias": 2,
                "_data": {
                    "mirror": {},
                    "arc": {
                        "a": [
                            32.24000000000001,
                            48.360000000000014
                        ],
                        "b": [
                            17.880000000000003,
                            27.680000000000007
                        ],
                        "radius": null,
                        "center": [
                            null,
                            null
                        ],
                        "from": null,
                        "to": null
                    }
                }
            },
            {
                "v0": 91,
                "v1": 92,
                "color": "4fff4f",
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "bias": 2,
                "_data": {
                    "mirror": {},
                    "arc": {
                        "a": [
                            17.880000000000003,
                            26.680000000000007
                        ],
                        "b": [
                            -9.120000000000005,
                            31.160000000000007
                        ],
                        "radius": null,
                        "center": [
                            null,
                            null
                        ],
                        "from": null,
                        "to": null
                    }
                }
            },
            {
                "v0": 93,
                "v1": 94,
                "color": "4fff4f",
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "bias": 2,
                "_data": {
                    "mirror": {},
                    "arc": {
                        "a": [
                            -10.120000000000005,
                            29.160000000000007
                        ],
                        "b": [
                            -16.520000000000003,
                            -30.720000000000006
                        ],
                        "radius": null,
                        "center": [
                            null,
                            null
                        ],
                        "from": null,
                        "to": null
                    }
                }
            },
            {
                "v0": 95,
                "v1": 96,
                "color": "4fff4f",
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "bias": 2,
                "_data": {
                    "mirror": {},
                    "arc": {
                        "a": [
                            -13.440000000000005,
                            0.6799999999999997
                        ],
                        "b": [
                            15.56,
                            -5.8000000000000025
                        ],
                        "curve": -1.1782692493148172,
                        "radius": 1444.9863101373578,
                        "center": [
                            -314.0322989593072,
                            -1412.6952885524547
                        ],
                        "from": 1.340676988783921,
                        "to": 1.3612416666594664
                    }
                },
                "curve": -1.1782692493148172
            },
            {
                "v0": 98,
                "v1": 97,
                "curve": 172.93541083221805,
                "color": "4fff4f",
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "bias": 2,
                "_data": {
                    "mirror": {},
                    "arc": {
                        "a": [
                            -15.200000000000003,
                            -64.80000000000001
                        ],
                        "b": [
                            -16.520000000000003,
                            -30.720000000000006
                        ],
                        "curve": 172.93541083221805,
                        "radius": 17.085234915745225,
                        "center": [
                            -16.911851851851857,
                            -47.80074074074074
                        ],
                        "from": -1.4704331131322539,
                        "to": 1.5478591991790212
                    }
                }
            },
            {
                "v0": 99,
                "v1": 100,
                "curve": 190,
                "color": "4fff4f",
                "cMask": [
                    "wall"
                ],
                "cGroup": [
                    "wall"
                ],
                "bias": 2,
                "_data": {
                    "mirror": {},
                    "arc": {
                        "a": [
                            -16.520000000000003,
                            -31.720000000000006
                        ],
                        "b": [
                            -15.200000000000003,
                            -65.80000000000001
                        ],
                        "curve": 190,
                        "radius": 17.117915737386415,
                        "center": [
                            -17.350806826481737,
                            -48.817742517927115
                        ],
                        "from": 1.5222429072185644,
                        "to": -1.444816821171797
                    }
                }
            }
        ],
        "goals": [
            {
                "p0": [
                    -710,
                    -80
                ],
                "p1": [
                    -710,
                    80
                ],
                "team": "red"
            },
            {
                "p0": [
                    710,
                    80
                ],
                "p1": [
                    710,
                    -80
                ],
                "team": "blue",
                "_data": {
                    "mirror": {}
                }
            }
        ],
        "discs": [
            {
                "radius": 5.9,
                "pos": [
                    -700,
                    80
                ],
                "color": "ff3030",
                "trait": "goalPost",
                "_data": {
                    "mirror": {}
                }
            },
            {
                "radius": 5.9,
                "pos": [
                    -700,
                    -80
                ],
                "color": "ff3030",
                "trait": "goalPost",
                "_data": {
                    "mirror": {}
                }
            },
            {
                "radius": 5.9,
                "pos": [
                    700,
                    80
                ],
                "color": "33B4FF",
                "trait": "goalPost",
                "_data": {
                    "mirror": {}
                }
            },
            {
                "radius": 5.9,
                "pos": [
                    700,
                    -80
                ],
                "color": "33B4FF",
                "trait": "goalPost",
                "_data": {
                    "mirror": {}
                }
            }
        ],
        "planes": [
            {
                "normal": [
                    0,
                    1
                ],
                "dist": -320,
                "trait": "ballArea",
                "_data": {
                    "extremes": {
                        "normal": [
                            0,
                            1
                        ],
                        "dist": -320,
                        "canvas_rect": [
                            -780,
                            -350,
                            780,
                            350
                        ],
                        "a": [
                            -780,
                            -320
                        ],
                        "b": [
                            780,
                            -320
                        ]
                    }
                }
            },
            {
                "normal": [
                    0,
                    -1
                ],
                "dist": -320,
                "trait": "ballArea",
                "_data": {
                    "extremes": {
                        "normal": [
                            0,
                            -1
                        ],
                        "dist": -320,
                        "canvas_rect": [
                            -780,
                            -350,
                            780,
                            350
                        ],
                        "a": [
                            -780,
                            320
                        ],
                        "b": [
                            780,
                            320
                        ]
                    }
                }
            },
            {
                "normal": [
                    0,
                    1
                ],
                "dist": -350,
                "bCoef": 0,
                "_data": {
                    "extremes": {
                        "normal": [
                            0,
                            1
                        ],
                        "dist": -350,
                        "canvas_rect": [
                            -780,
                            -350,
                            780,
                            350
                        ],
                        "a": [
                            -780,
                            -350
                        ],
                        "b": [
                            780,
                            -350
                        ]
                    }
                }
            },
            {
                "normal": [
                    0,
                    -1
                ],
                "dist": -350,
                "bCoef": 0,
                "_data": {
                    "extremes": {
                        "normal": [
                            0,
                            -1
                        ],
                        "dist": -350,
                        "canvas_rect": [
                            -780,
                            -350,
                            780,
                            350
                        ],
                        "a": [
                            -780,
                            350
                        ],
                        "b": [
                            780,
                            350
                        ]
                    }
                }
            },
            {
                "normal": [
                    1,
                    0
                ],
                "dist": -780,
                "bCoef": 0,
                "_data": {
                    "extremes": {
                        "normal": [
                            1,
                            0
                        ],
                        "dist": -780,
                        "canvas_rect": [
                            -780,
                            -350,
                            780,
                            350
                        ],
                        "a": [
                            -780,
                            -350
                        ],
                        "b": [
                            -780,
                            350
                        ]
                    }
                }
            },
            {
                "normal": [
                    -1,
                    0
                ],
                "dist": -780,
                "bCoef": 0,
                "_data": {
                    "extremes": {
                        "normal": [
                            -1,
                            0
                        ],
                        "dist": -780,
                        "canvas_rect": [
                            -780,
                            -350,
                            780,
                            350
                        ],
                        "a": [
                            780,
                            -350
                        ],
                        "b": [
                            780,
                            350
                        ]
                    }
                }
            }
        ],
        "traits": {
            "line": {
                "cMask": [
                    ""
                ],
                "color": "FFFFFF"
            },
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
                "color": "E50808"
            },
            "goalNet": {
                "bCoef": -0.5,
                "cMask": [
                    "ball"
                ]
            },
            "kickOffBarrier": {
                "bCoef": 0.1,
                "cGroup": [
                    "redKO",
                    "blueKO"
                ],
                "cMask": [
                    "red",
                    "blue"
                ],
                "color": "FFFFFF"
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
        "joints": [],
        "redSpawnPoints": [],
        "blueSpawnPoints": [],
        "canBeStored": false
    }
    `
};