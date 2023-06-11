### TagList.js
- should not be dependent on WorkspaceManager like ArticleList.js

### ArticleList.js
- extract pagination into a separate component

### TagControlPanel.js
- consider refactoring due to similarities with ArticleControlPanel

### ArticleControlPanel.js
- consider refactoring due to similarities with TagControlPanel.js

### App.js
- investigate weird `aria-labelledby="contained-modal-title-vcenter"`; also present in FormModal.js

### OVERALL
- position all the elements properly
- add references to the language manager
- test for bugs all over the place
- fix React-key issues
- remove console.logs
- add comments
- normalize imports

- improve encapsulation by paying attention to dependencies, such as between component and Article
- create mappings from Article/Tag JSONs to other objects