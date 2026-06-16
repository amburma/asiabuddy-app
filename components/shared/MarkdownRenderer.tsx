import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const MarkdownComponents: any = {
  h1: ({ node, ...props }: any) => (
    <h1 className="text-2xl font-serif text-sacred-green mb-8 border-b border-gold-soft/20 pb-4 leading-tight" {...props} />
  ),
  h2: ({ node, ...props }: any) => (
    <h2 className="text-lg font-serif text-sacred-green mt-12 mb-6 flex items-center gap-3 before:content-[''] before:w-1 before:h-6 before:bg-gold-deep before:rounded-full" {...props} />
  ),
  h3: ({ node, ...props }: any) => (
    <h3 className="text-base font-bold uppercase tracking-widest text-gold-deep mt-8 mb-4 border-b border-gray-50 pb-2" {...props} />
  ),
  h4: ({ node, ...props }: any) => (
    <h4 className="text-sm font-bold text-gray-800 mt-6 mb-2" {...props} />
  ),
  p: ({ node, ...props }: any) => (
    <p className="text-xs text-gray-700 leading-relaxed mb-5" {...props} />
  ),
  ul: ({ node, ...props }: any) => (
    <ul className="space-y-3 mb-6 list-none p-0" {...props} />
  ),
  li: ({ node, ...props }: any) => (
    <li className="flex gap-3 text-xs text-gray-700 leading-relaxed">
      <span className="text-gold-deep mt-1 flex-shrink-0">•</span>
      <span {...props} />
    </li>
  ),
  strong: ({ node, ...props }: any) => (
    <strong className="font-bold text-gray-900 bg-gold-soft/10 px-1 rounded" {...props} />
  ),
  em: ({ node, ...props }: any) => (
    <em className="italic text-gray-600 font-serif" {...props} />
  ),
  a: ({ node, ...props }: any) => (
    <a {...props} target="_self" className="text-gold-deep hover:underline font-bold" />
  ),
  hr: ({ node, ...props }: any) => (
    <hr className="my-12 border-gray-100" {...props} />
  ),
  u: ({ node, ...props }: any) => (
    <span className="underline decoration-gold-soft/50 decoration-2 underline-offset-4" {...props} />
  ),
};

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown rehypePlugins={[rehypeRaw]} components={MarkdownComponents}>
      {content}
    </ReactMarkdown>
  );
}