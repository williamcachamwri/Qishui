// src/services/sharedState/sharedState.ts
// @ts-nocheck
import { State } from "../../base/state/state";
import { Service, ServiceProtocol } from "../base";
import { initialSharedState } from "./initialState";

class SharedStateService extends Service {
        state = Object.fromEntries(
          Object.entries(initialSharedState).map(([key, value]) => {
            return [key, new State(value)];
          })
        );
      }

class SharedStateServiceProtocol extends ServiceProtocol {
        async onUpdate(key, callback, immediate = false) {
          if (immediate) {
            callback(this.service.state[key].value, this.service.state[key].value);
          }
          this.service.state[key].onUpdate((value, oldValue) => {
            callback(value, oldValue);
          });
        }
        async update(key, value) {
          this.service.state[key].update(() => value);
        }
        async updateDebug(key, value) {
          this.service.state.debug.update((oldState) => ({
            ...oldState,
            [key]: value
          }));
        }
        async get(key) {
          return this.service.state[key].value;
        }
      }

export {
  SharedStateService,
  SharedStateServiceProtocol
};
