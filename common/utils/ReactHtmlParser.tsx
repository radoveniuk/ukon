export default function ReactHtmlParser ({ content }: {content: unknown}) {
  if (typeof content !== 'string') {
    return <>content</>;
  }
  return (
    <div dangerouslySetInnerHTML={{ __html: content }}></div>
  );
};