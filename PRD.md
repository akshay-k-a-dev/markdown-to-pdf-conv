# Markdown to PDF Converter

A clean, professional tool for converting markdown text to properly formatted PDF documents with real-time preview and customizable styling.


1. **Efficient** - Quick conversion with instant preview updates as you type
2. **Professional** - Clean, document-focused interface that feels like a serious publishing tool
3. **Reliable** - Consistent PDF output that preserves markdown formatting perfectly

**Complexity Level**: Light Application (multiple features with basic state)
- Handles markdown parsing, PDF generation, and preview functionality with persistent user preferences

- Trigger: Any change

**PDF Export**
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

Analogous colo
- Functionality: Convert markdown to downloadable PDF with proper formatting
- **Accent Color**: Bright Blue (#3b82f6) for active states and
- Trigger: User clicks "Export PDF" button
- Progression: Click export → Processing indicator → PDF downloads automatically
- Success criteria: PDF preserves formatting, fonts, spacing, and all markdown elements correctly

**Sample Content**
  - H1 (App Title): Inter Bold/24px/tight letter spacing
  - Body Text: Inter Regular/14px/relaxed line height
  - Button Text: Inter Medium/14px/normal spacing
## Animations
Subtle, functional animations that enhance usability without distraction - smooth transitio



  - Card for main layout sections (editor, preview)
  - Textarea for markdown input with monospace styling
  - Badge for status indicators
  
  - Custom markdown editor with syntax highlighting using a lightweight 

- **States**: 

- **Icon Selection**: 

  - Code for markd

- **Mobile**: Stack editor above preview vertically, full-width cards, larger touch targets for buttons, collapsible preview section















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