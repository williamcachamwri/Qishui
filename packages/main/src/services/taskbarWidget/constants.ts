// src/services/taskbarWidget/constants.ts
// @ts-nocheck

function getTaskbarWidgetNormalWidthDip(variant) {
    switch (variant) {
      case 1:
        return TASKBAR_WIDGET_WIDTH_DIP.normal[1];
      case 2:
        return TASKBAR_WIDGET_WIDTH_DIP.normal[2];
      default:
        return TASKBAR_WIDGET_WIDTH_DIP.normal[1];
    }
  }

let TASKBAR_WIDGET_WIDTH_DIP: any = {
        nano: 108,
        normal: {
          1: 248,
          2: 388
        }
      };

let BLANK_POLL_INTERVAL_MS: any = 500;

let BLANK_CHANGE_VERIFY_DELAY_MS: any = 250;

let Z_ORDER_GUARD_INTERVAL_MS: any = 250;

let SNAP_PREVIEW_DIP: any = 99999;

let SNAP_CONFIRM_DIP: any = 10;

let DOCKED_REPOSITION_EDGE_THRESHOLD_DIP: any = 12;

let DOCKED_EDGE_MARGIN_DIP: any = 12;

let TASKBAR_WIDGET_MAX_HEIGHT_DIP: any = 40;

let MIN_VISIBLE_OVERLAP_DIP: any = 20;

let DOCKED_VISIBILITY_TRANSITION_DURATION_MS: any = 140;

let DOCKED_VISIBILITY_TRANSITION_FRAME_MS: any = 16;

let TASKBAR_WIDGET_PAGE: any = "computer_desktop";

let TASKBAR_WIDGET_LOCATION: any = "pc_taskbar";

let TASKBAR_WIDGET_PLAY_REASON: any = "broadcast_control_widget";

export {
  TASKBAR_WIDGET_WIDTH_DIP,
  DOCKED_EDGE_MARGIN_DIP,
  TASKBAR_WIDGET_MAX_HEIGHT_DIP,
  SNAP_CONFIRM_DIP,
  SNAP_PREVIEW_DIP,
  DOCKED_REPOSITION_EDGE_THRESHOLD_DIP,
  getTaskbarWidgetNormalWidthDip,
  TASKBAR_WIDGET_PAGE,
  TASKBAR_WIDGET_LOCATION,
  TASKBAR_WIDGET_PLAY_REASON,
  DOCKED_VISIBILITY_TRANSITION_DURATION_MS,
  DOCKED_VISIBILITY_TRANSITION_FRAME_MS,
  BLANK_POLL_INTERVAL_MS,
  BLANK_CHANGE_VERIFY_DELAY_MS,
  Z_ORDER_GUARD_INTERVAL_MS,
  MIN_VISIBLE_OVERLAP_DIP
};
