import { Context, defineCollection, defineConfig,  type Meta, } from "@content-collections/core";
 import { compileMDX } from "@content-collections/mdx";

 type Doc = {
  _meta: Meta;
  content: string;
};

const transform = async <D extends Doc>(document: D, context: Context) => {
  const code = await compileMDX(context, document, {
  });
  const [locale, path] = document._meta.path.split(/[/\\]/);

  if (!locale || !path) {
    throw new Error(`Invalid path: ${document._meta.path}`);
  }

  return {
    ...document,
    code,
    locale,
    slug: path,
    toc: document.content,
  };
};

const pages = defineCollection({
  name: "page",
  directory: "src/content/pages",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    summary: z.string(),
    imageUrl: z.string().optional(),
  }),
  transform,
});


const til = defineCollection({
  name: "til",
  directory: "src/content/til",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    date: z.string(),
    modifiedTime: z.string(),
    summary: z.string(),
    imageUrl: z.string().optional(),
    tags: z.array(z.string()),
    illustration: z.string().optional(),
    color: z.string().optional(),
    excerpt:z.string().optional(), 
  }),
  transform,
});


const note = defineCollection({
  name: "note",
  directory: "src/content/note",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    date: z.string(),
    modifiedTime: z.string(),
    summary: z.string(),
    imageUrl: z.string().optional(),
    tags: z.array(z.string()),
    illustration: z.string().optional(),
    color: z.string().optional(),
    excerpt:z.string().optional(), 
  }),
  transform,
});

const blog = defineCollection({
  name: "blog",
  directory: "src/content/blog",
  include: "**/*.mdx",
  schema: (z) => ({
    title: z.string(),
    date: z.string(),
    modifiedTime: z.string(),
    summary: z.string(),
    imageUrl: z.string().optional(),
    tags: z.array(z.string()),
    illustration: z.string().optional(),
    color: z.string().optional(),
    excerpt:z.string().optional(), 
  }),
  transform,
});

export default defineConfig({
  collections: [pages,til,note, blog],
});
