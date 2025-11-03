import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Download, FileText, Eye, Code, UploadSimple } from '@phosphor-icons/react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const SAMPLE_MARKDOWN = `# Markdown to PDF Converter

This is a **powerful** tool for converting markdown to PDF with *proper formatting*.

## Features

- ✅ Real-time preview
- ✅ Syntax highlighting
- ✅ Professional PDF output
- ✅ GitHub Flavored Markdown support

### Code Example

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));
\`\`\`

### Table Example

| Feature | Status | Priority |
|---------|--------|----------|
| Markdown Parsing | ✅ Complete | High |
| PDF Export | ✅ Complete | High |
| Styling | ✅ Complete | Medium |

### Lists

1. **Ordered lists** work perfectly
2. With proper numbering
3. And nested items:
   - Bullet points
   - With sub-items
   - And more nesting

> **Note**: This is a blockquote example showing how special formatting is preserved in the PDF output.

---

## Mathematical Expressions

While basic markdown doesn't support math, you can include inline code like \`x = y + z\` or code blocks for mathematical expressions.

## Links and Images

Visit [GitHub](https://github.com) for more markdown examples.

---

*Happy writing!* 📝`

function App() {
  const [markdown, setMarkdown] = useKV('markdown-content', SAMPLE_MARKDOWN)
  const [isExporting, setIsExporting] = useState(false)
  const [showPreview, setShowPreview] = useState(true)

  const MAX_CHAR_LIMIT = 30000

  const exportToPDF = async () => {
    setIsExporting(true)
    
    try {
      const contentToExport = (markdown || '').slice(0, MAX_CHAR_LIMIT)
      
      const printWindow = window.open('', '_blank')
      if (!printWindow) {
        alert('Please allow popups to export PDF')
        return
      }

      const escapedMarkdown = contentToExport
        .replace(/\\/g, '\\\\')
        .replace(/`/g, '\\`')
        .replace(/\$/g, '\\$')
        .replace(/\n/g, '\\n')

      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Markdown Document</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400&display=swap');
            
            body {
              font-family: 'Inter', system-ui, sans-serif;
              line-height: 1.6;
              color: #1e293b;
              max-width: 800px;
              margin: 0 auto;
              padding: 2rem;
              background: white;
            }
            
            h1, h2, h3, h4, h5, h6 {
              font-weight: 600;
              line-height: 1.3;
              margin-top: 2rem;
              margin-bottom: 1rem;
            }
            
            h1 { font-size: 2.25rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.5rem; }
            h2 { font-size: 1.875rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.25rem; }
            h3 { font-size: 1.5rem; }
            h4 { font-size: 1.25rem; }
            h5 { font-size: 1.125rem; }
            h6 { font-size: 1rem; }
            
            p { margin-bottom: 1rem; }
            
            code {
              font-family: 'JetBrains Mono', 'Consolas', monospace;
              background: #f1f5f9;
              padding: 0.125rem 0.25rem;
              border-radius: 0.25rem;
              font-size: 0.875rem;
            }
            
            pre {
              background: #f8fafc;
              border: 1px solid #e2e8f0;
              border-radius: 0.5rem;
              padding: 1rem;
              overflow-x: auto;
              margin: 1rem 0;
            }
            
            pre code {
              background: none;
              padding: 0;
            }
            
            blockquote {
              border-left: 4px solid #3b82f6;
              margin: 1rem 0;
              padding-left: 1rem;
              color: #64748b;
              font-style: italic;
            }
            
            ul, ol {
              margin: 1rem 0;
              padding-left: 2rem;
            }
            
            li {
              margin-bottom: 0.5rem;
            }
            
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 1rem 0;
            }
            
            th, td {
              border: 1px solid #e2e8f0;
              padding: 0.75rem;
              text-align: left;
            }
            
            th {
              background: #f8fafc;
              font-weight: 600;
            }
            
            tr:nth-child(even) {
              background: #f8fafc;
            }
            
            a {
              color: #3b82f6;
              text-decoration: none;
            }
            
            a:hover {
              text-decoration: underline;
            }
            
            hr {
              border: none;
              border-top: 1px solid #e2e8f0;
              margin: 2rem 0;
            }
            
            strong {
              font-weight: 600;
            }
            
            em {
              font-style: italic;
            }
            
            @media print {
              body {
                padding: 0;
                margin: 0;
              }
              
              @page {
                margin: 1in;
              }
            }
          </style>
        </head>
        <body>
          <div id="content"></div>
          <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"><\/script>
          <script>
            const markdownContent = \`${escapedMarkdown}\`;
            document.getElementById('content').innerHTML = marked.parse(markdownContent);
            setTimeout(() => {
              window.print();
            }, 500);
            window.onafterprint = function() {
              window.close();
            }
          <\/script>
        </body>
        </html>
      `

      printWindow.document.write(htmlContent)
      printWindow.document.close()
      
    } catch (error) {
      console.error('Export failed:', error)
      alert('Failed to export PDF. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  const loadSample = () => {
    setMarkdown(SAMPLE_MARKDOWN)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith('.md') && !file.name.endsWith('.markdown')) {
      alert('Please upload a markdown file (.md or .markdown)')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      if (content.length > MAX_CHAR_LIMIT) {
        alert(`File is too large. Maximum ${MAX_CHAR_LIMIT.toLocaleString()} characters allowed.`)
        return
      }
      setMarkdown(content)
    }
    reader.onerror = () => {
      alert('Failed to read file. Please try again.')
    }
    reader.readAsText(file)
    
    event.target.value = ''
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Markdown to PDF Converter
          </h1>
          <p className="text-muted-foreground">
            Convert your markdown text to professionally formatted PDF documents
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Button 
            onClick={exportToPDF} 
            disabled={isExporting || !(markdown || '').trim()}
            className="bg-primary hover:bg-primary/90"
          >
            <Download className="w-4 h-4 mr-2" />
            {isExporting ? 'Exporting...' : 'Export PDF'}
          </Button>
          
          <Button variant="outline" onClick={loadSample}>
            <FileText className="w-4 h-4 mr-2" />
            Load Sample
          </Button>

          <Button 
            variant="outline" 
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <UploadSimple className="w-4 h-4 mr-2" />
            Upload MD
          </Button>
          <input
            id="file-upload"
            type="file"
            accept=".md,.markdown"
            onChange={handleFileUpload}
            className="hidden"
          />

          <Button 
            variant="outline" 
            onClick={() => setShowPreview(!showPreview)}
            className="lg:hidden"
          >
            <Eye className="w-4 h-4 mr-2" />
            {showPreview ? 'Hide' : 'Show'} Preview
          </Button>

          <div className="flex items-center gap-2 ml-auto">
            <Badge 
              variant={(markdown || '').length > MAX_CHAR_LIMIT ? 'destructive' : 'secondary'}
            >
              {(markdown || '').length.toLocaleString()} / {MAX_CHAR_LIMIT.toLocaleString()}
            </Badge>
          </div>
        </div>

        {(markdown || '').length > MAX_CHAR_LIMIT && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm text-destructive font-medium">
              Warning: Content exceeds {MAX_CHAR_LIMIT.toLocaleString()} character limit. 
              Only the first {MAX_CHAR_LIMIT.toLocaleString()} characters will be exported to PDF.
            </p>
          </div>
        )}

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Editor */}
          <Card className="p-0 overflow-hidden">
            <div className="bg-muted/50 px-4 py-3 border-b">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4" />
                <span className="font-medium">Markdown Editor</span>
              </div>
            </div>
            <div className="p-4">
              <Textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                placeholder="Enter your markdown here..."
                className="min-h-[500px] font-mono text-sm resize-none border-0 p-0 focus-visible:ring-0"
                style={{ fontFamily: 'var(--font-mono)' }}
              />
            </div>
          </Card>

          {/* Preview */}
          {showPreview && (
            <Card className="p-0 overflow-hidden">
              <div className="bg-muted/50 px-4 py-3 border-b">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span className="font-medium">Preview</span>
                </div>
              </div>
              <div className="p-6 overflow-y-auto max-h-[600px]">
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({children}) => <h1 className="text-2xl font-bold mb-4 pb-2 border-b">{children}</h1>,
                      h2: ({children}) => <h2 className="text-xl font-semibold mb-3 pb-1 border-b border-gray-200">{children}</h2>,
                      h3: ({children}) => <h3 className="text-lg font-semibold mb-2">{children}</h3>,
                      h4: ({children}) => <h4 className="text-base font-semibold mb-2">{children}</h4>,
                      h5: ({children}) => <h5 className="text-sm font-semibold mb-2">{children}</h5>,
                      h6: ({children}) => <h6 className="text-sm font-semibold mb-2">{children}</h6>,
                      p: ({children}) => <p className="mb-4 leading-relaxed">{children}</p>,
                      code: ({children, ...props}) => {
                        const isInline = !props.className?.includes('language-')
                        return isInline ? 
                          <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono">{children}</code> :
                          <code className="font-mono">{children}</code>
                      },
                      pre: ({children}) => <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>,
                      blockquote: ({children}) => <blockquote className="border-l-4 border-accent pl-4 my-4 text-muted-foreground italic">{children}</blockquote>,
                      ul: ({children}) => <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>,
                      ol: ({children}) => <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>,
                      li: ({children}) => <li className="leading-relaxed">{children}</li>,
                      table: ({children}) => <table className="w-full border-collapse mb-4">{children}</table>,
                      thead: ({children}) => <thead className="bg-muted">{children}</thead>,
                      th: ({children}) => <th className="border border-border p-3 text-left font-semibold">{children}</th>,
                      td: ({children}) => <td className="border border-border p-3">{children}</td>,
                      tr: ({children}) => <tr className="even:bg-muted/50">{children}</tr>,
                      a: ({href, children}) => <a href={href} className="text-accent hover:underline">{children}</a>,
                      hr: () => <hr className="my-6 border-border" />,
                      strong: ({children}) => <strong className="font-semibold">{children}</strong>,
                      em: ({children}) => <em className="italic">{children}</em>,
                    }}
                  >
                    {markdown || '*No content to preview*'}
                  </ReactMarkdown>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            Supports GitHub Flavored Markdown including tables, task lists, and code blocks
          </p>
        </div>
      </div>
    </div>
  )
}

export default App