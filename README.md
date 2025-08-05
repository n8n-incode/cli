# inCode CLI

A command-line interface for applying changes from your inCode workflows to your n8n instance. The inCode CLI lets you easily sync, update, and manage workflows on your n8n instance, streamlining the deployment process.

## Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Access to an n8n instance with API access

### Global Installation

```bash
npm install -g @n8n-incode/cli
```

## Quick Start

### 1. Initialize a New Project

```bash
# Create a new directory for your project
mkdir my-n8n-workflows
cd my-n8n-workflows

# Initialize the inCode project
incode init
```

This creates a new project with the following structure:
```
my-n8n-workflows/
├── workflows/          # Your workflow definitions
│   └── example/        # Example workflow
├── .incode/           # inCode configuration
├── package.json       # Project dependencies
├── tsconfig.json      # TypeScript configuration
└── .gitignore         # Git ignore rules
```

### 2. Authenticate with n8n

```bash
incode login
```

You'll be prompted to enter:
- Your n8n instance URL (e.g., `https://n8n.example.com`)
- Your n8n API access token (found in Settings → n8n API → Create API Key)

### 3. Create Your First Workflow

Edit the example workflow at `workflows/example/workflow.ts`:

This command will:
- Fetch all workflows from your n8n instance
- Display workflow information including names, IDs, and status
- Validate your local workflow definitions

## Usage

### Available Commands

| Command | Description |
|---------|-------------|
| `incode init` | Initialize a new inCode project in the current directory |
| `incode login` | Authenticate with your n8n instance |
| `incode pull` | Sync workflows from your n8n instance to local state |

### Command Options

#### `incode init`
- `-f, --force`: Force initialization even if directory is not empty

#### `incode login`
- Interactive guide to setup API access to your n8n instance
- Automatically saves credentials to `.incode/config.json`

#### `incode pull`
- Syncs workflows from your n8n instance to local state
- Requires authentication (run `incode login` first)

---

## Development

### Development Setup

1. **Clone and Install**:
   ```bash
   git clone https://github.com/n8n-incode/cli
   cd incode-cli
   npm install
   ```

2. **Build the Project**:
   ```bash
   npm run build # build only
   npm run build-link # build and link for local development
   ```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Compile TypeScript and copy scaffold files |
| `npm run dev` | Watch mode for TypeScript compilation |
| `npm run build-link` | Build and create global link for testing |
| `npm run copy-scaffold` | Copy scaffold files to dist directory |

## License

This project is licensed under the MIT License.

## Support

- **Issues**: [GitHub Issues](https://github.com/n8n-incode/cli/issues)
- **Documentation**: [GitHub Wiki](https://github.com/n8n-incode/cli/wiki)
- **Discussions**: [GitHub Discussions](https://github.com/n8n-incode/cli/discussions)
