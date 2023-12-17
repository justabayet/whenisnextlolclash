export interface SceneConfig {
  champions: ChampionConfig[]
  resetCamera?: boolean
  disableRotation?: boolean
}

export interface ChampionConfig {
  championKey: string
  skinIndex: number
  position: {
    x: number
    y: number
    z: number
  }
  rotation: {
    x: number
    y: number
    z: number
  }
  setFrame?: number
  animName?: string
  animationSpeed?: number
}

export const scenesConfig: Record<string, SceneConfig> = {
  0: {
    champions: [
      {
        championKey: '32',
        skinIndex: 0,
        position: {
          x: 0,
          y: 0,
          z: -50
        },
        rotation: {
          x: 0,
          y: 0,
          z: 0
        },
        animName: 'taunt'
      }
    ]
  },
  1: {
    champions: [
      {
        championKey: '266',
        skinIndex: 0,
        position: {
          x: -250,
          y: 0,
          z: 0
        },
        rotation: {
          x: 0,
          y: 1.5707963267948966,
          z: 0
        },
        setFrame: 22.22378112942827,
        animName: 'idle_ult'
      }
    ]
  },
  2: {
    champions: [
      {
        championKey: '266',
        skinIndex: 0,
        position: {
          x: -250,
          y: 0,
          z: 0
        },
        rotation: {
          x: 0,
          y: 1.5707963267948966,
          z: 0
        },
        setFrame: 22.22378112942827,
        animName: 'idle_ult'
      },
      {
        championKey: '266',
        skinIndex: 0,
        position: {
          x: 200,
          y: 0,
          z: 100
        },
        rotation: {
          x: 0,
          y: 3.992271210713072,
          z: 0
        },
        setFrame: 40.40687478077867,
        animName: 'idle1'
      }
    ]
  },
  oops: {
    champions: [
      {
        championKey: '74',
        skinIndex: 2,
        position: {
          x: 0,
          y: 0,
          z: 80
        },
        rotation: {
          x: 0,
          y: 0,
          z: 0
        },
        animName: 'run_swag',
        animationSpeed: 1000
      }
    ],
    resetCamera: true,
    disableRotation: true
  }
}

// const testScene: SceneConfig = [
//   {
//     championKey: '266',
//     skinIndex: 0,
//     position: {
//       x: -200,
//       y: 0,
//       z: 0
//     },
//     rotation: {
//       x: 0,
//       y: 1.5707963267948966,
//       z: 0
//     },
//     setFrame: 0,
//     animName: 'idle_ult'
//   },
//   {
//     championKey: '266',
//     skinIndex: 0,
//     position: {
//       x: -200,
//       y: 0,
//       z: 0
//     },
//     rotation: {
//       x: 0,
//       y: 1.5707963267948966,
//       z: 0
//     },
//     setFrame: 0,
//     animName: 'idle1'
//   }
// ]
