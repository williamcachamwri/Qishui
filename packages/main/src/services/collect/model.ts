// src/services/collect/model.ts
// @ts-nocheck

function getCollectTimestamp() {
    return Date.now() / 1e3;
  }

function collectValuesEqual(left, right) {
    if (!left && !right) {
      return true;
    }
    if (!left || !right) {
      return false;
    }
    return left.isCollected === right.isCollected && left.customStatus === right.customStatus;
  }

function collectOverrideReleaseEqual(left, right) {
    if (!left && !right) {
      return true;
    }
    if (!left || !right) {
      return false;
    }
    if (left.type !== right.type) {
      return false;
    }
    if (left.type === "until" && right.type === "until") {
      return left.expiresAt === right.expiresAt;
    }
    return true;
  }

function collectEntriesEqual(left, right) {
    if (!left && !right) {
      return true;
    }
    if (!left || !right) {
      return false;
    }
    return left.server?.observedAt === right.server?.observedAt && left.server?.source === right.server?.source && collectValuesEqual(left.server?.value, right.server?.value) && left.override?.mutationId === right.override?.mutationId && left.override?.phase === right.override?.phase && left.override?.startedAt === right.override?.startedAt && left.override?.reason === right.override?.reason && collectOverrideReleaseEqual(left.override?.release, right.override?.release) && collectValuesEqual(left.override?.value, right.override?.value);
  }

function getActiveCollectOverride(override, now = getCollectTimestamp()) {
    if (!override) {
      return void 0;
    }
    if (override.release.type === "until" && override.release.expiresAt <= now) {
      return void 0;
    }
    return override;
  }

function normalizeCollectEntry(entry, now = getCollectTimestamp()) {
    if (!entry) {
      return void 0;
    }
    const normalized = {
      server: entry.server,
      override: getActiveCollectOverride(entry.override, now)
    };
    if (!normalized.server && !normalized.override) {
      return void 0;
    }
    return normalized;
  }

function getEffectiveCollectValue(entry, now = getCollectTimestamp()) {
    const normalized = normalizeCollectEntry(entry, now);
    return normalized?.override?.value ?? normalized?.server?.value;
  }

function isCollectPending(entry, now = getCollectTimestamp()) {
    return normalizeCollectEntry(entry, now)?.override?.phase === "inflight";
  }

function createSnapshotValue(snapshot) {
    return {
      isCollected: snapshot.value.isCollected,
      customStatus: snapshot.value.customStatus
    };
  }

function applyServerSnapshotToEntry(entry, snapshot, now = getCollectTimestamp()) {
    const normalized = normalizeCollectEntry(entry, now);
    const currentServer = normalized?.server;
    if (currentServer && snapshot.observedAt <= currentServer.observedAt) {
      return normalized;
    }
    const next = {
      ...normalized,
      server: {
        ...snapshot,
        value: createSnapshotValue(snapshot)
      }
    };
    if (next.override && next.override.phase === "acked" && next.override.release.type === "onSnapshotMatch" && collectValuesEqual(next.override.value, snapshot.value)) {
      next.override = void 0;
    }
    return normalizeCollectEntry(next, now);
  }

function startCollectMutationEntry(entry, mutationId, value, startedAt) {
    return normalizeCollectEntry({
      ...normalizeCollectEntry(entry, startedAt),
      override: {
        mutationId,
        value,
        phase: "inflight",
        startedAt,
        release: { type: "onSnapshotMatch" },
        reason: "mutation"
      }
    }, startedAt);
  }

function ackCollectMutationEntry(entry, mutationId, value, now = getCollectTimestamp()) {
    const normalized = normalizeCollectEntry(entry, now);
    if (normalized?.override?.mutationId !== mutationId) {
      return normalized;
    }
    const next = {
      ...normalized,
      override: {
        ...normalized.override,
        value,
        phase: "acked"
      }
    };
    const nextOverride = next.override;
    if (next.server && nextOverride && nextOverride.release.type === "onSnapshotMatch" && collectValuesEqual(next.server.value, nextOverride.value)) {
      next.override = void 0;
    }
    return normalizeCollectEntry(next, now);
  }

function ackSilenceCollectMutationEntry(entry, mutationId, value, expiresAt, now = getCollectTimestamp()) {
    const normalized = normalizeCollectEntry(entry, now);
    if (normalized?.override?.mutationId !== mutationId) {
      return normalized;
    }
    return normalizeCollectEntry({
      ...normalized,
      override: {
        ...normalized.override,
        value,
        phase: "acked",
        release: {
          type: "until",
          expiresAt
        },
        reason: "silence"
      }
    }, now);
  }

function failCollectMutationEntry(entry, mutationId, now = getCollectTimestamp()) {
    const normalized = normalizeCollectEntry(entry, now);
    if (normalized?.override?.mutationId !== mutationId) {
      return normalized;
    }
    return normalizeCollectEntry({
      ...normalized,
      override: void 0
    }, now);
  }

export {
  isCollectPending,
  getCollectTimestamp,
  normalizeCollectEntry,
  getEffectiveCollectValue,
  collectEntriesEqual,
  startCollectMutationEntry,
  ackCollectMutationEntry,
  ackSilenceCollectMutationEntry,
  failCollectMutationEntry,
  applyServerSnapshotToEntry
};
