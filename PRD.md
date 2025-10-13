# Markdown to PDF Converter

A clean, professional tool for converting markdown text to properly formatted PDF documents with real-time preview and customizable styling.

**Experience Qualities**:
1. **Efficient** - Quick conversion with instant preview updates as you type
2. **Professional** - Clean, document-focused interface that feels like a serious publishing tool
3. **Reliable** - Consistent PDF output that preserves markdown formatting perfectly

**Complexity Level**: Light Application (multiple features with basic state)
- Handles markdown parsing, PDF generation, and preview functionality with persistent user preferences

## Essential Features

**Markdown Input Editor**
- Functionality: Live markdown editor with syntax highlighting and line numbers
- Purpose: Allows users to write or paste markdown content with visual feedback
- Trigger: User clicks in the editor area or pastes content
- Progression: Focus editor → Type/paste markdown → See live preview update → Export to PDF
- Success criteria: Real-time preview updates, syntax highlighting works, large documents handle smoothly

**Live Preview**
- Functionality: Real-time rendered HTML preview of markdown content
- Purpose: Shows exactly how the final PDF will look before conversion
- Trigger: Any change in the markdown editor
- Progression: Edit markdown → Preview updates automatically → Visual feedback matches final PDF
- Success criteria: Preview matches PDF output, updates within 100ms of typing, handles all common markdown elements

**PDF Export**
- Functionality: Convert markdown to downloadable PDF with proper formatting
- Purpose: Generate professional documents from markdown source
- Trigger: User clicks "Export PDF" button
- Progression: Click export → Processing indicator → PDF downloads automatically
- Success criteria: PDF preserves formatting, fonts, spacing, and all markdown elements correctly

**Sample Content**
- Functionality: Pre-loaded example markdown content to demonstrate capabilities
- Purpose: Shows users what's possible and provides starting point
- Trigger: App loads or user clicks "Load Sample"
- Progression: Load app → Sample content appears → User can edit or replace
- Success criteria: Comprehensive example showing headers, lists, code blocks, tables, etc.

## Edge Case Handling

- **Large Documents**: Progress indicator for documents over 50KB, chunked processing
- **Invalid Markdown**: Graceful handling of malformed syntax without breaking preview
- **Empty Input**: Show helpful placeholder text and sample content option
- **Export Errors**: Clear error messages with retry option if PDF generation fails
- **Browser Compatibility**: Fallback messaging for unsupported browsers

## Design Direction

The design should feel professional and document-focused, like a modern publishing tool that developers and writers would trust for important documents - clean, minimal interface that keeps content front and center.

## Color Selection

Analogous color scheme using cool blues and grays to create a professional, document-focused environment that feels calm and trustworthy.

- **Primary Color**: Deep Blue (#1e40af) - Communicates professionalism and trust for the main export action
- **Secondary Colors**: Light Gray (#f8fafc) for editor background, Medium Gray (#64748b) for UI elements
- **Accent Color**: Bright Blue (#3b82f6) for active states and highlighting important actions
- **Foreground/Background Pairings**: 
  - Background (Light Gray #f8fafc): Dark Gray text (#1e293b) - Ratio 12.6:1 ✓
  - Card (White #ffffff): Dark Gray text (#1e293b) - Ratio 15.8:1 ✓
  - Primary (Deep Blue #1e40af): White text (#ffffff) - Ratio 8.9:1 ✓
  - Accent (Bright Blue #3b82f6): White text (#ffffff) - Ratio 5.1:1 ✓

## Font Selection

Use Inter for clean, highly legible interface text and JetBrains Mono for code elements to create a modern, developer-friendly aesthetic that's professional yet approachable.

- **Typographic Hierarchy**:
  - H1 (App Title): Inter Bold/24px/tight letter spacing
  - H2 (Section Headers): Inter SemiBold/18px/normal spacing
  - Body Text: Inter Regular/14px/relaxed line height
  - Code/Markdown: JetBrains Mono Regular/14px/normal spacing
  - Button Text: Inter Medium/14px/normal spacing

## Animations

Subtle, functional animations that enhance usability without distraction - smooth transitions for state changes and gentle feedback for user actions that feel responsive and professional.

- **Purposeful Meaning**: Quick fade-ins for preview updates, smooth button hover states, gentle loading indicators
- **Hierarchy of Movement**: Export button gets subtle scale on hover, preview scrolls smoothly, editor focus has gentle highlight transition

## Component Selection

- **Components**: 
  - Card for main layout sections (editor, preview)
  - Button for export action with loading state
  - Textarea for markdown input with monospace styling
  - Separator for visual division between panels
  - Badge for status indicators
  - Progress for export processing
  
- **Customizations**: 
  - Custom markdown editor with syntax highlighting using a lightweight highlighting library
  - Split-pane layout for editor/preview with resizable divider
  - Custom PDF preview component

- **States**: 
  - Export button: default (blue), hover (darker blue), loading (with spinner), disabled (gray)
  - Editor: focused (subtle blue border), typing (no visual change), error (red border hint)
  
- **Icon Selection**: 
  - Download icon for PDF export
  - FileText for sample content
  - Eye for preview toggle
  - Code for markdown editor

- **Spacing**: Consistent 4-unit (1rem) padding for cards, 2-unit (0.5rem) for button padding, 6-unit (1.5rem) margins between sections

- **Mobile**: Stack editor above preview vertically, full-width cards, larger touch targets for buttons, collapsible preview section