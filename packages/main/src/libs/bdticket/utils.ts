// src/libs/bdticket/utils.ts
// @ts-nocheck
import { logger } from "../../utils/logger";
import { protocolOf } from "../../services/index";
import "../../services/serviceId";

let getClientCert: any = async (data, callback) => {
        const form = data && Object.keys(data).length > 0 ? data : { server_data: "1" };
        const resp = await protocolOf("request" /* request */).requestHttp({
          method: "POST",
          url: "https://api.qishui.com/passport/ticket_guard/get_client_cert/",
          query: {
            aid: String(386088),
            is_from_ttaccountsdk: "1"
          },
          form,
          responseType: "json",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          withTTCommonParams: true
        });
        if (resp.status !== 200) {
          callback?.({ data: {} }, "", {
            httpStatusCode: resp.status,
            message: `get_client_cert failed with status: ${resp.status}`
          });
          logger.warn("bdticket", (b2) => b2.text("get_client_cert failed").object(resp));
          return;
        }
        callback?.(
          { data: resp.data },
          resp.headers["x-tt-logid"],
          {
            httpStatusCode: 0,
            message: ""
          }
        );
        logger.info("bdticket", (b2) => b2.text("get_client_cert success"));
      };

export {
  getClientCert
};
