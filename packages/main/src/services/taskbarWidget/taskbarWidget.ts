// src/services/taskbarWidget/taskbarWidget.ts
// @ts-nocheck
import { __require, __toESM, require_taskbar_widget_helper } from "../../../../vendor/index";
import { protocolOf, serviceOf } from "../index";
import { Service, ServiceProtocol } from "../base";
import "../serviceId";
import "../storage/type";
import { StorageState } from "../../base/storage/storageState";
import { State } from "../../base/state/state";
import { initialSharedState } from "../sharedState/initialState";
import "../window/type";
import { CancellationError, CancellationTokenSource } from "../../utils/cancellationToken";
import { delay } from "../../utils/async";
import { BLANK_CHANGE_VERIFY_DELAY_MS, BLANK_POLL_INTERVAL_MS, DOCKED_EDGE_MARGIN_DIP, DOCKED_REPOSITION_EDGE_THRESHOLD_DIP, DOCKED_VISIBILITY_TRANSITION_DURATION_MS, DOCKED_VISIBILITY_TRANSITION_FRAME_MS, MIN_VISIBLE_OVERLAP_DIP, SNAP_CONFIRM_DIP, SNAP_PREVIEW_DIP, TASKBAR_WIDGET_LOCATION, TASKBAR_WIDGET_MAX_HEIGHT_DIP, TASKBAR_WIDGET_PAGE, TASKBAR_WIDGET_PLAY_REASON, TASKBAR_WIDGET_WIDTH_DIP, Z_ORDER_GUARD_INTERVAL_MS, getTaskbarWidgetNormalWidthDip } from "./constants";
import { supportsTaskbarWidget } from "../../utils/os";

function getScaleFactorForPhysicalPoint(point) {
    const dipPoint = import_electron32.screen.screenToDipPoint({ x: point.x, y: point.y });
    return import_electron32.screen.getDisplayNearestPoint(dipPoint).scaleFactor;
  }

function getScaleFactorForPhysicalRect(rect) {
    return getScaleFactorForPhysicalPoint(rect);
  }

function getWidgetWidthDip(style, normalWidthDip) {
    return style === "nano" ? TASKBAR_WIDGET_WIDTH_DIP.nano : normalWidthDip;
  }

function applyDockedMarginToCandidate(candidate, sf = getScaleFactorForPhysicalRect(candidate.rect)) {
    const margin = Math.min(Math.round(DOCKED_EDGE_MARGIN_DIP * sf), candidate.rect.width);
    return {
      ...candidate,
      rect: {
        ...candidate.rect,
        x: candidate.side === "left" ? candidate.rect.x + margin : candidate.rect.x,
        width: candidate.rect.width - margin
      }
    };
  }

function resolveDockedStyle(candidate, normalWidthDip, sf = getScaleFactorForPhysicalRect(candidate.rect)) {
    if (candidate.rect.width >= Math.round(normalWidthDip * sf)) {
      return "normal";
    }
    if (candidate.rect.width >= Math.round(TASKBAR_WIDGET_WIDTH_DIP.nano * sf)) {
      return "nano";
    }
    return null;
  }

function getDockedRect(candidate, style, normalWidthDip, sf = getScaleFactorForPhysicalRect(candidate.rect)) {
    const maxHeight = Math.round(TASKBAR_WIDGET_MAX_HEIGHT_DIP * sf);
    const width = Math.min(Math.round(getWidgetWidthDip(style, normalWidthDip) * sf), candidate.rect.width);
    const height = Math.min(candidate.rect.height, maxHeight);
    const x2 = candidate.side === "right" ? candidate.rect.x + candidate.rect.width - width : candidate.rect.x;
    return {
      x: x2,
      y: candidate.rect.y + Math.round((candidate.rect.height - height) / 2),
      width,
      height: Math.max(1, height)
    };
  }

function edgeDistance(a2, b2) {
    const gapX = Math.max(a2.x, b2.x) - Math.min(a2.x + a2.width, b2.x + b2.width);
    const gapY = Math.max(a2.y, b2.y) - Math.min(a2.y + a2.height, b2.y + b2.height);
    const dx = Math.max(0, gapX);
    const dy = Math.max(0, gapY);
    return Math.sqrt(dx * dx + dy * dy);
  }

function rectsIntersect(a2, b2) {
    const overlapX = Math.max(
      0,
      Math.min(a2.x + a2.width, b2.x + b2.width) - Math.max(a2.x, b2.x)
    );
    const overlapY = Math.max(
      0,
      Math.min(a2.y + a2.height, b2.y + b2.height) - Math.max(a2.y, b2.y)
    );
    return overlapX > 0 && overlapY > 0;
  }

function getSnapStage(distancePhysical, sf) {
    if (distancePhysical < SNAP_CONFIRM_DIP * sf) return "confirm";
    if (distancePhysical < SNAP_PREVIEW_DIP * sf) return "preview";
    return null;
  }

function getDockedEdge(rect, side) {
    return side === "right" ? rect.x + rect.width : rect.x;
  }

function getDistanceToTaskbarSide(rect, taskbarRect, side) {
    return Math.abs(getDockedEdge(rect, side) - getDockedEdge(taskbarRect, side));
  }

function getWindowPhysicalRect(helper, win) {
    if (win.isDestroyed()) return null;
    return helper.getWindowRect(win.getNativeWindowHandle());
  }

function shouldRepositionDockedWindow(helper, win, candidate, targetPhysicalBounds, targetBounds) {
    const currentPhysicalBounds = helper ? getWindowPhysicalRect(helper, win) : null;
    if (currentPhysicalBounds) {
      const scaleFactor = getScaleFactorForPhysicalRect(targetPhysicalBounds);
      const edgeDeltaThreshold = Math.round(DOCKED_REPOSITION_EDGE_THRESHOLD_DIP * scaleFactor);
      if (currentPhysicalBounds.y !== targetPhysicalBounds.y || currentPhysicalBounds.width !== targetPhysicalBounds.width || currentPhysicalBounds.height !== targetPhysicalBounds.height) {
        return true;
      }
      const edgeDelta2 = Math.abs(
        getDockedEdge(currentPhysicalBounds, candidate.side) - getDockedEdge(targetPhysicalBounds, candidate.side)
      );
      return edgeDelta2 > edgeDeltaThreshold;
    }
    const currentBounds = win.getBounds();
    if (currentBounds.y !== targetBounds.y || currentBounds.width !== targetBounds.width || currentBounds.height !== targetBounds.height) {
      return true;
    }
    const edgeDelta = Math.abs(
      getDockedEdge(currentBounds, candidate.side) - getDockedEdge(targetBounds, candidate.side)
    );
    return edgeDelta > DOCKED_REPOSITION_EDGE_THRESHOLD_DIP;
  }

function clampBoundsToNearestDisplay(bounds) {
    const nearest = import_electron32.screen.getDisplayNearestPoint({ x: bounds.x, y: bounds.y });
    const workArea = nearest.workArea;
    const width = Math.min(bounds.width, workArea.width);
    const height = Math.min(bounds.height, workArea.height);
    return {
      x: Math.max(workArea.x, Math.min(bounds.x, workArea.x + workArea.width - width)),
      y: Math.max(workArea.y, Math.min(bounds.y, workArea.y + workArea.height - height)),
      width,
      height
    };
  }

function isTaskbarPositionSupported(taskbarRect) {
    return taskbarRect.width >= taskbarRect.height;
  }

function getUnsupportedTaskbarFallbackPosition(normalWidthDip) {
    const width = getWidgetWidthDip("free", normalWidthDip);
    const height = TASKBAR_WIDGET_MAX_HEIGHT_DIP;
    const workArea = import_electron32.screen.getPrimaryDisplay().workArea;
    const bounds = clampBoundsToNearestDisplay({
      x: Math.round(workArea.x + workArea.width * 0.8),
      y: Math.round(workArea.y + workArea.height * 0.8),
      width,
      height
    });
    return {
      x: bounds.x,
      y: bounds.y
    };
  }

let import_electron32: any = __require("electron");

let SUPPORTS_TASKBAR_WIDGET: any = supportsTaskbarWidget();

let TASKBAR_WIDGET_PREFERENCES_STORAGE_KEY: any = "taskbarWidgetPreferences";

class TaskbarWidgetService extends Service {
        state = new State(initialSharedState.taskbarWidget);
        preferences = new StorageState(
          "Config" /* config */,
          TASKBAR_WIDGET_PREFERENCES_STORAGE_KEY,
          {
            autoStart: initialSharedState.taskbarWidget.autoStart,
            preferredSide: initialSharedState.taskbarWidget.preferredSide
          }
        );
        widgetEnabledByAB = false;
        widgetVariant = 1;
        enableTask = null;
        enableTokenSource = null;
        helper = null;
        tracker = null;
        drag = null;
        hover = null;
        preview = null;
        taskbarThemeListener = null;
        nativeHandles = /* @__PURE__ */ new Set();
        appExitCleanupRegistered = false;
        appExiting = false;
        blankPollTimer = null;
        blankPollInFlight = false;
        blankPollQueued = false;
        zOrderGuardTimer = null;
        cachedCandidates = [];
        cachedTaskbarHwnd = null;
        cachedTaskbarRect = null;
        displayChangeHandler = null;
        openSource = "manual";
        taskbarSupportsDocking = true;
        shadowPreviewActive = false;
        dockedPresentation = {
          hasPresented: false,
          visible: false,
          side: null,
          transitionVersion: 0
        };
        candidateStableEdges = /* @__PURE__ */ new Map();
        blankShrinkVerifyTimer = null;
        blankShrinkVerified = false;
        onAppExit = () => this.disposeNativeRuntime();
        async initialize() {
          if (!SUPPORTS_TASKBAR_WIDGET) return;
          this.registerAppExitCleanup();
          this.state.onUpdateBatched((state, previousState) => {
            protocolOf("sharedState" /* sharedState */).update("taskbarWidget", state);
            if (state.autoStart !== previousState.autoStart || state.preferredSide !== previousState.preferredSide) {
              this.preferences.set({
                autoStart: state.autoStart,
                preferredSide: state.preferredSide
              });
            }
          });
          await this.restorePreferences();
          await this.syncWidgetABConfig();
          protocolOf("appSettings" /* appSettings */).onUpdate((data) => {
            this.applyWidgetABConfig(data.luna_pc_common_server_params?.win_widget);
          });
          if (this.state.value.autoStart && this.widgetEnabledByAB) {
            await this.setEnabled(true, { source: "autostart" });
          }
        }
        async setEnabled(enabled, options = {}) {
          if (enabled && this.appExiting) return;
          if (!enabled) {
            this.cancelEnableTask();
            await this.deactivate();
            return;
          }
          if (!this.widgetEnabledByAB) {
            this.cancelEnableTask();
            await this.deactivate();
            return;
          }
          this.openSource = options.source ?? "manual";
          const previousTask = this.enableTask ?? Promise.resolve();
          const tokenSource = new CancellationTokenSource();
          this.cancelEnableTask();
          this.enableTokenSource = tokenSource;
          const task = previousTask.catch(() => {
          }).then(() => this.activate(tokenSource)).catch((error) => {
            if (error instanceof CancellationError) {
              return;
            }
            throw error;
          }).finally(() => {
            if (this.enableTask === task) {
              this.enableTask = null;
            }
            if (this.enableTokenSource === tokenSource) {
              this.enableTokenSource = null;
            }
          });
          this.enableTask = task;
          return task;
        }
        async syncWidgetABConfig() {
          const commonServerParams = await protocolOf("appSettings" /* appSettings */).getSetting("luna_pc_common_server_params");
          this.applyWidgetABConfig(commonServerParams?.win_widget);
        }
        applyWidgetABConfig(winWidget, isInitialSync = false) {
          const prevEnabledByAB = this.widgetEnabledByAB;
          this.widgetEnabledByAB = Boolean(winWidget?.enabled);
          this.setWidgetVariant(winWidget?.variant ?? 1);
          if (!isInitialSync) {
            if (this.widgetEnabledByAB) {
              if (!prevEnabledByAB && this.state.value.autoStart) {
                this.setEnabled(true, { source: "autostart" });
              }
            } else {
              this.cancelEnableTask();
              this.deactivate();
            }
          }
        }
        async restorePreferences() {
          const preferences = await this.preferences.getWhenReady();
          this.state.update((state) => {
            state.autoStart = preferences.autoStart;
            state.preferredSide = preferences.preferredSide;
          });
        }
        setWidgetVariant(variant) {
          if (this.widgetVariant === variant) return;
          this.widgetVariant = variant;
          if (this.state.value.widgetState === "free") {
            const win = this.getWidgetWindow();
            if (win) {
              this.positionToFree(win);
            }
          }
        }
        getNormalWidthDip() {
          return getTaskbarWidgetNormalWidthDip(this.widgetVariant);
        }
        getWidgetStyle() {
          return this.state.value.widgetState === "docked" && this.state.value.dockedStyle === "nano" ? "nano" : String(this.widgetVariant);
        }
        getReportContext() {
          return {
            scene_name: this.openSource === "autostart" ? "widget_autostart" : "widget_manual",
            page: TASKBAR_WIDGET_PAGE,
            widget_location: TASKBAR_WIDGET_LOCATION,
            widget_style: this.getWidgetStyle()
          };
        }
        getPlaySourceParams() {
          return {
            play_reason: TASKBAR_WIDGET_PLAY_REASON,
            widget_style: this.getWidgetStyle()
          };
        }
        disposeNativeRuntime() {
          this.appExiting = true;
          this.cancelEnableTask();
          this.stopBlankPolling();
          this.stopZOrderGuard();
          this.stopListeningDisplayChanges();
          this.helper = null;
          this.tracker = null;
          this.drag = null;
          this.hover = null;
          this.preview = null;
          this.taskbarThemeListener = null;
          const handles = [...this.nativeHandles].reverse();
          this.nativeHandles.clear();
          for (const handle of handles) {
            try {
              handle.destroy();
            } catch (error) {
              console.error("[TaskbarWidget] failed to destroy native handle", error);
            }
          }
        }
        registerAppExitCleanup() {
          if (this.appExitCleanupRegistered) return;
          this.appExitCleanupRegistered = true;
          import_electron32.app.on("before-quit", this.onAppExit);
          import_electron32.app.on("quit", this.onAppExit);
        }
        ownNativeHandle(handle) {
          this.nativeHandles.add(handle);
          return handle;
        }
        destroyNativeHandle(handle) {
          if (!handle || !this.nativeHandles.delete(handle)) return;
          handle.destroy();
        }
        cancelEnableTask() {
          this.enableTokenSource?.cancel();
          this.enableTokenSource = null;
        }
        throwIfEnableTaskCancelled(tokenSource) {
          if (tokenSource !== this.enableTokenSource) {
            throw new CancellationError();
          }
          tokenSource.token.throwIfCancellationRequested();
        }
        hasActiveRuntime() {
          return !!(this.helper && this.tracker && this.drag && this.hover && this.preview);
        }
        attachRuntime(runtime) {
          this.helper = runtime.helper;
          this.tracker = runtime.tracker;
          this.drag = runtime.drag;
          this.hover = runtime.hover;
          this.preview = runtime.preview;
          this.taskbarThemeListener = runtime.taskbarThemeListener;
        }
        detachRuntime(runtime) {
          if (!runtime) return;
          if (this.helper === runtime.helper) {
            this.helper = null;
          }
          if (this.tracker === runtime.tracker) {
            this.tracker = null;
          }
          if (this.drag === runtime.drag) {
            this.drag = null;
          }
          if (this.hover === runtime.hover) {
            this.hover = null;
          }
          if (this.preview === runtime.preview) {
            this.preview = null;
          }
          if (this.taskbarThemeListener === runtime.taskbarThemeListener) {
            this.taskbarThemeListener = null;
          }
        }
        destroyRuntime(runtime) {
          if (!runtime) return;
          this.destroyNativeHandle(runtime.taskbarThemeListener);
          this.destroyNativeHandle(runtime.preview);
          this.destroyNativeHandle(runtime.drag);
          this.destroyNativeHandle(runtime.hover);
          this.destroyNativeHandle(runtime.tracker);
        }
        async activate(tokenSource) {
          this.throwIfEnableTaskCancelled(tokenSource);
          if (this.hasActiveRuntime()) return;
          this.state.update((state) => {
            state.enabled = true;
          });
          if (process.platform === "darwin") {
            this.throwIfEnableTaskCancelled(tokenSource);
            const win = await serviceOf("window" /* window */).showOrCreateAndWaitForReady("taskbarWidget" /* taskbarWidget */);
            if (!win) {
              this.throwIfEnableTaskCancelled(tokenSource);
              this.deactivate();
              return;
            }
            this.throwIfEnableTaskCancelled(tokenSource);
            return;
          }
          const helper = await Promise.resolve().then(() => __toESM(require_taskbar_widget_helper()));
          this.throwIfEnableTaskCancelled(tokenSource);
          const tracker = this.ownNativeHandle(helper.createTracker());
          let runtime = null;
          let runtimeAttached = false;
          try {
            runtime = await this.createRuntime(helper, tracker, tokenSource);
            if (!runtime) {
              this.throwIfEnableTaskCancelled(tokenSource);
              this.deactivate();
              return;
            }
            this.throwIfEnableTaskCancelled(tokenSource);
            this.attachRuntime(runtime);
            runtimeAttached = true;
            this.state.update((s2) => {
              s2.widgetState = "docked";
              s2.isDragging = false;
            });
            this.syncBlankPollingMaintenance();
            this.syncDockedMaintenance();
            this.listenDisplayChanges();
          } catch (error) {
            if (runtimeAttached) {
              this.detachRuntime(runtime);
            }
            this.destroyRuntime(runtime);
            this.destroyNativeHandle(tracker);
            if (error instanceof CancellationError) {
              return;
            }
            this.deactivate();
            throw error;
          }
        }
        async createRuntime(helper, tracker, tokenSource) {
          this.throwIfEnableTaskCancelled(tokenSource);
          const widget = await this.initWidgetWindow(helper, tokenSource);
          if (!widget) {
            this.destroyNativeHandle(tracker);
            return null;
          }
          let taskbarThemeListener = null;
          let preview = null;
          try {
            await this.initShadowWindow(helper, tokenSource);
            this.throwIfEnableTaskCancelled(tokenSource);
            this.syncTaskbarTheme(helper);
            taskbarThemeListener = this.ownNativeHandle(this.createTaskbarThemeListener(helper));
            preview = this.ownNativeHandle(helper.createPreviewHelper());
            this.setupDragCallbacks(widget.drag);
            this.setupHoverCallbacks(widget.hover);
            this.setupPreviewCallbacks(preview);
            return {
              helper,
              tracker,
              drag: widget.drag,
              hover: widget.hover,
              preview,
              taskbarThemeListener
            };
          } catch (error) {
            this.destroyNativeHandle(taskbarThemeListener);
            this.destroyNativeHandle(preview);
            this.destroyNativeHandle(widget.drag);
            this.destroyNativeHandle(widget.hover);
            this.destroyNativeHandle(tracker);
            throw error;
          }
        }
        async waitForWidgetDomReady(win, tokenSource) {
          if (win.isDestroyed() || win.webContents.isDestroyed()) return false;
          if (!win.webContents.isLoading()) return true;
          return new Promise((resolve, reject) => {
            const cleanup = () => {
              win.webContents.removeListener("dom-ready", onDomReady);
              win.webContents.removeListener("destroyed", onDestroyed);
              win.removeListener("closed", onClosed);
            };
            const onDomReady = () => {
              cleanup();
              resolve(true);
            };
            const onDestroyed = () => {
              cleanup();
              resolve(false);
            };
            const onClosed = () => {
              cleanup();
              resolve(false);
            };
            tokenSource.token.cancellationPromise.catch((error) => {
              cleanup();
              reject(error);
            });
            win.webContents.once("dom-ready", onDomReady);
            win.webContents.once("destroyed", onDestroyed);
            win.once("closed", onClosed);
          });
        }
        async initWidgetWindow(helper, tokenSource) {
          const win = await serviceOf("window" /* window */).createOrWaitForReady("taskbarWidget" /* taskbarWidget */);
          if (!win) return null;
          this.throwIfEnableTaskCancelled(tokenSource);
          if (!await this.waitForWidgetDomReady(win, tokenSource)) {
            return null;
          }
          this.throwIfEnableTaskCancelled(tokenSource);
          const widgetHwnd = win.getNativeWindowHandle();
          const taskbarHwnd = helper.findTaskbar();
          this.cachedTaskbarHwnd = taskbarHwnd;
          helper.setWidgetStyles(widgetHwnd);
          if (taskbarHwnd) {
            helper.setOwner(widgetHwnd, taskbarHwnd);
          }
          const drag = this.ownNativeHandle(helper.createDragHelper(widgetHwnd));
          let hover = null;
          try {
            hover = this.ownNativeHandle(helper.createHoverHelper(widgetHwnd));
            this.throwIfEnableTaskCancelled(tokenSource);
            return { drag, hover };
          } catch (error) {
            this.destroyNativeHandle(hover);
            this.destroyNativeHandle(drag);
            throw error;
          }
        }
        async initShadowWindow(helper, tokenSource) {
          const shadowWin = await serviceOf("window" /* window */).createOrWaitForReady("taskbarWidgetShadow" /* taskbarWidgetShadow */);
          this.throwIfEnableTaskCancelled(tokenSource);
          if (shadowWin) {
            const shadowHwnd = shadowWin.getNativeWindowHandle();
            helper.setWidgetStyles(shadowHwnd);
            if (this.cachedTaskbarHwnd) {
              helper.setOwner(shadowHwnd, this.cachedTaskbarHwnd);
            }
            this.parkShadowOffscreen(shadowWin, {
              width: getWidgetWidthDip("free", this.getNormalWidthDip()),
              height: TASKBAR_WIDGET_MAX_HEIGHT_DIP
            });
            shadowWin.showInactive();
          }
        }
        getWidgetWindow() {
          return serviceOf("window" /* window */).getBrowserWindow("taskbarWidget" /* taskbarWidget */);
        }
        getShadowWindow() {
          return serviceOf("window" /* window */).getBrowserWindow("taskbarWidgetShadow" /* taskbarWidgetShadow */);
        }
        async deactivate() {
          this.resetDockedPresentation(this.getWidgetWindow(), { resetHistory: true });
          this.state.update((state) => {
            state.enabled = false;
          });
          this.getWidgetWindow()?.hide();
          this.getShadowWindow()?.hide();
          this.helper?.refreshCursor();
          this.stopBlankPolling();
          this.stopZOrderGuard();
          this.stopListeningDisplayChanges();
          this.stopListeningTaskbarThemeChanges();
          if (this.drag) {
            this.destroyNativeHandle(this.drag);
            this.drag = null;
          }
          if (this.hover) {
            this.destroyNativeHandle(this.hover);
            this.hover = null;
          }
          if (this.preview) {
            this.destroyNativeHandle(this.preview);
            this.preview = null;
          }
          if (this.tracker) {
            this.destroyNativeHandle(this.tracker);
            this.tracker = null;
          }
          await protocolOf("window" /* window */).destroy("taskbarWidgetShadow" /* taskbarWidgetShadow */);
          await protocolOf("window" /* window */).destroy("taskbarWidget" /* taskbarWidget */);
          this.cachedCandidates = [];
          this.cachedTaskbarHwnd = null;
          this.cachedTaskbarRect = null;
          this.candidateStableEdges.clear();
          this.taskbarSupportsDocking = true;
          this.shadowPreviewActive = false;
          this.resetWidgetState();
          this.helper = null;
        }
        syncTaskbarTheme(helper = this.helper) {
          if (!helper) return;
          this.setTaskbarTheme(helper.utils.getTaskbarTheme());
        }
        createTaskbarThemeListener(helper) {
          return helper.utils.onTaskbarThemeChanged((theme) => {
            this.setTaskbarTheme(theme);
          });
        }
        stopListeningTaskbarThemeChanges() {
          if (!this.taskbarThemeListener) return;
          this.destroyNativeHandle(this.taskbarThemeListener);
          this.taskbarThemeListener = null;
        }
        setTaskbarTheme(theme) {
          if (this.state.value.theme === theme) return;
          this.state.update((state) => {
            state.theme = theme;
          });
        }
        resetWidgetState() {
          this.state.update((s2) => {
            s2.snapStage = null;
            s2.widgetState = "docked";
            s2.isDragging = false;
            s2.inDragRegion = false;
            s2.dockedStyle = "nano";
            s2.hover = false;
          });
        }
        enterDragState() {
          this.state.update((s2) => {
            s2.widgetState = "free";
            s2.isDragging = true;
            s2.snapStage = null;
          });
        }
        finishDragToDocked(candidate, dockedStyle) {
          this.state.update((s2) => {
            s2.preferredSide = candidate.side;
            s2.widgetState = "docked";
            s2.isDragging = false;
            s2.snapStage = null;
            s2.dockedStyle = dockedStyle;
          });
        }
        finishDragToFree() {
          this.state.update((s2) => {
            s2.widgetState = "free";
            s2.isDragging = false;
            s2.snapStage = null;
          });
        }
        setSnapStage(stage) {
          if (this.state.value.snapStage === stage) return;
          this.state.update((s2) => {
            s2.snapStage = stage;
          });
        }
        setupHoverCallbacks(hover = this.hover) {
          if (!hover) return;
          hover.onHoverChange((hovering) => this.handleHoverChange(hovering));
          hover.onDragRegionChange((inDragRegion) => this.handleDragRegionChange(inDragRegion));
          this.syncPointerState(hover);
        }
        handleHoverChange(hovering) {
          this.setHover(hovering);
        }
        handleDragRegionChange(inDragRegion) {
          this.setInDragRegion(inDragRegion);
        }
        setHover(hover) {
          if (this.state.value.hover === hover) return;
          this.state.update((state) => {
            state.hover = hover;
          });
        }
        setInDragRegion(inDragRegion) {
          if (this.state.value.inDragRegion === inDragRegion) return;
          this.state.update((state) => {
            state.inDragRegion = inDragRegion;
          });
        }
        syncPointerState(hover = this.hover) {
          if (!hover) return;
          this.setHover(hover.isHovering());
          this.setInDragRegion(hover.isInDragRegion());
        }
        setupDragCallbacks(drag = this.drag) {
          if (!drag) return;
          drag.onDragStart(() => this.handleDragStart());
          drag.onDragMove((windowRect) => this.handleDragMove(windowRect));
          drag.onDragEnd((windowRect) => this.handleDragEnd(windowRect));
        }
        setupPreviewCallbacks(preview = this.preview) {
          if (!preview) return;
          preview.onPreviewWindowChange(() => this.handlePreviewWindowChange());
        }
        handlePreviewWindowChange() {
          this.ensureWidgetAboveTaskbar();
        }
        handleDragStart() {
          this.enterDragState();
          this.syncDockedMaintenance();
          const win = this.getWidgetWindow();
          if (win) {
            this.positionToFree(win);
          }
          this.syncPointerState();
        }
        handleDragMove(windowRect) {
          const shadowWin = this.getShadowWindow();
          if (!shadowWin) return;
          if (!this.taskbarSupportsDocking) {
            this.clearShadowPreview(shadowWin);
            return;
          }
          const snapTarget = this.resolveSnapTarget(windowRect);
          if (!snapTarget) {
            this.clearShadowPreview(shadowWin);
            return;
          }
          if (!this.shadowPreviewActive) {
            this.ensureShadowAboveTaskbar(shadowWin);
            this.shadowPreviewActive = true;
          }
          this.positionToDocked(shadowWin, snapTarget.nearest.candidate, snapTarget.dockedStyle);
          this.setShadowStage(snapTarget.stage);
        }
        handleDragEnd(windowRect) {
          const shadowWin = this.getShadowWindow();
          if (shadowWin) {
            this.clearShadowPreview(shadowWin);
          } else {
            this.setSnapStage(null);
          }
          const win = this.getWidgetWindow();
          const snapTarget = this.resolveSnapTarget(windowRect);
          if (snapTarget?.stage === "confirm") {
            this.finishDragToDocked(snapTarget.nearest.candidate, snapTarget.dockedStyle);
            if (win) {
              void this.applyDockedPresentationTarget(
                win,
                {
                  candidate: snapTarget.nearest.candidate,
                  style: snapTarget.dockedStyle
                },
                { animated: false }
              );
            }
          } else {
            this.finishDragToFree();
            if (win) {
              this.positionToFree(win);
            }
          }
          this.syncDockedMaintenance();
          this.syncPointerState();
        }
        resolveSnapTarget(windowRect) {
          if (!this.taskbarSupportsDocking) return null;
          const taskbarRect = this.getTaskbarRect();
          const isIntersectingTaskbar = taskbarRect ? rectsIntersect(windowRect, taskbarRect) : false;
          const nearest = isIntersectingTaskbar && taskbarRect ? this.findNearestCandidateByTaskbarSide(windowRect, taskbarRect) : this.findNearestCandidate(windowRect);
          if (!nearest) return null;
          const scaleFactor = getScaleFactorForPhysicalRect(nearest.candidate.rect);
          const stage = isIntersectingTaskbar ? "confirm" : getSnapStage(nearest.distance, scaleFactor);
          const dockedStyle = resolveDockedStyle(nearest.candidate, this.getNormalWidthDip());
          if (!stage || !dockedStyle) return null;
          return {
            nearest,
            stage,
            dockedStyle
          };
        }
        clearShadowPreview(shadowWin) {
          if (this.shadowPreviewActive) {
            this.parkShadowOffscreen(shadowWin);
            this.shadowPreviewActive = false;
          }
          this.setSnapStage(null);
        }
        parkShadowOffscreen(shadowWin, size) {
          if (shadowWin.isDestroyed()) return;
          if (size) {
            shadowWin.setBounds({ x: -32e3, y: -32e3, ...size });
          } else {
            shadowWin.setPosition(-32e3, -32e3);
          }
        }
        getTaskbarRect() {
          const taskbarRect = this.tracker?.getTaskbarInfo()?.rect ?? this.cachedTaskbarRect;
          if (taskbarRect) {
            this.cachedTaskbarRect = taskbarRect;
          }
          return taskbarRect;
        }
        findNearestCandidateBy(getDistance) {
          let best;
          let bestDist = Infinity;
          const normalWidthDip = this.getNormalWidthDip();
          for (const c2 of this.cachedCandidates) {
            const sf = getScaleFactorForPhysicalRect(c2.rect);
            const dockedStyle = resolveDockedStyle(c2, normalWidthDip, sf);
            if (!dockedStyle) continue;
            const dist = getDistance(c2, dockedStyle, sf);
            if (dist < bestDist) {
              bestDist = dist;
              best = c2;
            }
          }
          if (!best) return void 0;
          return { candidate: best, distance: bestDist };
        }
        findNearestCandidate(windowRect) {
          const normalWidthDip = this.getNormalWidthDip();
          return this.findNearestCandidateBy((candidate, dockedStyle, sf) => edgeDistance(windowRect, getDockedRect(candidate, dockedStyle, normalWidthDip, sf)));
        }
        findNearestCandidateByTaskbarSide(windowRect, taskbarRect) {
          return this.findNearestCandidateBy((candidate) => getDistanceToTaskbarSide(windowRect, taskbarRect, candidate.side));
        }
        ensureShadowAboveTaskbar(shadowWin) {
          const helper = this.helper;
          if (!helper || shadowWin.isDestroyed()) return;
          const taskbarHwnd = this.getTaskbarHwnd(helper);
          if (!taskbarHwnd) return;
          helper.ensureAboveTaskbar(shadowWin.getNativeWindowHandle(), taskbarHwnd);
        }
        setShadowStage(stage) {
          this.setSnapStage(stage);
        }
        getDefaultPreferredSide(candidates = this.cachedCandidates) {
          return candidates.find((c2) => c2.side === "left")?.side ?? candidates.find((c2) => c2.side === "right")?.side;
        }
        ensurePreferredSide(candidates = this.cachedCandidates) {
          if (this.state.value.preferredSide) {
            return this.state.value.preferredSide;
          }
          const preferredSide = this.getDefaultPreferredSide(candidates);
          if (!preferredSide) {
            return void 0;
          }
          this.state.update((s2) => {
            s2.preferredSide = preferredSide;
          });
          return preferredSide;
        }
        getPreferredCandidate() {
          const preferredSide = this.ensurePreferredSide();
          return this.cachedCandidates.find((c2) => c2.side === preferredSide) ?? this.cachedCandidates[0];
        }
        getPreferredDockedPresentationTarget(sf) {
          const candidate = this.getPreferredCandidate();
          const style = candidate && resolveDockedStyle(candidate, this.getNormalWidthDip(), sf);
          if (!candidate || !style) {
            return null;
          }
          return { candidate, style };
        }
        setDockedStyle(style) {
          if (this.state.value.dockedStyle === style) return;
          this.state.update((s2) => {
            s2.dockedStyle = style;
          });
        }
        resetDockedPresentation(win = this.getWidgetWindow(), options = {}) {
          this.dockedPresentation.transitionVersion += 1;
          this.dockedPresentation.visible = false;
          this.dockedPresentation.side = null;
          if (options.resetHistory) {
            this.dockedPresentation.hasPresented = false;
          }
          if (!win || win.isDestroyed()) return;
          win.setOpacity(1);
        }
        markDockedPresentationVisible(side) {
          this.dockedPresentation.hasPresented = true;
          this.dockedPresentation.visible = true;
          this.dockedPresentation.side = side;
        }
        isDockedPresentationTransitionActive(transitionId) {
          return transitionId === this.dockedPresentation.transitionVersion;
        }
        shouldAnimateDockedPresentationChange(target2, wasVisible, animated) {
          if (!animated || !this.dockedPresentation.hasPresented) {
            return false;
          }
          if (!target2) {
            return wasVisible;
          }
          return !wasVisible || this.dockedPresentation.side !== target2.candidate.side;
        }
        easeInOutCubic(progress3) {
          return progress3 < 0.5 ? 4 * progress3 * progress3 * progress3 : 1 - Math.pow(-2 * progress3 + 2, 3) / 2;
        }
        // Keep the fade in main process so native hide/show and fallback-side switching stay in sync.
        async animateWindowOpacity(win, from, to, transitionId) {
          if (win.isDestroyed()) return false;
          win.setOpacity(from);
          const start = Date.now();
          while (true) {
            if (win.isDestroyed() || !this.isDockedPresentationTransitionActive(transitionId)) {
              return false;
            }
            const progress3 = Math.min(1, (Date.now() - start) / DOCKED_VISIBILITY_TRANSITION_DURATION_MS);
            const easedProgress = this.easeInOutCubic(progress3);
            win.setOpacity(from + (to - from) * easedProgress);
            if (progress3 >= 1) {
              return true;
            }
            await delay(DOCKED_VISIBILITY_TRANSITION_FRAME_MS);
          }
        }
        async applyDockedPresentationTarget(win, target2, options = {}) {
          if (win.isDestroyed()) return;
          const animated = options.animated ?? true;
          const transitionId = ++this.dockedPresentation.transitionVersion;
          const wasVisible = win.isVisible() && this.dockedPresentation.visible;
          const shouldAnimate = this.shouldAnimateDockedPresentationChange(target2, wasVisible, animated);
          const shouldFadeOutBeforeUpdate = shouldAnimate && (!target2 || wasVisible);
          if (shouldFadeOutBeforeUpdate) {
            const fadedOut = await this.animateWindowOpacity(win, 1, 0, transitionId);
            if (!fadedOut) return;
          }
          if (win.isDestroyed() || !this.isDockedPresentationTransitionActive(transitionId)) return;
          if (!target2) {
            win.hide();
            this.dockedPresentation.visible = false;
            this.dockedPresentation.side = null;
            return;
          }
          win.setOpacity(shouldAnimate ? 0 : 1);
          this.positionToDocked(win, target2.candidate, target2.style, {
            respectEdgeThreshold: !(shouldAnimate || !wasVisible)
          });
          this.ensureWidgetAboveTaskbar(win, { noCheckDocked: true });
          if (shouldAnimate) {
            const fadedIn = await this.animateWindowOpacity(win, 0, 1, transitionId);
            if (!fadedIn) return;
          }
          if (win.isDestroyed() || !this.isDockedPresentationTransitionActive(transitionId)) return;
          this.markDockedPresentationVisible(target2.candidate.side);
        }
        positionToFree(win, position5) {
          if (win.isDestroyed()) return;
          this.resetDockedPresentation(win);
          const bounds = win.getBounds();
          const nextBounds = {
            ...bounds,
            ...position5,
            width: getWidgetWidthDip("free", this.getNormalWidthDip()),
            height: TASKBAR_WIDGET_MAX_HEIGHT_DIP
          };
          win.setBounds(nextBounds);
          if (!win.isVisible()) {
            win.showInactive();
          }
        }
        shouldMaintainDockedWidget() {
          return this.state.value.widgetState === "docked" && !this.drag?.isDragging();
        }
        shouldRefreshBlankCandidates() {
          return this.hasActiveRuntime();
        }
        syncBlankPollingMaintenance() {
          this.setBlankPollingEnabled(this.shouldRefreshBlankCandidates());
        }
        syncDockedMaintenance() {
          this.setZOrderGuardEnabled(this.shouldMaintainDockedWidget());
        }
        setBlankPollingEnabled(enabled) {
          if (!enabled) {
            this.stopBlankPolling();
            return;
          }
          if (this.blankPollTimer) return;
          this.blankPollTimer = setInterval(() => this.requestBlankPoll(), BLANK_POLL_INTERVAL_MS);
          this.requestBlankPoll();
        }
        stopBlankPolling() {
          if (this.blankPollTimer) {
            clearInterval(this.blankPollTimer);
            this.blankPollTimer = null;
          }
          this.blankPollQueued = false;
          this.cancelBlankVerification();
        }
        requestBlankPoll() {
          if (this.blankPollInFlight) {
            this.blankPollQueued = true;
            return;
          }
          const tracker = this.tracker;
          void this.runBlankPoll().catch((error) => {
            if (!tracker || this.tracker !== tracker) return;
            console.error("[TaskbarWidget] blank poll failed", error);
          });
        }
        async runBlankPoll() {
          this.blankPollInFlight = true;
          try {
            await this.pollBlanks();
          } finally {
            this.blankPollInFlight = false;
            if (this.blankPollQueued && this.blankPollTimer) {
              this.blankPollQueued = false;
              this.requestBlankPoll();
              return;
            }
            this.blankPollQueued = false;
          }
        }
        stabilizeCandidates(candidates) {
          if (!this.shouldMaintainDockedWidget()) {
            this.candidateStableEdges.clear();
            return candidates;
          }
          const verified = this.blankShrinkVerified;
          this.blankShrinkVerified = false;
          const currentSides = new Set(candidates.map((c2) => c2.side));
          for (const side of this.candidateStableEdges.keys()) {
            if (!currentSides.has(side)) {
              this.candidateStableEdges.delete(side);
            }
          }
          let changed = false;
          const result = candidates.map((c2) => {
            const edge = c2.side === "right" ? c2.rect.x + c2.rect.width : c2.rect.x;
            const stableEdge = this.candidateStableEdges.get(c2.side);
            if (stableEdge === void 0 || verified) {
              this.candidateStableEdges.set(c2.side, edge);
              return c2;
            }
            if (edge === stableEdge) return c2;
            changed = true;
            return c2;
          });
          if (changed) {
            this.scheduleBlankVerification();
            return this.cachedCandidates;
          }
          return result;
        }
        scheduleBlankVerification() {
          if (this.blankShrinkVerifyTimer) return;
          this.blankShrinkVerifyTimer = setTimeout(() => {
            this.blankShrinkVerifyTimer = null;
            this.blankShrinkVerified = true;
            this.restartBlankPollTimer();
            this.requestBlankPoll();
          }, BLANK_CHANGE_VERIFY_DELAY_MS);
        }
        restartBlankPollTimer() {
          if (!this.blankPollTimer) return;
          clearInterval(this.blankPollTimer);
          this.blankPollTimer = setInterval(() => this.requestBlankPoll(), BLANK_POLL_INTERVAL_MS);
        }
        cancelBlankVerification() {
          if (this.blankShrinkVerifyTimer) {
            clearTimeout(this.blankShrinkVerifyTimer);
            this.blankShrinkVerifyTimer = null;
          }
          this.blankShrinkVerified = false;
        }
        setZOrderGuardEnabled(enabled) {
          if (!enabled) {
            this.stopZOrderGuard();
            return;
          }
          if (this.zOrderGuardTimer) return;
          this.zOrderGuardTimer = setInterval(() => this.ensureWidgetAboveTaskbar(), Z_ORDER_GUARD_INTERVAL_MS);
          this.ensureWidgetAboveTaskbar();
        }
        stopZOrderGuard() {
          if (this.zOrderGuardTimer) {
            clearInterval(this.zOrderGuardTimer);
            this.zOrderGuardTimer = null;
          }
        }
        getTaskbarHwnd(helper) {
          const taskbarHwnd = this.cachedTaskbarHwnd ?? helper.findTaskbar();
          if (taskbarHwnd) {
            this.cachedTaskbarHwnd = taskbarHwnd;
          }
          return taskbarHwnd;
        }
        ensureWidgetAboveTaskbar(win = this.getWidgetWindow(), options = {}) {
          const helper = this.helper;
          if (!helper || !win || win.isDestroyed() || !win.isVisible()) return;
          if (!options.noCheckDocked && !this.shouldMaintainDockedWidget()) return;
          const taskbarHwnd = this.getTaskbarHwnd(helper);
          if (!taskbarHwnd) return;
          helper.ensureAboveTaskbar(win.getNativeWindowHandle(), taskbarHwnd);
        }
        async pollBlanks() {
          const tracker = this.tracker;
          if (!tracker) return;
          const win = this.getWidgetWindow();
          if (!win) return;
          const taskbarInfo = tracker.getTaskbarInfo();
          if (taskbarInfo) {
            this.cachedTaskbarRect = taskbarInfo.rect;
          }
          const sf = taskbarInfo ? getScaleFactorForPhysicalRect(taskbarInfo.rect) : import_electron32.screen.getPrimaryDisplay().scaleFactor;
          const minWidthPhysical = Math.round((TASKBAR_WIDGET_WIDTH_DIP.nano + DOCKED_EDGE_MARGIN_DIP) * sf);
          const widgetHwnd = win.getNativeWindowHandle();
          const excludeHwnds = [widgetHwnd];
          const shadowWin = this.getShadowWindow();
          if (shadowWin) {
            excludeHwnds.push(shadowWin.getNativeWindowHandle());
          }
          const result = await tracker.findBlanks({
            minWidth: minWidthPhysical,
            excludeHwnds
          });
          if (this.tracker !== tracker) return;
          if (win.isDestroyed()) return;
          if (!result) return;
          if (result.taskbar.hwnd) {
            this.cachedTaskbarHwnd = result.taskbar.hwnd;
          }
          this.cachedTaskbarRect = result.taskbar.rect;
          if (!isTaskbarPositionSupported(result.taskbar.rect)) {
            this.taskbarSupportsDocking = false;
            this.cachedCandidates = [];
            this.candidateStableEdges.clear();
            this.cancelBlankVerification();
            const shadowWin2 = this.getShadowWindow();
            if (shadowWin2) {
              this.clearShadowPreview(shadowWin2);
            } else {
              this.setSnapStage(null);
            }
            if (!this.drag?.isDragging() && this.state.value.widgetState === "docked") {
              this.finishDragToFree();
              this.positionToFree(win, getUnsupportedTaskbarFallbackPosition(this.getNormalWidthDip()));
              this.syncDockedMaintenance();
            }
            return;
          }
          this.taskbarSupportsDocking = true;
          const candidates = result.candidates.map((candidate) => applyDockedMarginToCandidate(candidate, sf));
          this.cachedCandidates = this.stabilizeCandidates(candidates);
          if (!this.shouldMaintainDockedWidget()) return;
          if (!candidates.length) {
            await this.applyDockedPresentationTarget(win, null);
            return;
          }
          const dockedTarget = this.getPreferredDockedPresentationTarget(sf);
          if (!dockedTarget) {
            await this.applyDockedPresentationTarget(win, null);
            return;
          }
          this.setDockedStyle(dockedTarget.style);
          await this.applyDockedPresentationTarget(win, dockedTarget);
        }
        listenDisplayChanges() {
          this.stopListeningDisplayChanges();
          this.displayChangeHandler = () => this.onDisplayChanged();
          import_electron32.screen.on("display-metrics-changed", this.displayChangeHandler);
          import_electron32.screen.on("display-removed", this.displayChangeHandler);
        }
        stopListeningDisplayChanges() {
          if (this.displayChangeHandler) {
            import_electron32.screen.removeListener("display-metrics-changed", this.displayChangeHandler);
            import_electron32.screen.removeListener("display-removed", this.displayChangeHandler);
            this.displayChangeHandler = null;
          }
        }
        onDisplayChanged() {
          if (this.drag?.isDragging()) return;
          const win = this.getWidgetWindow();
          if (!win) return;
          if (this.state.value.widgetState === "docked") {
            win.setBounds(win.getBounds());
            this.requestBlankPoll();
            return;
          }
          this.positionToFree(win);
          const bounds = win.getBounds();
          const displays = import_electron32.screen.getAllDisplays();
          const isVisible = displays.some((d2) => {
            const wa = d2.workArea;
            const overlapX = Math.max(
              0,
              Math.min(bounds.x + bounds.width, wa.x + wa.width) - Math.max(bounds.x, wa.x)
            );
            const overlapY = Math.max(
              0,
              Math.min(bounds.y + bounds.height, wa.y + wa.height) - Math.max(bounds.y, wa.y)
            );
            return overlapX > MIN_VISIBLE_OVERLAP_DIP && overlapY > MIN_VISIBLE_OVERLAP_DIP;
          });
          if (isVisible) return;
          win.setBounds(clampBoundsToNearestDisplay(bounds));
        }
        positionToDocked(win, candidate, style, options = {}) {
          if (win.isDestroyed()) return;
          const physical = getDockedRect(candidate, style, this.getNormalWidthDip());
          const dipRect = import_electron32.screen.screenToDipRect(null, physical);
          if (!options.respectEdgeThreshold || shouldRepositionDockedWindow(this.helper, win, candidate, physical, dipRect)) {
            win.setBounds(dipRect);
          }
          if (!win.isVisible()) {
            win.showInactive();
          }
        }
        async setAutoStart(autoStart) {
          this.state.update((state) => {
            state.autoStart = autoStart;
          });
        }
      }

class TaskbarWidgetServiceProtocol extends ServiceProtocol {
        async setEnabled(enabled, options = {}) {
          await this.service.setEnabled(enabled, options);
        }
        async setAutoStart(autoStart) {
          await this.service.setAutoStart(autoStart);
        }
        async getReportContext() {
          return this.service.getReportContext();
        }
        async getPlaySourceParams() {
          return this.service.getPlaySourceParams();
        }
      }

export {
  SUPPORTS_TASKBAR_WIDGET,
  TaskbarWidgetService,
  TaskbarWidgetServiceProtocol
};
