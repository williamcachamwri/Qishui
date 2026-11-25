// src/services/sharedState/initialState.ts
// @ts-nocheck
import "../shortcut/type";
import { DEFAULT_QUALITY } from "../player/qualityDefaults";

let initialSharedState: any = {
        queue: {
          appVisibility: {
            isPlayerVisible: true
          },
          queue: null
        },
        player: {
          isPlaying: false,
          isLoading: false,
          isMuted: false,
          volume: 0.3,
          quality: DEFAULT_QUALITY,
          playingQuality: DEFAULT_QUALITY,
          availableQualities: [],
          playableQualities: [],
          overrideQuality: void 0,
          progressPercent: 0,
          progressSeconds: 0,
          durationSeconds: 0,
          mediaEtParams: {},
          isInitialPlay: true,
          currentAudioEffect: null
        },
        user: {
          isLoading: false,
          info: null
        },
        collect: {
          playable: {},
          playlist: {},
          album: {},
          artist: {},
          user: {}
        },
        internalCheck: {
          isPassed: false
        },
        debug: {
          updateProgress: "",
          latestTronBuildId: "",
          latestVersion: ""
        },
        window: {
          windows: {},
          isInactive: false,
          closeActionType: "exit"
        },
        commerce: {
          commerceInfo: void 0,
          purchasedDigitalAlbumsIds: [],
          isAdFree: false,
          isVip: false,
          isFreeVip: false,
          vipExpireAt: 0,
          hasPlayEntitlement: false,
          type: "free",
          audioEffects: []
        },
        update: {
          isUpdateButtonVisible: false,
          isUpdateDialogVisible: false,
          updateType: false,
          isUpdating: false,
          isFailed: false
        },
        shortcut: {
          isGlobalShortcutEnabled: false,
          shortcuts: {
            ["PlayOrPause" /* PlayOrPause */]: {
              inApp: "",
              global: ""
            },
            ["PrevTrack" /* PrevTrack */]: {
              inApp: "",
              global: ""
            },
            ["NextTrack" /* NextTrack */]: {
              inApp: "",
              global: ""
            },
            ["VolumeUp" /* VolumeUp */]: {
              inApp: "",
              global: ""
            },
            ["VolumeDown" /* VolumeDown */]: {
              inApp: "",
              global: ""
            },
            ["Like" /* Like */]: {
              inApp: "",
              global: ""
            },
            ["Dislike" /* Dislike */]: {
              inApp: "",
              global: ""
            }
          }
        },
        desktopLyrics: {
          settings: {
            enabled: false,
            textSize: 24,
            textColor: "light",
            showTranslation: true,
            isLocked: false
          },
          hover: false,
          menuVisible: false
        },
        startup: {
          isAutoStartup: false
        },
        notification: {
          isNotificationEnabled: true
        },
        taskbarWidget: {
          enabled: false,
          autoStart: true,
          preferredSide: void 0,
          widgetState: "docked",
          isDragging: false,
          inDragRegion: false,
          snapStage: null,
          dockedStyle: "nano",
          theme: "dark",
          hover: false
        },
        region: {
          abroadType: "0"
        }
      };

export {
  initialSharedState
};
