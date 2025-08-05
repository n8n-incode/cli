# inCode Project

This is an inCode project for managing n8n workflows as code.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Authenticate with your n8n instance:
   ```bash
   incode login
   ```

3. Start developing your workflows by editing files in the `workflows/` directory.

## Project Structure

```
.
├── workflows/          # Your workflow definitions
│   └── example/        # Example workflows
├── .incode/           # inCode configuration
├── package.json       # Project dependencies
├── tsconfig.json      # TypeScript configuration
└── .gitignore         # Git ignore rules
```

## Available Commands

- `incode login` - Authenticate with n8n
- `incode init` - Initialize a new project
- `incode test` - Test your workflows

## Next Steps

1. Edit the sample workflow in `workflows/example/workflow.ts`
2. Create new workflows in the `workflows/` directory
3. Use `incode test` to validate your workflows
4. Deploy your workflows to your n8n instance

For more information, visit the [inCode documentation](https://github.com/n8n-incode/incode-cli). 