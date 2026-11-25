// src/libs/bdticket/config.ts
// @ts-nocheck

let DEFAULT_SETTINGS: any = {
        session_guard_config: {
          enable: true,
          // 必须，PC端登录态是否开启加签的开关
          ree_path: [
            // 必须 需要零信任加签的列表，不同业务加签接口不一致，需与安全侧对齐
            "/luna/pc/me/collection/media",
            "/luna/pc/user/me/privacy/setting",
            "/luna/pc/me/collection/playlist",
            "/luna/pc/me/collection/album",
            "/luna/pc/me/follow",
            "/luna/pc/me/collection/artist",
            "/webcast/room/create/",
            "/web/api/media/user/info/",
            "/passport/token/beat/web/"
          ],
          ree_path_prefix: [
            // 可选，需要加签列表的前缀，测试期间可用/来压测，对全部接口加签
          ],
          ree_exclude_path: [
            // 可选，需要排除加签的列表
          ],
          ree_exclude_path_prefix: [
            // 可选，需要排除前缀加签的列表
          ],
          ree_enable_symmetric: true,
          // 必选, 是否启用对称加签，推荐打开
          config_version: "20250908.1"
          // 可选，建议使用配置发布的日志，方便排查问题
        },
        enable_full_path_track: true
        // 可选, 是否开启单用户的全链路埋点
      };

export {
  DEFAULT_SETTINGS
};
