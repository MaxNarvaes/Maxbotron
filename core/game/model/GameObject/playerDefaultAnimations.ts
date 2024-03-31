import { getUnixTimestamp } from "../../controller/Statistics"
import { PlayerAnimations } from "./Animation"

export function masterAnimations(): PlayerAnimations{
    return {
        default: [
            {
                animating: false,
                name: "Max",
                repeats: true,
                times: 0,
                frames: [
                    {
                        index: 0,
                        bitmaps: ["Ⓜ"],
                        animating: false,
                        delayInMs: 500,
                        startedTimestamp: getUnixTimestamp()
                    },
                    {
                        index: 1,
                        bitmaps: ["🅰"],
                        animating: false,
                        delayInMs: 500,
                        startedTimestamp: getUnixTimestamp()
                    },
                    {
                        index: 2,
                        bitmaps: ["❌"],
                        animating: false,
                        delayInMs: 500,
                        startedTimestamp: getUnixTimestamp()
                    },
                    {
                        index: 3,
                        bitmaps: ["♿"],
                        animating: false,
                        delayInMs: 1500,
                        startedTimestamp: getUnixTimestamp()
                    }
                ],
                currentFrame: null
            },
            {
                animating: false,
                name: "gk",
                repeats: true,
                times: 0,
                frames: [
                    {
                        index: 0,
                        bitmaps: ["🧤"],
                        animating: false,
                        delayInMs: 1000,
                        startedTimestamp: getUnixTimestamp()
                    },
                    {
                        index: 1,
                        bitmaps: null,
                        animating: false,
                        delayInMs: 1000,
                        startedTimestamp: getUnixTimestamp()
                    }
                ],
                currentFrame: null
            }
        ],
        onGoal: [
            {
                animating: false,
                name: "on goal",
                repeats: false,
                times: 1,
                frames: [
                    {
                        index: 0,
                        bitmaps: ["⚽", "👑","💣"],
                        animating: false,
                        delayInMs: 3000,
                        startedTimestamp: getUnixTimestamp()
                    }
                ],
                currentFrame: null
            }
        ],
        onHatTrick: [
            {
                animating: false,
                name: "on hat trick",
                repeats: false,
                times: 1,
                frames: [
                    {
                        index: 0,
                        bitmaps: ["1!"],
                        animating: false,
                        delayInMs: 700,
                        startedTimestamp: getUnixTimestamp()
                    },
                    {
                        index: 1,
                        bitmaps: ["2!"],
                        animating: false,
                        delayInMs: 700,
                        startedTimestamp: getUnixTimestamp()
                    },
                    {
                        index: 2,
                        bitmaps: ["3!"],
                        animating: false,
                        delayInMs: 700,
                        startedTimestamp: getUnixTimestamp()
                    },
                    {
                        index: 3,
                        bitmaps: ["💣"],
                        animating: false,
                        delayInMs: 700,
                        startedTimestamp: getUnixTimestamp()
                    }
                ],
                currentFrame: null
            }
        ],
        onAssist: [
            {
                animating: false,
                name: "on assist",
                repeats: false,
                times: 1,
                frames: [
                    {
                        index: 0,
                        bitmaps: ["👟", "👠"],
                        animating: false,
                        delayInMs: 3000,
                        startedTimestamp: getUnixTimestamp()
                    }
                ],
                currentFrame: null
            }
        ],
        onOwnGoal: [
            {
                animating: false,
                name: "on own goal",
                repeats: false,
                times: 1,
                frames: [
                    {
                        index: 0,
                        bitmaps: ["🥵", "🤡", "👻"],
                        animating: false,
                        delayInMs: 3000,
                        startedTimestamp: getUnixTimestamp()
                    }
                ],
                currentFrame: null
            }
        ],
        ownGoalTeam: [
            {
                animating: false,
                name: "own goal team",
                repeats: false,
                times: 1,
                frames: [
                    {
                        index: 0,
                        bitmaps: ["😐", "🤬"],
                        animating: false,
                        delayInMs: 3000,
                        startedTimestamp: getUnixTimestamp()
                    }
                ],
                currentFrame: null
            }
        ],
        ownGoalOponent: [
            {
                animating: false,
                name: "own goal oponent",
                repeats: false,
                times: 1,
                frames: [
                    {
                        index: 0,
                        bitmaps: ["🤣", "😂"],
                        animating: false,
                        delayInMs: 3000,
                        startedTimestamp: getUnixTimestamp()
                    }
                ],
                currentFrame: null
            }
        ],
        onKick: [
            {
                animating: false,
                name: "on kick",
                repeats: false,
                times: 1,
                frames: [
                    {
                        index: 0,
                        bitmaps: ["😤", "😏", "🥴", "🤬", "🤪", "😠", "😃", "🧐", "🤷‍♀️", "🤦‍♂️", "🧙‍♂️", "😗", "😙", "😛", "🥱", "🗿"],
                        animating: false,
                        delayInMs: 700,
                        startedTimestamp: getUnixTimestamp()
                    }
                ],
                currentFrame: null
            },
            {
                animating: false,
                name: "on kick gk",
                repeats: false,
                times: 1,
                frames: [
                    {
                        index: 0,
                        bitmaps: ["EL"],
                        animating: false,
                        delayInMs: 700,
                        startedTimestamp: getUnixTimestamp()
                    },
                    {
                        index: 1,
                        bitmaps: ["1!"],
                        animating: false,
                        delayInMs: 700,
                        startedTimestamp: getUnixTimestamp()
                    },
                    {
                        index: 2,
                        bitmaps: ["🦸🏻‍♂️​"],
                        animating: false,
                        delayInMs: 700,
                        startedTimestamp: getUnixTimestamp()
                    }
                ],
                currentFrame: null
            }
        ],
        onJoin: [
            {
                animating: false,
                name: "on join",
                repeats: false,
                times: 1,
                frames: [
                    {
                        index: 0,
                        bitmaps: null,
                        animating: false,
                        delayInMs: 3000,
                        startedTimestamp: getUnixTimestamp()
                    }
                ],
                currentFrame: null
            }
        ],
        onVictory: [
            {
                animating: false,
                name: "on VICTORY",
                repeats: false,
                times: 1,
                frames: [
                    {
                        index: 0,
                        bitmaps: ["😎","😴","🤑"],
                        animating: false,
                        delayInMs: 3000,
                        startedTimestamp: getUnixTimestamp()
                    }
                ],
                currentFrame: null
            }
        ],
        onDefeat: [
            {
                animating: false,
                name: "on defeat",
                repeats: false,
                times: 1,
                frames: [
                    {
                        index: 0,
                        bitmaps: ["😭","😢","😩"],
                        animating: false,
                        delayInMs: 3000,
                        startedTimestamp: getUnixTimestamp()
                    }
                ],
                currentFrame: null
            }
        ],
        onMvp: [
            {
                animating: false,
                name: "on MVP",
                repeats: false,
                times: 1,
                frames: [
                    {
                        index: 0,
                        bitmaps: ["🐐","🧞‍♂️"],
                        animating: false,
                        delayInMs: 3000,
                        startedTimestamp: getUnixTimestamp()
                    }
                ],
                currentFrame: null
            }
        ]
    };
}

export function defaultPlayerAnimations(): PlayerAnimations{
    return {
        default: [
            {
                animating: false,
                name: "default",
                repeats: true,
                times: 0,
                frames: [
                    {
                        index: 0,
                        bitmaps: null,
                        animating: false,
                        delayInMs: 0,
                        startedTimestamp: getUnixTimestamp()
                    }
                ],
                currentFrame: null
            },
            {
                animating: false,
                name: "gk",
                repeats: true,
                times: 0,
                frames: [
                    {
                        index: 0,
                        bitmaps: ["🧤"],
                        animating: false,
                        delayInMs: 1000,
                        startedTimestamp: getUnixTimestamp()
                    },
                    {
                        index: 1,
                        bitmaps: null,
                        animating: false,
                        delayInMs: 1000,
                        startedTimestamp: getUnixTimestamp()
                    }
                ],
                currentFrame: null
            }
        ],
        onGoal: [
            {
                animating: false,
                name: "on goal",
                repeats: false,
                times: 1,
                frames: [
                    {
                        index: 0,
                        bitmaps: ["⚽", "👑","💣"],
                        animating: false,
                        delayInMs: 3000,
                        startedTimestamp: getUnixTimestamp()
                    }
                ],
                currentFrame: null
            }
        ],
        onHatTrick: [
            {
                animating: false,
                name: "on hat trick",
                repeats: false,
                times: 1,
                frames: [
                    {
                        index: 0,
                        bitmaps: ["1!"],
                        animating: false,
                        delayInMs: 700,
                        startedTimestamp: getUnixTimestamp()
                    },
                    {
                        index: 1,
                        bitmaps: ["2!"],
                        animating: false,
                        delayInMs: 700,
                        startedTimestamp: getUnixTimestamp()
                    },
                    {
                        index: 2,
                        bitmaps: ["3!"],
                        animating: false,
                        delayInMs: 700,
                        startedTimestamp: getUnixTimestamp()
                    },
                    {
                        index: 3,
                        bitmaps: ["💣"],
                        animating: false,
                        delayInMs: 700,
                        startedTimestamp: getUnixTimestamp()
                    }
                ],
                currentFrame: null
            }
        ],
        onAssist: [
            {
                animating: false,
                name: "on assist",
                repeats: false,
                times: 1,
                frames: [
                    {
                        index: 0,
                        bitmaps: ["👟", "👠"],
                        animating: false,
                        delayInMs: 3000,
                        startedTimestamp: getUnixTimestamp()
                    }
                ],
                currentFrame: null
            }
        ],
        onOwnGoal: [
            {
                animating: false,
                name: "on own goal",
                repeats: false,
                times: 1,
                frames: [
                    {
                        index: 0,
                        bitmaps: ["🥵", "🤡", "👻"],
                        animating: false,
                        delayInMs: 3000,
                        startedTimestamp: getUnixTimestamp()
                    }
                ],
                currentFrame: null
            }
        ],
        ownGoalTeam: [
            {
                animating: false,
                name: "own goal team",
                repeats: false,
                times: 1,
                frames: [
                    {
                        index: 0,
                        bitmaps: ["😐", "🤬"],
                        animating: false,
                        delayInMs: 3000,
                        startedTimestamp: getUnixTimestamp()
                    }
                ],
                currentFrame: null
            }
        ],
        ownGoalOponent: [
            {
                animating: false,
                name: "own goal oponent",
                repeats: false,
                times: 1,
                frames: [
                    {
                        index: 0,
                        bitmaps: ["🤣", "😂"],
                        animating: false,
                        delayInMs: 3000,
                        startedTimestamp: getUnixTimestamp()
                    }
                ],
                currentFrame: null
            }
        ],
        onKick: [
            {
                animating: false,
                name: "on kick",
                repeats: false,
                times: 1,
                frames: [
                    {
                        index: 0,
                        bitmaps: ["😤", "😏", "🥴", "🤬", "🤪", "😠", "😃", "🧐", "🤷‍♀️", "🤦‍♂️", "🧙‍♂️", "😗", "😙", "😛", "🥱", "🗿"],
                        animating: false,
                        delayInMs: 700,
                        startedTimestamp: getUnixTimestamp()
                    }
                ],
                currentFrame: null
            },
            {
                animating: false,
                name: "on kick gk",
                repeats: false,
                times: 1,
                frames: [
                    {
                        index: 0,
                        bitmaps: ["EL"],
                        animating: false,
                        delayInMs: 700,
                        startedTimestamp: getUnixTimestamp()
                    },
                    {
                        index: 1,
                        bitmaps: ["1!"],
                        animating: false,
                        delayInMs: 700,
                        startedTimestamp: getUnixTimestamp()
                    },
                    {
                        index: 2,
                        bitmaps: ["🦸🏻‍♂️​"],
                        animating: false,
                        delayInMs: 700,
                        startedTimestamp: getUnixTimestamp()
                    }
                ],
                currentFrame: null
            }
        ],
        onJoin: [
            {
                animating: false,
                name: "on join",
                repeats: false,
                times: 1,
                frames: [
                    {
                        index: 0,
                        bitmaps: null,
                        animating: false,
                        delayInMs: 3000,
                        startedTimestamp: getUnixTimestamp()
                    }
                ],
                currentFrame: null
            }
        ],
        onVictory: [
            {
                animating: false,
                name: "on VICTORY",
                repeats: false,
                times: 1,
                frames: [
                    {
                        index: 0,
                        bitmaps: ["😎","😴","🤑"],
                        animating: false,
                        delayInMs: 3000,
                        startedTimestamp: getUnixTimestamp()
                    }
                ],
                currentFrame: null
            }
        ],
        onDefeat: [
            {
                animating: false,
                name: "on defeat",
                repeats: false,
                times: 1,
                frames: [
                    {
                        index: 0,
                        bitmaps: ["😭","😢","😩"],
                        animating: false,
                        delayInMs: 3000,
                        startedTimestamp: getUnixTimestamp()
                    }
                ],
                currentFrame: null
            }
        ],
        onMvp: [
            {
                animating: false,
                name: "on MVP",
                repeats: false,
                times: 1,
                frames: [
                    {
                        index: 0,
                        bitmaps: ["🐐","🧞‍♂️"],
                        animating: false,
                        delayInMs: 3000,
                        startedTimestamp: getUnixTimestamp()
                    }
                ],
                currentFrame: null
            }
        ]
    };
} ;