"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// HTML转Markdown辅助函数
const htmlToMarkdown = (html: string): string => {
  let md = html
    // 替换标题
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, "\n# $1\n")
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, "\n## $1\n")
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, "\n### $1\n")
    .replace(/<h4[^>]*>(.*?)<\/h4>/gi, "\n#### $1\n")
    .replace(/<h5[^>]*>(.*?)<\/h5>/gi, "\n##### $1\n")
    .replace(/<h6[^>]*>(.*?)<\/h6>/gi, "\n###### $1\n")
    // 替换加粗
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, "**$1**")
    .replace(/<b[^>]*>(.*?)<\/b>/gi, "**$1**")
    // 替换斜体
    .replace(/<em[^>]*>(.*?)<\/em>/gi, "*$1*")
    .replace(/<i[^>]*>(.*?)<\/i>/gi, "*$1*")
    // 替换删除线
    .replace(/<del[^>]*>(.*?)<\/del>/gi, "~~$1~~")
    .replace(/<strike[^>]*>(.*?)<\/strike>/gi, "~~$1~~")
    // 替换下划线
    .replace(/<u[^>]*>(.*?)<\/u>/gi, "<u>$1</u>")
    // 替换链接
    .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, "[$2]($1)")
    // 替换图片
    .replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, "![$2]($1)")
    .replace(/<img[^>]*alt="([^"]*)"[^>]*src="([^"]*)"[^>]*\/?>/gi, "![$1]($2)")
    .replace(/<img[^>]*src="([^"]*)"[^>]*\/?>/gi, "![]($1)")
    // 替换代码块
    .replace(
      /<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi,
      "\n```\n$1\n```\n"
    )
    // 替换行内代码
    .replace(/<code[^>]*>(.*?)<\/code>/gi, "`$1`")
    // 替换无序列表
    .replace(/<ul[^>]*>/gi, "\n")
    .replace(/<\/ul>/gi, "\n")
    .replace(/<li[^>]*>(.*?)<\/li>/gi, "- $1\n")
    // 替换有序列表
    .replace(/<ol[^>]*>/gi, "\n")
    .replace(/<\/ol>/gi, "\n")
    .replace(/<li[^>]*>(.*?)<\/li>/gi, "1. $1\n")
    // 替换换行和段落
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<p[^>]*>(.*?)<\/p>/gi, "\n$1\n")
    // 移除其他HTML标签
    .replace(/<[^>]+>/g, "")
    // 解码HTML实体
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    // 清理多余空行
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return md;
};

// Markdown转HTML辅助函数
const markdownToHtml = (md: string): string => {
  return (
    md
      // 标题
      .replace(/^# (.*$)/gm, "<h1>$1</h1>")
      .replace(/^## (.*$)/gm, "<h2>$1</h2>")
      .replace(/^### (.*$)/gm, "<h3>$1</h3>")
      .replace(/^#### (.*$)/gm, "<h4>$1</h4>")
      .replace(/^##### (.*$)/gm, "<h5>$1</h5>")
      .replace(/^###### (.*$)/gm, "<h6>$1</h6>")
      // 文本格式
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\_\_(.*?)\_\_/g, "<strong>$1</strong>")
      .replace(/\_(.*?)\_/g, "<em>$1</em>")
      .replace(/~~(.*?)~~/g, "<del>$1</del>")
      .replace(/<u>(.*?)<\/u>/g, "<u>$1</u>")
      // 链接
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>')
      // 图片
      .replace(
        /!\[(.*?)\]\((.*?)\)/g,
        '<img src="$2" alt="$1" class="max-w-full" />'
      )
      // 代码块
      .replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>")
      // 行内代码
      .replace(/`(.*?)`/g, "<code>$1</code>")
      // 无序列表
      .replace(/^\- (.*$)/gm, "<li>$1</li>")
      .replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>")
      // 有序列表
      .replace(/^\d+\. (.*$)/gm, "<li>$1</li>")
      .replace(/(<li>.*<\/li>)/s, "<ol>$1</ol>")
      // 段落
      .replace(/\n\n/g, "</p><p>")
      .replace(
        /^(?!<h[1-6]>)(?!<p>)(?!<ul>)(?!<ol>)(?!<pre>)(.*$)/gm,
        "<p>$1</p>"
      )
      // 音频和视频
      .replace(
        /<audio src="(.*?)" controls>.*?<\/audio>/g,
        '<audio src="$1" controls> '
      )
      .replace(
        /<video src="(.*?)" controls>.*?<\/video>/g,
        '<video src="$1" controls></video>'
      )
  );
};

export default function RichTextEditor({
  value = "",
  onChange,
  placeholder = "开始编写内容...",
  blogId,
  autoSaveInterval = 3000,
}: {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  blogId?: string;
  autoSaveInterval?: number;
}) {
  const [mode, setMode] = useState<"traditional" | "markdown">("traditional");
  const [showPreview, setShowPreview] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showImageEditor, setShowImageEditor] = useState(false);
  const [selectedImage, setSelectedImage] = useState<HTMLImageElement | null>(
    null
  );
  const [imageAlignment, setImageAlignment] = useState<
    "left" | "center" | "right"
  >("center");
  const [imageAlt, setImageAlt] = useState("");
  const [imageWidth, setImageWidth] = useState("100%");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [spellCheckEnabled, setSpellCheckEnabled] = useState(false);
  const [misspelledWords, setMisspelledWords] = useState<string[]>([]);
  const [showOutline, setShowOutline] = useState(false);
  const [outlineItems, setOutlineItems] = useState<{ id: string; level: number; text: string; }[]>([]);
  const [markdownInput, setMarkdownInput] = useState(value);
  const [lastSyncRef, setLastSyncRef] = useState<string>("");
  const [autoSaveStatus, setAutoSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");
  const [lastSavedTime, setLastSavedTime] = useState<Date | null>(null);
  const [history, setHistory] = useState<
    { content: string; timestamp: Date }[]
  >([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showHistory, setShowHistory] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);
  const isSwitchingMode = useRef(false);
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const historyDebounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 聚焦编辑器
  const focusEditor = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, []);

  // 计算字数和阅读时间
  const calculateStats = useCallback((content: string) => {
    // 移除HTML标签
    const plainText = content.replace(/<[^>]+>/g, "");
    // 移除多余的空白字符
    const cleanedText = plainText.replace(/\s+/g, " ").trim();
    // 计算字数
    const words = cleanedText.split(/\s+/).filter((word) => word.length > 0);
    const count = words.length;
    // 估算阅读时间（假设平均阅读速度为每分钟200字）
    const time = Math.ceil(count / 200);

    setWordCount(count);
    setReadingTime(time);
  }, []);

  // 模拟拼写检查函数
  const checkSpelling = useCallback((content: string) => {
    // 移除HTML标签
    const plainText = content.replace(/<[^>]+>/g, "");
    // 移除多余的空白字符
    const cleanedText = plainText.replace(/\s+/g, " ").trim();
    // 分割单词
    const words = cleanedText.split(/\s+/).filter((word) => word.length > 0);

    // 模拟拼写检查 - 这里使用一个简单的词库
    const dictionary = new Set([
      "我",
      "你",
      "他",
      "她",
      "它",
      "我们",
      "你们",
      "他们",
      "这",
      "那",
      "是",
      "在",
      "有",
      "和",
      "我是",
      "你是",
      "他是",
      "中国",
      "北京",
      "上海",
      "广州",
      "深圳",
      "编程",
      "开发",
      "设计",
      "技术",
      "互联网",
      "电脑",
      "手机",
      "软件",
      "React",
      "Next",
      "JavaScript",
      "TypeScript",
      "HTML",
      "CSS",
      "前端",
      "后端",
      "数据库",
      "服务器",
      "hello",
      "world",
      "test",
      "example",
      "code",
      "function",
      "variable",
      "const",
      "let",
      "var",
      "import",
      "export",
      "return",
      "if",
      "else",
      "for",
      "while",
      "function",
      "class",
      "interface",
    ]);

    // 找出拼写错误的单词
    const misspelled = words.filter((word) => {
      // 跳过数字和太短的单词
      if (word.length < 2 || /^\d+$/.test(word)) return false;
      // 检查是否在词典中
      return !dictionary.has(word.toLowerCase());
    });

    setMisspelledWords(misspelled);
  }, []);

  // 生成内容大纲
  const generateOutline = useCallback((content: string) => {
    const outline: { id: string; level: number; text: string; }[] = [];
    
    // 处理Markdown格式
    if (mode === 'markdown') {
      const lines = content.split('\n');
      lines.forEach(line => {
        const match = line.match(/^(#{1,6})\s+(.*)$/);
        if (match) {
          const level = match[1].length;
          const text = match[2].trim();
          outline.push({
            id: `heading-${outline.length}`,
            level,
            text
          });
        }
      });
    } else {
      // 处理HTML格式
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headings.forEach((heading, index) => {
        const level = parseInt(heading.tagName.substring(1));
        const text = heading.textContent || '';
        outline.push({
          id: `heading-${index}`,
          level,
          text
        });
      });
    }
    
    setOutlineItems(outline);
  }, [mode]);

  // 自动保存功能
  const autoSave = useCallback(() => {
    if (!onChange) return;

    setAutoSaveStatus("saving");

    try {
      const currentContent =
        mode === "traditional"
          ? editorRef.current?.innerHTML || ""
          : markdownInput;

      // 保存到localStorage作为草稿
      const storageKey = blogId ? `blog_draft_${blogId}` : "blog_draft_new";
      localStorage.setItem(storageKey, currentContent);

      setAutoSaveStatus("saved");
      setLastSavedTime(new Date());

      // 3秒后重置保存状态
      setTimeout(() => {
        setAutoSaveStatus("idle");
      }, 3000);
    } catch (error) {
      console.error("自动保存失败:", error);
      setAutoSaveStatus("error");
      setTimeout(() => {
        setAutoSaveStatus("idle");
      }, 3000);
    }
  }, [mode, markdownInput, onChange, blogId]);

  // 添加历史记录
  const addHistory = useCallback(
    (content: string) => {
      // 去重，避免相同内容的历史记录
      if (history.length > 0 && history[historyIndex].content === content) {
        return;
      }

      // 限制历史记录数量
      const MAX_HISTORY = 50;
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push({ content, timestamp: new Date() });

      if (newHistory.length > MAX_HISTORY) {
        newHistory.shift();
      }

      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    },
    [history, historyIndex]
  );

  // 撤销操作
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const previousContent = history[newIndex].content;
      setHistoryIndex(newIndex);

      if (mode === "traditional" && editorRef.current) {
        editorRef.current.innerHTML = previousContent;
        if (onChange) {
          onChange(previousContent);
        }
      } else if (mode === "markdown") {
        setMarkdownInput(previousContent);
        if (onChange) {
          onChange(previousContent);
        }
      }
    }
  }, [history, historyIndex, mode, onChange]);

  // 重做操作
  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const nextContent = history[newIndex].content;
      setHistoryIndex(newIndex);

      if (mode === "traditional" && editorRef.current) {
        editorRef.current.innerHTML = nextContent;
        if (onChange) {
          onChange(nextContent);
        }
      } else if (mode === "markdown") {
        setMarkdownInput(nextContent);
        if (onChange) {
          onChange(nextContent);
        }
      }
    }
  }, [history, historyIndex, mode, onChange]);

  // 处理格式
  const handleFormat = (formatType: string) => {
    if (mode === "traditional") {
      // 先聚焦编辑器
      if (editorRef.current) {
        editorRef.current.focus();
      }

      // 传统模式下使用document.execCommand
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) {
        // 如果没有选区，尝试创建一个默认选区
        if (editorRef.current) {
          const range = document.createRange();
          range.selectNodeContents(editorRef.current);
          range.collapse(false);
          selection?.removeAllRanges();
          selection?.addRange(range);
        } else {
          return;
        }
      }

      switch (formatType) {
        case "bold":
          document.execCommand("bold", false, undefined);
          break;
        case "italic":
          document.execCommand("italic", false, undefined);
          break;
        case "underline":
          document.execCommand("underline", false, undefined);
          break;
        case "strikethrough":
          document.execCommand("strikeThrough", false, undefined);
          break;
        case "h1":
          document.execCommand("formatBlock", false, "<h1>");
          break;
        case "h2":
          document.execCommand("formatBlock", false, "<h2>");
          break;
        case "h3":
          document.execCommand("formatBlock", false, "<h3>");
          break;
        case "ul":
          document.execCommand("insertUnorderedList", false, undefined);
          break;
        case "ol":
          document.execCommand("insertOrderedList", false, undefined);
          break;
        case "link":
          const url = prompt("请输入链接地址:", "https://example.com");
          if (url) {
            document.execCommand("createLink", false, url);
          }
          break;
        case "code":
          document.execCommand("formatBlock", false, "<pre>");
          break;
        case "table":
          // 插入一个3x3的表格
          const tableHtml = `
            <table border="1" style="border-collapse: collapse; width: 100%;">
              <thead>
                <tr>
                  <th style="border: 1px solid #ddd; padding: 8px;">标题1</th>
                  <th style="border: 1px solid #ddd; padding: 8px;">标题2</th>
                  <th style="border: 1px solid #ddd; padding: 8px;">标题3</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="border: 1px solid #ddd; padding: 8px;">内容1</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">内容2</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">内容3</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #ddd; padding: 8px;">内容4</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">内容5</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">内容6</td>
                </tr>
              </tbody>
            </table>
          `;
          document.execCommand("insertHTML", false, tableHtml);
          break;
        default:
          break;
      }

      // 保持焦点在编辑器上
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.focus();
        }
      }, 10);

      // 更新内容
      handleTraditionalEditorChange();
    } else {
      // Markdown模式下添加相应的Markdown语法
      let newContent = markdownInput || "";

      switch (formatType) {
        case "bold":
          newContent += "**加粗文本** ";
          break;
        case "italic":
          newContent += "*斜体文本* ";
          break;
        case "underline":
          newContent += "<u>下划线文本</u> ";
          break;
        case "strikethrough":
          newContent += "~~删除线文本~~ ";
          break;
        case "h1":
          newContent += "\n# 一级标题\n";
          break;
        case "h2":
          newContent += "\n## 二级标题\n";
          break;
        case "h3":
          newContent += "\n### 三级标题\n";
          break;
        case "ul":
          newContent += "\n- 列表项\n- 列表项\n";
          break;
        case "ol":
          newContent += "\n1. 列表项\n2. 列表项\n";
          break;
        case "link":
          newContent += "\n[链接文本](https://example.com)\n";
          break;
        case "code":
          newContent += "\n```\n代码块\n```\n";
          break;
        case "table":
          newContent += "\n| 标题1 | 标题2 | 标题3 |\n| --- | --- | --- |\n| 内容1 | 内容2 | 内容3 |\n| 内容4 | 内容5 | 内容6 |\n";
          break;
        default:
          break;
      }

      setMarkdownInput(newContent);
      if (onChange) {
        onChange(newContent);
      }
    }
  };

  // 处理模式切换
  const handleModeChange = (newMode: "traditional" | "markdown") => {
    if (newMode === mode) return;

    isSwitchingMode.current = true;

    if (newMode === "markdown" && editorRef.current && onChange) {
      // 从传统模式切换到Markdown模式 - 将HTML转换为Markdown
      const htmlContent = editorRef.current.innerHTML;
      const mdContent = htmlToMarkdown(htmlContent);
      setMarkdownInput(mdContent);
      onChange(mdContent);
    } else if (newMode === "traditional" && editorRef.current) {
      // 从Markdown模式切换到传统模式 - 将Markdown转换为HTML
      const mdContent = markdownInput;
      const htmlContent = markdownToHtml(mdContent);
      editorRef.current.innerHTML = htmlContent;
      if (onChange) {
        onChange(htmlContent);
      }
    }

    setMode(newMode);

    // 重置标志
    setTimeout(() => {
      isSwitchingMode.current = false;
    }, 0);
  };

  // 处理传统编辑器变化
  const handleTraditionalEditorChange = () => {
    if (editorRef.current && onChange) {
      onChange(editorRef.current.innerHTML);
    }
  };

  // 处理Markdown变化
  const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setMarkdownInput(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  // 处理文件上传
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFiles(Array.from(files));
    }
  };

  // 处理拖拽上传
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // 处理放置上传
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      processFiles(files);
    }
  };

  // 处理文件上传
  const processFiles = (files: File[]) => {
    let uploadedCount = 0;
    setUploading(true);
    setUploadProgress(0);

    files.forEach((file, index) => {
      // 模拟文件上传进度
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(
          Math.min(
            100,
            Math.round((uploadedCount * 100 + progress) / files.length)
          )
        );
        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 100);

      // 模拟文件上传
      setTimeout(() => {
        clearInterval(interval);
        const fileUrl = `https://example.com/uploads/${file.name}`;

        if (mode === "traditional" && editorRef.current) {
          // 在传统模式下插入媒体
          const selection = window.getSelection();
          if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);

            if (file.type.startsWith("image/")) {
              const img = document.createElement("img");
              img.src = fileUrl;
              img.alt = file.name;
              img.className = "max-w-full h-auto";
              img.style.maxWidth = "100%";
              img.style.height = "auto";
              range.insertNode(img);

              // 选中插入的图片，以便用户可以编辑
              const newRange = document.createRange();
              newRange.selectNode(img);
              selection.removeAllRanges();
              selection.addRange(newRange);
            } else if (file.type.startsWith("audio/")) {
              const audio = document.createElement("audio");
              audio.src = fileUrl;
              audio.controls = true;
              range.insertNode(audio);
            } else if (file.type.startsWith("video/")) {
              const video = document.createElement("video");
              video.src = fileUrl;
              video.controls = true;
              video.className = "max-w-full h-auto";
              range.insertNode(video);
            } else {
              const link = document.createElement("a");
              link.href = fileUrl;
              link.target = "_blank";
              link.textContent = file.name;
              range.insertNode(link);
            }

            // 更新内容
            handleTraditionalEditorChange();
          }
        } else if (mode === "markdown" && onChange) {
          // 在Markdown模式下插入媒体链接
          let newContent = markdownInput || "";
          if (file.type.startsWith("image/")) {
            newContent += `![${file.name}](${fileUrl})\n`;
          } else if (file.type.startsWith("audio/")) {
            newContent += `<audio src="${fileUrl}" controls></audio>\n`;
          } else if (file.type.startsWith("video/")) {
            newContent += `<video src="${fileUrl}" controls></video>\n`;
          } else {
            newContent += `[${file.name}](${fileUrl})\n`;
          }
          setMarkdownInput(newContent);
          onChange(newContent);
        }

        uploadedCount++;
        setUploadProgress(Math.round((uploadedCount / files.length) * 100));

        if (uploadedCount === files.length) {
          setTimeout(() => {
            setUploading(false);
            setUploadProgress(0);
          }, 500);
        }
      }, 1000);
    });
  };

  // 渲染Markdown
  const renderMarkdown = (text: string) => {
    // 处理代码块，支持语法高亮
    const processedText = text
      // 标题
      .replace(/^# (.*$)/gm, "<h1>$1</h1>")
      .replace(/^## (.*$)/gm, "<h2>$1</h2>")
      .replace(/^### (.*$)/gm, "<h3>$1</h3>")
      .replace(/^#### (.*$)/gm, "<h4>$1</h4>")
      .replace(/^##### (.*$)/gm, "<h5>$1</h5>")
      .replace(/^###### (.*$)/gm, "<h6>$1</h6>")
      // 文本格式
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/\_\_(.*?)\_\_/g, "<strong>$1</strong>")
      .replace(/\_(.*?)\_/g, "<em>$1</em>")
      .replace(/~~(.*?)~~/g, "<del>$1</del>")
      .replace(/<u>(.*?)<\/u>/g, "<u>$1</u>")
      // 链接
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>')
      // 图片
      .replace(
        /!\[(.*?)\]\((.*?)\)/g,
        '<img src="$2" alt="$1" class="max-w-full" />'
      )
      // 代码块（支持语言指定）
      .replace(/```([a-zA-Z0-9]*)([\s\S]*?)```/g, (match, lang, code) => {
        return `<pre><code class="language-${lang || 'plaintext'}">${code}</code></pre>`;
      })
      // 行内代码
      .replace(/`(.*?)`/g, "<code>$1</code>")
      // 无序列表
      .replace(/^\- (.*$)/gm, "<li>$1</li>")
      .replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>")
      // 有序列表
      .replace(/^\d+\. (.*$)/gm, "<li>$1</li>")
      .replace(/(<li>.*<\/li>)/s, "<ol>$1</ol>")
      // 段落
      .replace(/\n\n/g, "</p><p>")
      .replace(
        /^(?!<h[1-6]>)(?!<p>)(?!<ul>)(?!<ol>)(?!<pre>)(.*$)/gm,
        "<p>$1</p>"
      )
      // 音频和视频
      .replace(
        /<audio src="(.*?)" controls>.*?<\/audio>/g,
        '<audio src="$1" controls> '
      )
      .replace(
        /<video src="(.*?)" controls>.*?<\/video>/g,
        '<video src="$1" controls></video>'
      );

    return { __html: processedText };
  };

  // 切换全屏
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // 初始化内容
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (editorRef.current && mode === "traditional" && value) {
        editorRef.current.innerHTML = value;
      }
    }
  }, [mode, value]);

  // 外部value变化时同步到传统模式编辑器
  useEffect(() => {
    if (
      !isSwitchingMode.current &&
      editorRef.current &&
      mode === "traditional"
    ) {
      const currentContent = editorRef.current.innerHTML;
      if (value !== currentContent && value !== lastSyncRef) {
        editorRef.current.innerHTML = value;
        setLastSyncRef(value);
      }
    }
  }, [value, mode, lastSyncRef]);

  // 外部value变化时同步到Markdown模式
  useEffect(() => {
    if (
      !isSwitchingMode.current &&
      mode === "markdown" &&
      value !== markdownInput
    ) {
      setMarkdownInput(value);
    }
  }, [value, mode]);

  // 定时自动保存
  useEffect(() => {
    // 清除之前的定时器
    if (autoSaveTimerRef.current) {
      clearInterval(autoSaveTimerRef.current);
    }

    // 设置新的定时器
    autoSaveTimerRef.current = setInterval(() => {
      autoSave();
    }, autoSaveInterval);

    // 组件卸载时清除定时器
    return () => {
      if (autoSaveTimerRef.current) {
        clearInterval(autoSaveTimerRef.current);
      }
    };
  }, [autoSave, autoSaveInterval]);

  // 内容变化时触发保存
  useEffect(() => {
    // 避免初始加载时触发
    if (!isInitialMount.current) {
      // 延迟保存，避免频繁触发
      const timer = setTimeout(() => {
        autoSave();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [value, autoSave]);

  // 组件挂载时尝试从localStorage恢复草稿
  useEffect(() => {
    if (isInitialMount.current) {
      const storageKey = blogId ? `blog_draft_${blogId}` : "blog_draft_new";
      const savedDraft = localStorage.getItem(storageKey);

      if (savedDraft && !value) {
        if (mode === "traditional" && editorRef.current) {
          editorRef.current.innerHTML = savedDraft;
          if (onChange) {
            onChange(savedDraft);
          }
        } else if (mode === "markdown") {
          setMarkdownInput(savedDraft);
          if (onChange) {
            onChange(savedDraft);
          }
        }
      }
    }
  }, [blogId, mode, onChange, value]);

  // 内容变化时添加历史记录
  useEffect(() => {
    if (!isInitialMount.current && value) {
      // 防抖处理，避免频繁添加历史记录
      if (historyDebounceTimerRef.current) {
        clearTimeout(historyDebounceTimerRef.current);
      }

      historyDebounceTimerRef.current = setTimeout(() => {
        addHistory(value);
      }, 500);
    }
  }, [value, addHistory]);

  // 组件挂载时初始化历史记录
  useEffect(() => {
    if (isInitialMount.current && value) {
      addHistory(value);
    }
  }, [value, addHistory]);

  // 内容变化时更新统计数据和生成大纲
  useEffect(() => {
    if (value) {
      calculateStats(value);
      if (spellCheckEnabled) {
        checkSpelling(value);
      }
      generateOutline(value);
    } else {
      setWordCount(0);
      setReadingTime(0);
      setMisspelledWords([]);
      setOutlineItems([]);
    }
  }, [value, calculateStats, spellCheckEnabled, generateOutline]);

  // 处理全屏切换
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (isFullscreen) {
      container.style.position = "fixed";
      container.style.top = "0";
      container.style.left = "0";
      container.style.right = "0";
      container.style.bottom = "0";
      container.style.zIndex = "9999";
      container.style.backgroundColor = "white";
    } else {
      container.style.position = "static";
      container.style.top = "auto";
      container.style.left = "auto";
      container.style.right = "auto";
      container.style.bottom = "auto";
      container.style.zIndex = "auto";
      container.style.backgroundColor = "transparent";
    }
  }, [isFullscreen]);

  // 键盘快捷键支持
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 检查是否按下了Ctrl或Cmd键
      const isCtrlPressed = e.ctrlKey || e.metaKey;
      
      // 处理快捷键
      switch (e.key.toLowerCase()) {
        case 'b':
          if (isCtrlPressed) {
            e.preventDefault();
            handleFormat('bold');
          }
          break;
        case 'i':
          if (isCtrlPressed) {
            e.preventDefault();
            handleFormat('italic');
          }
          break;
        case 'u':
          if (isCtrlPressed) {
            e.preventDefault();
            handleFormat('underline');
          }
          break;
        case 'z':
          if (isCtrlPressed && !e.shiftKey) {
            e.preventDefault();
            undo();
          }
          break;
        case 'y':
          if (isCtrlPressed) {
            e.preventDefault();
            redo();
          }
          break;
        case 's':
          if (isCtrlPressed) {
            e.preventDefault();
            autoSave();
          }
          break;
        case '1':
          if (isCtrlPressed) {
            e.preventDefault();
            handleFormat('h1');
          }
          break;
        case '2':
          if (isCtrlPressed) {
            e.preventDefault();
            handleFormat('h2');
          }
          break;
        case '3':
          if (isCtrlPressed) {
            e.preventDefault();
            handleFormat('h3');
          }
          break;
        case '\n':
          if (e.key === 'Enter' && e.ctrlKey) {
            e.preventDefault();
            handleFormat('ul');
          }
          break;
        default:
          break;
      }
    };

    // 添加键盘事件监听器
    window.addEventListener('keydown', handleKeyDown);

    // 组件卸载时移除监听器
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleFormat, undo, redo, autoSave]);

  return (
    <div
      ref={containerRef}
      className={`w-full ${isFullscreen ? "h-screen" : ""}`}
    >
      {/* 非全屏模式 */}
      {!isFullscreen && (
        <>
          {/* 工具栏 */}
          <div className="bg-white border border-border rounded-t-lg p-3 flex flex-wrap items-center gap-2 shadow-sm">
            {/* 移动端菜单按钮 */}
            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex items-center gap-1 px-3 py-1.5 border border-border rounded-md text-sm hover:bg-muted transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  )}
                </svg>
                {mobileMenuOpen ? "收起" : "菜单"}
              </button>
            </div>
            {/* 工具栏选项 - 桌面端始终显示，移动端仅在菜单打开时显示 */}
            <div
                className={`flex flex-wrap items-center gap-2 p-2 bg-white rounded-lg shadow-sm ${
                  mobileMenuOpen ? "block" : "hidden"
                } md:flex md:bg-transparent md:shadow-none md:p-0`}
              >
              {/* 模式切换 */}
              <div className="flex border border-border rounded-md overflow-hidden">
                <button
                  type="button"
                  onClick={() => handleModeChange("traditional")}
                  className={`px-4 py-2 text-sm ${
                    mode === "traditional"
                      ? "bg-primary text-white"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  传统模式
                </button>
                <button
                  type="button"
                  onClick={() => handleModeChange("markdown")}
                  className={`px-4 py-2 text-sm ${
                    mode === "markdown"
                      ? "bg-primary text-white"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  Markdown模式
                </button>
              </div>

              {/* Markdown模式预览开关 */}
              {mode === "markdown" && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-secondary">实时预览：</span>
                  <button
                    type="button"
                    onClick={() => setShowPreview(!showPreview)}
                    className={`px-3 py-1 text-sm rounded-md ${
                      showPreview
                        ? "bg-primary text-white"
                        : "text-foreground hover:bg-muted border border-border"
                    }`}
                  >
                    {showPreview ? "开启" : "关闭"}
                  </button>
                </div>
              )}

              {/* 分隔线 */}
              <div className="w-px h-6 bg-border mx-2"></div>

              {/* 排版工具 */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleFormat("bold")}
                  className="flex items-center justify-center w-9 h-9 rounded-md text-sm hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  title="加粗"
                >
                  <strong>B</strong>
                </button>
                <button
                  type="button"
                  onClick={() => handleFormat("italic")}
                  className="flex items-center justify-center w-9 h-9 rounded-md text-sm hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  title="斜体"
                >
                  <em>I</em>
                </button>
                <button
                  type="button"
                  onClick={() => handleFormat("underline")}
                  className="flex items-center justify-center w-9 h-9 rounded-md text-sm hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  title="下划线"
                >
                  <u>U</u>
                </button>
                <button
                  type="button"
                  onClick={() => handleFormat("strikethrough")}
                  className="flex items-center justify-center w-9 h-9 rounded-md text-sm hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  title="删除线"
                >
                  <span style={{ textDecoration: "line-through" }}>S</span>
                </button>
                <div className="w-px h-6 bg-border mx-1"></div>
                <button
                  type="button"
                  onClick={() => handleFormat("h1")}
                  className="flex items-center justify-center w-9 h-9 rounded-md text-sm hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  title="一级标题"
                >
                  H1
                </button>
                <button
                  type="button"
                  onClick={() => handleFormat("h2")}
                  className="flex items-center justify-center w-9 h-9 rounded-md text-sm hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  title="二级标题"
                >
                  H2
                </button>
                <button
                  type="button"
                  onClick={() => handleFormat("h3")}
                  className="flex items-center justify-center w-9 h-9 rounded-md text-sm hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  title="三级标题"
                >
                  H3
                </button>
                <div className="w-px h-6 bg-border mx-1"></div>
                <button
                  type="button"
                  onClick={() => handleFormat("ul")}
                  className="flex items-center justify-center w-9 h-9 rounded-md text-sm hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  title="无序列表"
                >
                  •
                </button>
                <button
                  type="button"
                  onClick={() => handleFormat("ol")}
                  className="flex items-center justify-center w-9 h-9 rounded-md text-sm hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  title="有序列表"
                >
                  1.
                </button>
                <button
                  type="button"
                  onClick={() => handleFormat("link")}
                  className="flex items-center justify-center w-9 h-9 rounded-md text-sm hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  title="插入链接"
                >
                  🔗
                </button>
                <button
                  type="button"
                  onClick={() => handleFormat("code")}
                  className="flex items-center justify-center w-9 h-9 rounded-md text-sm hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  title="代码块"
                >
                  {}
                </button>
                <button
                  type="button"
                  onClick={() => handleFormat("table")}
                  className="flex items-center justify-center w-9 h-9 rounded-md text-sm hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  title="插入表格"
                >
                  📊
                </button>
              </div>

              {/* 分隔线 */}
              <div className="w-px h-6 bg-border mx-2"></div>

              {/* 撤销/重做 */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={undo}
                  disabled={historyIndex <= 0}
                  className="flex items-center justify-center w-9 h-9 rounded-md text-sm hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  title="撤销"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={redo}
                  disabled={historyIndex >= history.length - 1}
                  className="flex items-center justify-center w-9 h-9 rounded-md text-sm hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  title="重做"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 10h-6a8 8 0 00-8 8v2M21 10l-6-6m6 6l-6 6"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setShowHistory(!showHistory)}
                  className="flex items-center justify-center w-9 h-9 rounded-md text-sm hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  title="版本历史"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>

              {/* 分隔线 */}
              <div className="w-px h-6 bg-border mx-2"></div>

              {/* 媒体上传 */}
              <div className="flex items-center gap-2">
                <label className="flex items-center justify-center w-9 h-9 rounded-md text-sm cursor-pointer hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5">
                  📷
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                    disabled={uploading}
                  />
                </label>
                <label className="flex items-center justify-center w-9 h-9 rounded-md text-sm cursor-pointer hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5">
                  🎵
                  <input
                    type="file"
                    accept="audio/*"
                    className="hidden"
                    onChange={handleFileUpload}
                    disabled={uploading}
                  />
                </label>
                <label className="flex items-center justify-center w-9 h-9 rounded-md text-sm cursor-pointer hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5">
                  📹
                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={handleFileUpload}
                    disabled={uploading}
                  />
                </label>
                <label className="flex items-center justify-center w-9 h-9 rounded-md text-sm cursor-pointer hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5">
                  📎
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    disabled={uploading}
                  />
                </label>
              </div>

              {/* 分隔线 */}
              <div className="w-px h-6 bg-border mx-2"></div>

              {/* 拼写检查 */}
              <button
                type="button"
                onClick={() => setSpellCheckEnabled(!spellCheckEnabled)}
                className={`flex items-center justify-center w-9 h-9 rounded-md text-sm transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
                  spellCheckEnabled
                    ? "bg-primary text-white"
                    : "text-foreground hover:bg-white"
                }`}
                title="拼写检查"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </button>

              {/* 分隔线 */}
              <div className="w-px h-6 bg-border mx-2"></div>

              {/* 大纲按钮 */}
              <button
                type="button"
                onClick={() => setShowOutline(!showOutline)}
                className={`flex items-center justify-center w-9 h-9 rounded-md text-sm transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
                  showOutline
                    ? "bg-primary text-white"
                    : "text-foreground hover:bg-white"
                }`}
                title="内容大纲"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>

              {/* 分隔线 */}
              <div className="w-px h-6 bg-border mx-2"></div>

              {/* 全屏按钮 */}
              <button
                type="button"
                onClick={toggleFullscreen}
                className="flex items-center justify-center w-9 h-9 rounded-md text-sm hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                title={isFullscreen ? "退出全屏" : "全屏"}
              >
                📱
              </button>

            </div>

            {/* 上传状态 */}
            {uploading && (
              <div className="flex flex-col items-center gap-1">
                <div className="text-sm text-primary">上传中...</div>
                <div className="w-40 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300 ease-in-out"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500">{uploadProgress}%</div>
              </div>
            )}

            {/* 自动保存状态 */}
            <div className="text-sm">
              {autoSaveStatus === "saving" && (
                <span className="text-blue-500">保存中...</span>
              )}
              {autoSaveStatus === "saved" && (
                <span className="text-green-500">已保存</span>
              )}
              {autoSaveStatus === "error" && (
                <span className="text-red-500">保存失败</span>
              )}
              {autoSaveStatus === "idle" && lastSavedTime && (
                <span className="text-gray-500">
                  上次保存: {lastSavedTime.toLocaleTimeString()}
                </span>
              )}
            </div>

            {/* 字数统计和阅读时间 */}
            <div className="text-sm text-gray-500 ml-4">
              {wordCount} 字 · 约 {readingTime} 分钟阅读
            </div>
            
            {/* 拼写检查结果 */}
            {spellCheckEnabled && misspelledWords.length > 0 && (
              <div className="text-sm text-red-500 ml-4">
                发现 {misspelledWords.length} 个可能的拼写错误
              </div>
            )}
          </div>

          {/* 编辑区域 */}
          <div className="border-x border-b border-gray-100 rounded-b-lg min-h-[300px] sm:min-h-[400px] md:min-h-[500px] flex bg-white shadow-sm">
            {/* 大纲侧边栏 */}
            {showOutline && (
              <div className="w-48 sm:w-56 md:w-64 border-r border-gray-100 bg-gray-50 p-4 overflow-auto">
                <h3 className="text-sm font-semibold mb-3 text-gray-700">内容大纲</h3>
                {outlineItems.length > 0 ? (
                  <ul className="space-y-1">
                    {outlineItems.map((item, index) => (
                      <li key={item.id} className="text-sm">
                        <a
                          href={`#${item.id}`}
                          className="block py-1 px-2 rounded hover:bg-muted transition-colors"
                          style={{ paddingLeft: `${(item.level - 1) * 16}px` }}
                          onClick={(e) => {
                            e.preventDefault();
                            // 滚动到对应的标题位置
                            if (mode === "traditional" && editorRef.current) {
                              const headings = editorRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6');
                              if (headings[index]) {
                                headings[index].scrollIntoView({ behavior: 'smooth' });
                                // 聚焦到标题
                                (headings[index] as HTMLElement).focus();
                              }
                            }
                          }}
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">暂无内容大纲</p>
                )}
              </div>
            )}

            {/* 主编辑区域 */}
            <div className={`flex-1 ${showOutline ? 'md:ml-0' : ''}`}>
              {mode === "traditional" && (
                <div className="h-[300px] md:h-[400px] overflow-auto">
                  <div
                    ref={editorRef}
                    contentEditable
                    suppressContentEditableWarning={true}
                    onInput={handleTraditionalEditorChange}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={(e) => {
                      const target = e.target as HTMLElement;
                      if (target.tagName === "IMG") {
                        const imgTarget = target as HTMLImageElement;
                        setSelectedImage(imgTarget);
                        setImageAlt(imgTarget.alt || "");
                        setImageWidth(imgTarget.style.width || "100%");
                        // 检测当前对齐方式
                        const marginLeft = imgTarget.style.marginLeft;
                        const marginRight = imgTarget.style.marginRight;
                        if (marginLeft === "0" && marginRight === "auto") {
                          setImageAlignment("left");
                        } else if (
                          marginLeft === "auto" &&
                          marginRight === "auto"
                        ) {
                          setImageAlignment("center");
                        } else if (marginLeft === "auto" && marginRight === "0") {
                          setImageAlignment("right");
                        } else {
                          setImageAlignment("center");
                        }
                        setShowImageEditor(true);
                      }
                    }}
                    data-placeholder={placeholder}
                    className="w-full h-full p-6 focus:outline-none"
                    style={{
                      outline: "none",
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word",
                      minHeight: "300px",
                      fontSize: "16px",
                      lineHeight: "1.8",
                      color: "#333333",
                      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                      backgroundColor: "#ffffff",
                    }}
                  />
                </div>
              )}

              {mode === "markdown" && (
                <div
                  className={`h-[300px] md:h-[400px] ${
                    showPreview ? "flex flex-col md:flex-row" : ""
                  }`}
                >
                  <div
                    className={`${
                      showPreview
                        ? "w-full md:w-1/2 border-b md:border-b-0 md:border-r border-border"
                        : "w-full"
                    }`}
                  >
                    <textarea
                      value={markdownInput}
                      onChange={handleMarkdownChange}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      placeholder="在此输入Markdown内容..."
                      className="w-full h-full p-6 border-none focus:outline-none font-mono"
                      style={{ resize: "none", fontSize: "15px", lineHeight: "1.6", color: "#333333" }}
                    />
                  </div>
                  {showPreview && (
                    <div className="w-full md:w-1/2 p-6 overflow-auto bg-gray-50">
                      <div className="prose max-w-none prose-slate">
                        <div 
                          className="preview-content" 
                          dangerouslySetInnerHTML={renderMarkdown(markdownInput)}
                          style={{
                            fontSize: "16px",
                            lineHeight: "1.8",
                            color: "#333333",
                            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                            backgroundColor: "#f9fafb",
                            padding: "1rem",
                            borderRadius: "8px",
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 图片编辑器 */}
          {showImageEditor && selectedImage && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h3 className="text-lg font-semibold mb-4">图片编辑器</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">图片描述</label>
                  <input
                    type="text"
                    value={imageAlt}
                    onChange={(e) => setImageAlt(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md"
                    placeholder="输入图片描述..."
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">图片宽度</label>
                  <input
                    type="text"
                    value={imageWidth}
                    onChange={(e) => setImageWidth(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md"
                    placeholder="例如: 100% 或 500px"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">对齐方式</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setImageAlignment("left")}
                      className={`flex-1 py-2 border rounded-md ${imageAlignment === "left" ? "bg-primary text-white" : "border-border hover:bg-muted"}`}
                    >
                      左对齐
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageAlignment("center")}
                      className={`flex-1 py-2 border rounded-md ${imageAlignment === "center" ? "bg-primary text-white" : "border-border hover:bg-muted"}`}
                    >
                      居中
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageAlignment("right")}
                      className={`flex-1 py-2 border rounded-md ${imageAlignment === "right" ? "bg-primary text-white" : "border-border hover:bg-muted"}`}
                    >
                      右对齐
                    </button>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedImage) {
                        // 应用图片编辑
                        selectedImage.alt = imageAlt;
                        selectedImage.style.width = imageWidth;
                        
                        // 设置对齐方式
                        if (imageAlignment === "left") {
                          selectedImage.style.marginLeft = "0";
                          selectedImage.style.marginRight = "auto";
                        } else if (imageAlignment === "center") {
                          selectedImage.style.marginLeft = "auto";
                          selectedImage.style.marginRight = "auto";
                        } else if (imageAlignment === "right") {
                          selectedImage.style.marginLeft = "auto";
                          selectedImage.style.marginRight = "0";
                        }
                        
                        // 更新内容
                        handleTraditionalEditorChange();
                      }
                      setShowImageEditor(false);
                      setSelectedImage(null);
                    }}
                    className="flex-1 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                  >
                    应用
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowImageEditor(false);
                      setSelectedImage(null);
                    }}
                    className="flex-1 py-2 border border-border rounded-md hover:bg-muted transition-colors"
                  >
                    取消
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      
      {/* 全屏模式 */}
      {isFullscreen && (
        <div className="h-full flex flex-col">
          {/* 全屏工具栏 */}
          <div className="bg-white border-b border-border p-3 flex justify-between items-center">
            <h2 className="text-lg font-semibold">全屏编辑</h2>
            <button
              type="button"
              onClick={toggleFullscreen}
              className="px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors"
            >
              退出全屏
            </button>
          </div>
          
          {/* 全屏编辑区域 */}
          <div className="flex-1 overflow-auto">
            {mode === "traditional" && (
              <div className="h-full">
                <div
                  ref={editorRef}
                  contentEditable
                  suppressContentEditableWarning={true}
                  onInput={handleTraditionalEditorChange}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={(e) => {
                    const target = e.target as HTMLElement;
                    if (target.tagName === "IMG") {
                      const imgTarget = target as HTMLImageElement;
                      setSelectedImage(imgTarget);
                      setImageAlt(imgTarget.alt || "");
                      setImageWidth(imgTarget.style.width || "100%");
                      // 检测当前对齐方式
                      const marginLeft = imgTarget.style.marginLeft;
                      const marginRight = imgTarget.style.marginRight;
                      if (marginLeft === "0" && marginRight === "auto") {
                        setImageAlignment("left");
                      } else if (
                        marginLeft === "auto" &&
                        marginRight === "auto"
                      ) {
                        setImageAlignment("center");
                      } else if (marginLeft === "auto" && marginRight === "0") {
                        setImageAlignment("right");
                      } else {
                        setImageAlignment("center");
                      }
                      setShowImageEditor(true);
                    }
                  }}
                  data-placeholder={placeholder}
                  className="w-full h-full p-8 focus:outline-none"
                    style={{
                      outline: "none",
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word",
                      fontSize: "18px",
                      lineHeight: "1.8",
                      color: "#333333",
                      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                      backgroundColor: "#ffffff",
                    }}
                />
              </div>
            )}
            
            {mode === "markdown" && (
              <div className="h-full flex">
                <div className="w-1/2 border-r border-border">
                  <textarea
                    value={markdownInput}
                    onChange={handleMarkdownChange}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    placeholder="在此输入Markdown内容..."
                    className="w-full h-full p-8 border-none focus:outline-none font-mono"
                    style={{ resize: "none", fontSize: "16px", lineHeight: "1.6", color: "#333333" }}
                  />
                </div>
                <div className="w-1/2 p-8 overflow-auto bg-gray-50">
                  <div className="prose max-w-none prose-slate">
                    <div 
                      className="preview-content" 
                      dangerouslySetInnerHTML={renderMarkdown(markdownInput)}
                      style={{
                        fontSize: "16px",
                        lineHeight: "1.8",
                        color: "#333333",
                        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                        backgroundColor: "#f9fafb",
                        padding: "1.5rem",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* 版本历史面板 */}
      {showHistory && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center">
          <div className="bg-white rounded-t-lg w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-border flex justify-between items-center">
              <h3 className="text-lg font-semibold">版本历史</h3>
              <button
                type="button"
                onClick={() => setShowHistory(false)}
                className="p-2 hover:bg-muted rounded-full"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4">
              {history.length > 0 ? (
                <ul className="space-y-3">
                  {history.map((item, index) => (
                    <li
                      key={index}
                      className={`p-3 border rounded-md cursor-pointer ${
                        index === historyIndex ? "bg-primary/10 border-primary" : "border-border"
                      }`}
                      onClick={() => {
                        const content = item.content;
                        setHistoryIndex(index);
                        
                        if (mode === "traditional" && editorRef.current) {
                          editorRef.current.innerHTML = content;
                          if (onChange) {
                            onChange(content);
                          }
                        } else if (mode === "markdown") {
                          setMarkdownInput(content);
                          if (onChange) {
                            onChange(content);
                          }
                        }
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">版本 {history.length - index}</span>
                        <span className="text-xs text-gray-500">
                          {item.timestamp.toLocaleString()}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-gray-600 line-clamp-2">
                        {item.content.replace(/<[^>]+>/g, "").substring(0, 100)}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-500 py-8">暂无历史记录</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
