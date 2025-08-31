# 🚀 Onshape App Extension for Leo AI Integration

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Onshape](https://img.shields.io/badge/Onshape-0078D4?style=for-the-badge&logo=microsoft&logoColor=white)](https://www.onshape.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

> **Integrate Leo AI React application into Onshape as a right sidebar extension with bidirectional command interactions**

## 📋 Table of Contents

- [Overview](#overview)
- [🎯 Project Requirements](#-project-requirements)
- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🚀 Quick Start](#-quick-start)
- [🔧 Installation](#-installation)
- [⚙️ Configuration](#️-configuration)
- [📚 API Reference](#-api-reference)
- [🧪 Testing](#-testing)
- [📦 Deployment](#-deployment)
- [📄 License](#-license)

## Overview

This project develops an **Onshape App Extension** that integrates your existing **Leo AI React application** (written in TypeScript) directly into Onshape's CAD environment. The extension embeds Leo AI in the right sidebar panel and enables command-level interactions between Leo and Onshape.

### 🔗 **Integration Points**

- **Leo AI React App** → Embedded in Onshape right sidebar
- **Onshape Session Data** → Accessible to Leo AI for context
- **Bidirectional Commands** → File operations and search functionality

## 🎯 Project Requirements

### **Task 1: Embed Leo AI as Onshape App Extension**

- ✅ Integrate Leo AI into Onshape UI inside extension panel
- ✅ Launch from right sidebar
- ✅ Embed Leo interface within Onshape side panel
- ✅ Enable data exchange with active Onshape session
- ✅ Ensure cross-browser and responsive compatibility

### **Task 2: Command-Level Interactions**

#### **From Leo to Onshape:**
- **"Open file in Onshape"** command
- Opens specific file (part/assembly) in current Onshape session
- If assembly session: automatically inserts parts at fixed location (parameter-driven)

#### **From Onshape to Leo:**
- **"Search parts using assembly/measurements"** command
- Sends assembly data (assembly tree) to Leo AI
- Sends measurements (specific face) to Leo AI
- **Two separate APIs** for assembly data and measurements

### **Technical Constraints**
- APIs follow current SolidWorks add-in implementation pattern
- Use provided GUID for unique identification
- Adapt SolidWorks methods to work with Onshape APIs

## ✨ Features

### 🔌 **Core Integration**
- **Right Sidebar Extension**: Leo AI embedded as responsive panel
- **Session Context**: Access to active Onshape document, workspace, and element data
- **Cross-Platform**: Compatible with supported browsers and screen sizes

### 🔄 **Bidirectional Commands**
- **File Operations**: Open and insert files from Leo to Onshape
- **Search Integration**: Send assembly data and measurements from Onshape to Leo
- **Parameter Passing**: Location coordinates and measurement data exchange

### 🛡️ **Security & Compatibility**
- **OAuth Integration**: Secure authentication with Onshape
- **Origin Validation**: Safe cross-origin communication
- **Responsive Design**: Works across different screen sizes

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Onshape      │    │   Leo AI         │    │   Extension     │
│   CAD Platform  │◄──►│   React App      │◄──►│   Bridge        │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Session      │    │   TypeScript     │    │   PostMessage   │
│   Context      │    │   Components     │    │   + REST APIs   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### **Technology Stack**
- **Frontend**: React + TypeScript (existing Leo AI app)
- **Integration**: Onshape App Extensions API
- **Communication**: PostMessage API + REST endpoints
- **Authentication**: OAuth 2.0 with Onshape

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+
- Onshape Developer Account
- Existing Leo AI React application
- Modern web browser

### **1. Clone Repository**
```bash
git clone https://github.com/your-username/onshape-leo-extension.git
cd onshape-leo-extension
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Configure Environment**
```bash
cp .env.example .env
# Add your Onshape OAuth credentials and Leo AI configuration
```

### **4. Start Development**
```bash
npm run dev
```

## 🔧 Installation

### **Step 1: Onshape Developer Portal**
1. Navigate to [Onshape Developer Portal](https://dev-portal.onshape.com/)
2. Create OAuth application with scopes: `document.read`, `assembly.read`
3. Add redirect URI for authentication

### **Step 2: Extension Registration**
1. Create new extension type "Element Right Panel"
2. Configure manifest with Leo AI app URL:

```json
{
  "type": "elementRightPanel",
  "context": "Assembly",
  "actionUrl": "https://your-leo-app.com?documentId=${documentId}&workspaceId=${workspaceOrVersionId}&elementId=${elementId}",
  "icon": "leo-icon.png",
  "label": "Leo AI Integration"
}
```

### **Step 3: Deploy**
1. Build: `npm run build`
2. Deploy Leo AI app to hosting service
3. Update Onshape extension with production URL

## ⚙️ Configuration

### **Environment Variables**
```bash
# Onshape OAuth
ONSHAPE_CLIENT_ID=your_client_id
ONSHAPE_CLIENT_SECRET=your_client_secret
ONSHAPE_REDIRECT_URI=https://your-domain.com/auth/callback

# Leo AI Configuration
LEO_AI_API_KEY=your_api_key
LEO_AI_BASE_URL=https://api.leo-ai.com

# Extension Settings
APP_URL=https://your-domain.com
```

### **Extension Context**
The extension automatically provides:
- **Document ID**: Active Onshape document
- **Workspace ID**: Current workspace/version
- **Element ID**: Selected part or assembly

## 📚 API Reference

### **Onshape API Endpoints**

#### **Session Context**
```typescript
// Get current document info
GET /api/documents/{did}

// Get assembly tree
GET /api/assemblies/{did}/w/{wid}/e/{eid}/tree

// Get part geometry/measurements
GET /api/partstudios/{did}/w/{wid}/e/{eid}/geometry
```

### **Leo AI Integration APIs**

#### **Assembly Data Search**
```typescript
POST /api/search-assembly
// Send assembly tree data to Leo AI
```

#### **Measurements Search**
```typescript
POST /api/search-measurements
// Send face measurements to Leo AI
```

### **Command Communication**

#### **Open File Command (Leo → Onshape)**
```typescript
// Trigger file opening from Leo
window.parent.postMessage({
  type: 'OPEN_FILE',
  payload: {
    fileId: 'document_id',
    location: { x: 0, y: 0, z: 0 } // For assembly insertion
  }
}, 'https://cad.onshape.com');
```

#### **Search Command (Onshape → Leo)**
```typescript
// Listen for Onshape search requests
window.addEventListener('message', (event) => {
  if (event.origin === 'https://cad.onshape.com') {
    const { type, payload } = event.data;
    
    if (type === 'SEARCH_PARTS') {
      // Send to Leo AI APIs
      sendToLeoAI(payload);
    }
  }
});
```

## 🧪 Testing

### **Testing Checklist**
- [ ] Extension loads in Onshape right sidebar
- [ ] Leo AI interface renders correctly
- [ ] Session context parameters are received
- [ ] "Open File" command works (Leo → Onshape)
- [ ] "Search Parts" command works (Onshape → Leo)
- [ ] Cross-browser compatibility verified
- [ ] Responsive design on different screen sizes

### **Test Commands**
```bash
# Unit tests
npm run test

# Build for testing
npm run build

# Local development
npm run dev
```

## 📦 Deployment

### **Build & Deploy**
```bash
# Production build
npm run build

# Deploy to hosting service
npm run deploy
```

### **Production Setup**
1. Deploy Leo AI app to hosting service
2. Update Onshape extension with production URL
3. Test extension in Onshape production environment
4. Monitor for any integration issues

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p><strong>Onshape + Leo AI Integration</strong></p>
  <p>Seamless CAD and AI workflow integration</p>
</div>
