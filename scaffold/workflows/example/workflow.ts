import { Workflow } from "@incode/cli";

export const workflow: Workflow = {
  name: "Example Workflow",
  description: "A sample workflow to get you started",
  nodes: [
    {
      id: "start",
      type: "n8n-nodes-base.start",
      position: [240, 300],
      parameters: {},
    },
    {
      id: "httpRequest",
      type: "n8n-nodes-base.httpRequest",
      position: [460, 300],
      parameters: {
        url: "https://api.github.com/users/octocat",
        method: "GET",
      },
    },
  ],
  connections: {
    start: {
      main: [
        [
          {
            node: "httpRequest",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
  },
};

export default workflow;
