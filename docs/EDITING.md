# Editing your portfolio

## The two files to edit

- `content/site.json`: name, email, GitHub, search metadata, hero copy, about text, education, experience, and skills.
- `content/projects.json`: projects in their display order. The first is the featured project.

Use double quotes and no trailing commas. Save while `npm run dev` is running to see changes. For a published site, rebuild and redeploy after editing.

## Skills and experience

Add a skill to a group's `items` array in `site.json`. Add another group by copying an existing group. Add or remove experience and education rows in the `experience` array; their order is the display order.

## Projects

Copy an existing object in `projects.json`, then change its unique `slug`, `title`, `status`, `summary`, `description`, and `stack`. Put screenshots in `public/images/projects/your-project/`; reference them as `/images/projects/your-project/screenshot.png`.

`preview` is the main screenshot. `screenshots` adds optional images in the expandable project story. Always describe the image in `alt`. Use `links.repo` for source code and `links.live` for the live site. Omit links you do not have. Do not use placeholder URLs. Remove a project by deleting its object; reorder objects to reorder the page.

The optional `presentation` field accepts `mobile` or `web`. Use `mobile` for phone screenshots so the full app screen remains readable. A project without this field uses the web presentation. An empty project list hides the work section and its navigation entry.

Run `npm run check:content` to check data, links, duplicate slugs, and local image paths before building.
