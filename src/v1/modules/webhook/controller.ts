import { FastifyReply, FastifyRequest } from "fastify";
import { Convoy } from "convoy.js";
import { generateReference } from "@shared/utils/generation.utils";
import httpStatus from "http-status";
import { SuccessResponse } from "@shared/utils/response.util";

const convoy = new Convoy({
  api_key:
    "CO.NflD0wgMnCFO89fF.l0zgD48966PewuJ83JeIBNwr59wwkdC4qimBbVmoVd5FtxQwzqw6VM9p0PwgLmbo",
  uri: "http://localhost:5005/api/v1",
  project_id: "01J3Z36MTFG8X9WKHMM93S0VY6",
});

export default class WebhookController {
  constructor() {}

  sendWebhook = async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const eventData = {
        // custom_headers?: object;
        idempotency_key: generateReference(),
        // endpoint_id: "01J41RR7JQK0FWEE3MT450Z5DF",
        owner_id: "jeph1234",
        event_type: "payment.failed",
        data: {
          status: "Completed",
          description: "Transaction Successful",
          userID: "test_user_id808",
        },
      };

      const response = await convoy.events.createFanOutEvent(eventData);
      return res
        .status(httpStatus.OK)
        .send(SuccessResponse("event created successfully", response));
    } catch (error: any) {
      console.error("Error sending webhook event:", error);
      res.status(500).send({
        status: false,
        error: error.message || "An error occurred",
      });
    }
  };

  receiveSuccessWebhook = async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const body = req.body;
      console.log("Received webhook data:", body);
      return res.status(200).send({
        status: true,
        message: "Success webhook received successfully",
      });
    } catch (error) {
      console.error("Error processing webhook:", error);
      return res.status(500).send({
        status: false,
        message: "Failed to process webhook",
      });
    }
  };

  receiveFailedWebhook = async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const body = req.body;
      console.log("Received webhook data:", body);
      return res.status(200).send({
        status: true,
        message: "Failed webhook received successfully",
      });
    } catch (error) {
      console.error("Error processing webhook:", error);
      return res.status(500).send({
        status: false,
        message: "Failed to process webhook",
      });
    }
  };

  createSubscription = async (
    req: FastifyRequest<{ Body: { endpoint_id: string } }>,
    res: FastifyReply
  ) => {
    try {
      try {
        const subscriptionData = {
          name: "event-sub",
          endpoint_id: req.body.endpoint_id,
          type: subscriptionEnum.API,
        };

        // name: string;
        // type: 'cli' | 'api';
        // app_id?: string;
        // source_id?: string;
        // endpoint_id: string;
        // group_id?: string;
        // alert_config?: {
        //     threshold: string;
        //     count: number;
        // };
        // retry_config?: {
        //     type: string;
        //     retry_count: number;
        //     duration: string;
        // };
        // filter_config?: {
        //     event_types: any[];
        // };

        const response = await convoy.subscriptions.create(subscriptionData);

        return res
          .status(httpStatus.OK)
          .send(
            SuccessResponse("Subscription created successfully", response.data)
          );
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      throw error;
    }
  };

  createEndpoint = async (
    req: FastifyRequest<{ Body: { endpoint_id: string } }>,
    res: FastifyReply
  ) => {
    try {
      const endpointData = {
        owner_id: "jeph1234",
        advanced_signatures: false,
        name: "test-endpoint-success-true",
        support_email: "jsnr300@gmail.com",
        url: "https://a094-154-66-135-97.ngrok-free.app/api/v1/webhook/recieve/failed",
        description: "failed endpoint for",
        secret: "endpoint-secret",
        events: ["payment.failed"],
      };

      const response = await convoy.endpoints.create(endpointData);

      return res
        .status(httpStatus.OK)
        .send(SuccessResponse("Endpoint created successfully", response));
    } catch (error) {
      console.log(error);
    }
  };
}
