declare module "electron" {
  export interface App {
    isReady(): boolean;
    whenReady(): Promise<void>;
    getPath(name: string): string;
    getAppPath(): string;
    requestSingleInstanceLock(): boolean;
    setAsDefaultProtocolClient(protocol: string): boolean;
    setAppUserModelId(id: string): void;
    setTTConfig(config: { userUniqueId: string; enableAppLaunchLog: boolean }): void;
    relaunch(): void;
    exit(exitCode?: number): void;
    quit(): void;
    focus(): void;
    show(): void;
    on(event: string, listener: (...args: any[]) => void): this;
    commandLine: {
      appendSwitch(theSwitch: string, value?: string): void;
      hasSwitch(theSwitch: string): boolean;
    };
  }

  export const app: App;
  export const session: any;
  export const protocol: any;
  export const dialog: any;
  export const shell: any;
  export const BrowserWindow: any;
  export const Menu: any;
  export const Tray: any;
  export const Notification: any;
  export const clipboard: any;
  export const globalShortcut: any;
  export const ipcMain: any;
  export const ipcRenderer: any;
  export const nativeImage: any;
  export const nativeTheme: any;
  export const net: any;
  export const powerMonitor: any;
  export const screen: any;
  export const autoUpdater: any;

  export const TTChromiumNetwork: {
    startHttpDns(options: {
      host: string;
      blockList: string;
      allowList: string;
      fallbackList: string;
    }): void;
  };

  export const TTMetrics: {
    setPreferences(prefs: { enable_auto_report: boolean }): void;
  };

  export const parfait: {
    init(options: Record<string, unknown>): void;
    writeAlog(level: number, tag: string, message: string): Promise<void>;
  };

  export const ttCrashReporter: {
    init(options: Record<string, unknown>): void;
  };

  export const perfMonitor: {
    setCpuMonitor(opts: { enable: boolean }): void;
    setFpsMonitor(opts: { enable: boolean }): void;
    setMemoryMonitor(opts: { enable: boolean; enableChromiumMemory?: boolean }): void;
    setGpuMonitor(opts: { enable: boolean }): void;
    setSampleInterval(seconds: number): void;
    setHangMonitor(opts: Record<string, unknown>): void;
    trackStartup(stage: string): void;
  };

  export const ttnet: {
    init(options: Record<string, unknown>): void;
    startWithParams(options: Record<string, unknown>): void;
    triggerGetDomain(params: Record<string, unknown>, force?: boolean): void;
  };

  const electronDefault: {
    app: App;
    session: any;
    protocol: any;
    dialog: any;
    shell: any;
    BrowserWindow: any;
    Menu: any;
    Tray: any;
    Notification: any;
    clipboard: any;
    globalShortcut: any;
    ipcMain: any;
    ipcRenderer: any;
    nativeImage: any;
    nativeTheme: any;
    net: any;
    powerMonitor: any;
    screen: any;
    autoUpdater: any;
    TTChromiumNetwork: typeof TTChromiumNetwork;
    TTMetrics: typeof TTMetrics;
    parfait: typeof parfait;
    ttCrashReporter: typeof ttCrashReporter;
    perfMonitor: typeof perfMonitor;
    ttnet: typeof ttnet;
  };

  export default electronDefault;
}

declare global {
  const TTCommon: {
    executeWithElement(element: HTMLMediaElement, command: string, payloadJson: string): void;
  };
}
