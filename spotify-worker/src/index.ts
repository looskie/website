import { router } from "./router";
import { v1Router } from "./v1";

const app = router.merge("/v1", v1Router);
const handler = app.serve();

export default {
  async fetch(
    request: Request,
    _env: Env,
    _ctx: ExecutionContext,
  ): Promise<Response> {
    return handler(request);
  },
} satisfies ExportedHandler<Env>;

export type API = typeof app;
