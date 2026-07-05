import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const blogDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  readTime: string;
  contentHtml: string;
  category: string;
  bannerImage?: string;
}

// Ensure the directory exists
export function ensureBlogDirectoryExists() {
  if (!fs.existsSync(blogDirectory)) {
    fs.mkdirSync(blogDirectory, { recursive: true });
  }
}

// Get all blog posts sorted by date
export function getSortedPostsData(): Omit<BlogPost, 'contentHtml'>[] {
  ensureBlogDirectoryExists();

  const fileNames = fs.readdirSync(blogDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(blogDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the metadata section
      const matterResult = matter(fileContents);

      return {
        slug,
        title: matterResult.data.title || 'Untitled Post',
        description: matterResult.data.description || '',
        date: matterResult.data.date || new Date().toISOString().split('T')[0],
        author: matterResult.data.author || 'Anonymous',
        readTime: matterResult.data.readTime || '5 min read',
        category: matterResult.data.category || 'General',
        bannerImage: matterResult.data.bannerImage || '',
      };
    });

  // Sort posts by date (descending)
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// Get single blog post data by slug
export async function getPostData(slug: string): Promise<BlogPost | null> {
  try {
    ensureBlogDirectoryExists();
    const fullPath = path.join(blogDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the metadata
    const matterResult = matter(fileContents);

    // Convert markdown into HTML string
    const contentHtml = await marked.parse(matterResult.content);

    return {
      slug,
      title: matterResult.data.title || 'Untitled Post',
      description: matterResult.data.description || '',
      date: matterResult.data.date || new Date().toISOString().split('T')[0],
      author: matterResult.data.author || 'Anonymous',
      readTime: matterResult.data.readTime || '5 min read',
      category: matterResult.data.category || 'General',
      bannerImage: matterResult.data.bannerImage || '',
      contentHtml: contentHtml,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}
