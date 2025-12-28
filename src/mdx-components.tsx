import type { MDXComponents } from 'mdx/types'
 
const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold mb-6">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-semibold mt-10 mb-4">
      {children}
    </h2>
  ),
  p: ({ children }) => (
    <p className="mb-4 leading-7">
      {children}
    </p>
  ),
  
}
 
export function useMDXComponents(): MDXComponents {
  return components
}