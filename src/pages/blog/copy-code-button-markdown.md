---
layout: '../../layouts/BlogPost.astro'
title: 'How to add a copy code button to your blog posts'
description: 'I recently decided to update my site and start a blog. I wanted a nice way of copying code snippets and this is what I came up with.'
publishedDate: '2021-05-20'
updatedDate: 2022-09-10 21:25:32
heroImage: '/placeholder-hero.jpg'
---

<Image
alt={`How I added copy code button to my blog posts`}
src={`/static/images/copy-code-button-markdown/banner.png`}
width={893}
height={150}
priority
/>

I recently revamped my site and I was looking for a way how to do my own copy code button for code snippets. I wanted something clean, simple and provides user with feedback.

After a bit of consulting the main man google, I could not find any good examples using a similar tech stack. So back to the drawing board.

Then I realised that I could make my own custom pre component.

In this example I am going to be using:

- [Tailwind CSS](https://tailwindcss.com/)
- [Heroicons](https://heroicons.com/)
- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)

[Here](https://github.com/vercel/next.js/tree/canary/examples/with-mdx-remote) is a good starting point if you would like to do the same.

## Setup

Let's start with this.

```jsx:Pre.jsx
export const Pre = ({children, ...props}) => {
  return {
    <pre {...props}>{children}<pre>
  }
}
```

Then add that to my MDXComponents.

```jsx:MDXComponents.jsx
import {Pre} from './Pre'

export const MDXComponents = {
  pre: Pre,
}
```

Then pass the custom components into the MDXRemote.

```jsx:Layout.jsx
import {MDXRemote} from 'next-mdx-remote'
import {MDXComponents} from './MDXComponents'

export const Layout = ({mdxSource}) => {
  return (
    <MDXRemote {...mdxSource} components={MDXComponents} />
  )
}
```

Right now, you won't notice any difference as we have only replicated the default behaviour.

## Implementation

We want the copy button to be top right even when the pre will overflow, so we will start by wrapping the pre in a div.

```jsx:Pre.jsx
<div className="relative">
   ...
</div>
```

Then create a div inside our pre and position that top right

```jsx:Pre.jsx
<div className="absolute flex items-center space-x-2 top-0 right-0 m-2">
  <button
    type="button"
    aria-label="Copy to Clipboard"
    className="hidden transition bg-transparent border rounded-md p-2 focus:outline-none fade-in group-hover:flex"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 pointer-events-none"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
      />
    </svg>
  </button>
</div>
```

So we can prove the user with some feedback lets add some state and add an `onClick={onClick}` event to the button.

```jsx:Pre.jsx
const [copied, setCopied] = useState(false)

const onClick = () => {
  // Copy to clipboard here
  setCopied(true)
}
```

In my case I also want to reset the user feedback after 2 seconds.

```jsx:Pre.jsx
useEffect(() => {
  const timer = setTimeout(() => setCopied(false), 2000)

  return () => clearTimeout(timer)
}, [copied])
```

Now we need to implement some way of copying text into the clipboard. I originally thought of using [react-copy-to-clipboard](https://github.com/nkbt/react-copy-to-clipboard) but I don't have access to the text only the react components.

I manged to come up with a nice work around by using ref and innerText.

First we need to create a ref `const preRef = useRef(null)` then hook that up to the pre element.

Let's create our custom copy to clipboard function. I wanted to support newer `writeText` API and a fall back just in case it was not supported.

```tsx:copyToClipboard.ts
export const copyToClipboard = (text) => {
  return new Promise((resolve, reject) => {
    if (navigator?.clipboard) {
      const cb = navigator.clipboard

      cb.writeText(text).then(resolve).catch(reject)
    } else {
      try {
        const body = document.querySelector('body')

        const textarea = document.createElement('textarea')
        body?.appendChild(textarea)

        textarea.value = text
        textarea.select()
        document.execCommand('copy')

        body?.removeChild(textarea)

        resolve()
      } catch (e) {
        reject(e)
      }
    }
  })
}
```

Now let's add that to our onClick event.

```jsx:Pre.jsx
const onClick = () => {
  copyToClipboard(preRef.current.innerText)
  setCopied(true)
}
```

After that you should have something useable, then you can add styling based on state etc.

You can find my full code [here](https://github.com/PhilStainer/philstainer.io/blob/main/components/Pre.tsx)

## Conclusion

Creating your own copy code button is a great way to customize it and adds a better user experience. I hope with my examples above using MDXRemote and Tailwind, you can create something for your own blog.

Happy coding! 👋
