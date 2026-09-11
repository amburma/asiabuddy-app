import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

const MarkdownComponents: any = {
  img: ({ node, src, alt, title, ...props }: any) => (
    <figure className="my-6">
      <img
        src={src}
        alt={alt || ''}
        className="w-full h-auto rounded-lg shadow-md object-cover"
        {...props}
      />
      {alt && (
        <figcaption className="text-sm text-gray-500 text-center mt-2 italic">
          {alt}
        </figcaption>
      )}
    </figure>
  ),
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
  p: ({ node, children, ...props }: any) => {
    // Check if this paragraph contains only an image element
    const hasOnlyImage = React.Children.count(children) === 1 && 
      React.isValidElement(children) && 
      (children as any).type === MarkdownComponents.img;
    
    if (hasOnlyImage) {
      return <div className="text-base md:text-lg text-left text-gray-700 leading-relaxed mb-5" {...props}>{children}</div>;
    }
    
    return <p className="text-base md:text-lg text-left text-gray-700 leading-relaxed mb-5" {...props}>{children}</p>;
  },
  ul: ({ node, ...props }: any) => (
    <ul className="space-y-3 mb-6 list-none p-0" {...props} />
  ),
  li: ({ node, ...props }: any) => (
    <li className="flex gap-3 text-base md:text-lg text-gray-700 leading-relaxed">
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
  table: ({ node, ...props }: any) => (
    <div className="overflow-x-auto mb-6 rounded-lg border border-gray-100">
      <table className="w-full text-sm md:text-base" {...props} />
    </div>
  ),
  thead: ({ node, ...props }: any) => (
    <thead className="bg-gold-soft/15 border-b border-gray-200" {...props} />
  ),
  tbody: ({ node, ...props }: any) => (
    <tbody className="divide-y divide-gray-100" {...props} />
  ),
  tr: ({ node, ...props }: any) => (
    <tr className="hover:bg-gold-soft/8 transition-colors" {...props} />
  ),
  th: ({ node, ...props }: any) => (
    <th className="text-left font-bold text-gray-900 px-4 py-3 bg-gold-soft/20" {...props} />
  ),
  td: ({ node, ...props }: any) => (
    <td className="px-4 py-3 text-left text-gray-700 leading-relaxed" {...props} />
  ),
};

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={MarkdownComponents}>
      {content}
    </ReactMarkdown>
  );
}