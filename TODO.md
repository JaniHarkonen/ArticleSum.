### TagList.js
- should not be dependent on WorkspaceManager like ArticleList.js
- add a background behind the tag listings

### ArticleList.js
- extract pagination into a separate component

### TagControlPanel.js
- consider refactoring due to similarities with ArticleControlPanel

### ArticleControlPanel.js
- consider refactoring due to similarities with TagControlPanel.js

### filters.js
- add filter for warnings
	o filter warnings
	o allow warnings
	o only warnings

### App.js
- investigate weird `aria-labelledby="contained-modal-title-vcenter"`; also present in FormModal.js

### OVERALL
- test for bugs all over the place
- fix React-key issues
- add comments
- normalize imports

- improve encapsulation by paying attention to dependencies, such as between component and Article
- create mappings from Article/Tag JSONs to other objects